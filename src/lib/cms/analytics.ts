import { createHash } from "node:crypto";
import { getJSON, updateJSON } from "./store";
import { getSecret } from "./auth";

/**
 * Çerezsiz, kimlik bilgisi tutmayan ziyaret istatistiği.
 * Ziyaretçi, günlük değişen bir tuzla özetlenmiş (IP + tarayıcı) kısa bir izden sayılır; ham IP saklanmaz.
 */
export type DayRecord = {
  views: number;
  visitors: string[];
  paths: Record<string, number>;
  sources: Record<string, number>;
  devices: Record<string, number>;
  browsers: Record<string, number>;
  hours: number[];
  events: Record<string, number>;
};

const emptyDay = (): DayRecord => ({ views: 0, visitors: [], paths: {}, sources: {}, devices: {}, browsers: {}, hours: Array(24).fill(0), events: {} });

const TZ = "Europe/Istanbul";
const dayKey = (d: Date) => new Intl.DateTimeFormat("sv-SE", { timeZone: TZ }).format(d);
const hourOf = (d: Date) => Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", hour12: false }).format(d)) % 24;
const key = (day: string) => `analytics:${day}`;

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|lighthouse|pingdom|monitor|curl|wget|python|axios|httpclient|go-http/i;

export const isBot = (ua: string) => !ua || BOT.test(ua);

function device(ua: string) {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return "Tablet";
  if (/mobi|iphone|android/i.test(ua)) return "Telefon";
  return "Bilgisayar";
}
function browser(ua: string) {
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\/|opera/i.test(ua)) return "Opera";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua)) return "Safari";
  return "Diğer";
}
export function sourceOf(referrer: string, host: string) {
  if (!referrer) return "Doğrudan";
  let h = "";
  try {
    h = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "Doğrudan";
  }
  if (h === host.replace(/^www\./, "") || h.startsWith("localhost")) return "Doğrudan";
  if (/google\./.test(h)) return "Google";
  if (/bing\.com|yandex|duckduckgo|yahoo/.test(h)) return "Diğer arama motorları";
  if (/instagram|l\.instagram/.test(h)) return "Instagram";
  if (/facebook|fb\.com|l\.facebook/.test(h)) return "Facebook";
  if (/linkedin|lnkd\.in/.test(h)) return "LinkedIn";
  if (/(^|\.)t\.co$|twitter|x\.com/.test(h)) return "X (Twitter)";
  if (/whatsapp|wa\.me/.test(h)) return "WhatsApp";
  return h;
}

const inc = (o: Record<string, number>, k: string, n = 1) => {
  o[k] = (o[k] ?? 0) + n;
};

export async function recordView(p: { path: string; referrer: string; host: string; ua: string; ip: string }) {
  const now = new Date();
  const day = dayKey(now);
  const secret = await getSecret();
  const visitor = createHash("sha256").update(`${secret}|${day}|${p.ip}|${p.ua}`).digest("hex").slice(0, 12);
  await updateJSON<DayRecord>(key(day), emptyDay(), (r) => {
    r.views += 1;
    // Sayaç dosyası şişirilemesin: günlük benzersiz ziyaretçi ve sayfa sayısına üst sınır
    if (r.visitors.length < 5000 && !r.visitors.includes(visitor)) r.visitors.push(visitor);
    inc(r.paths, p.path in r.paths || Object.keys(r.paths).length < 300 ? p.path : "(diğer)");
    inc(r.sources, sourceOf(p.referrer, p.host));
    inc(r.devices, device(p.ua));
    inc(r.browsers, browser(p.ua));
    r.hours[hourOf(now)] += 1;
    return r;
  });
}

export async function recordEvent(name: string) {
  const day = dayKey(new Date());
  await updateJSON<DayRecord>(key(day), emptyDay(), (r) => {
    inc(r.events, name);
    return r;
  });
}

export const EVENT_LABELS: Record<string, string> = {
  contact_submit: "İletişim formu gönderimi",
  tel_click: "Telefon tıklaması",
  mail_click: "E-posta tıklaması",
  cta_click: "Randevu düğmesi tıklaması",
};

export type Stats = {
  days: number;
  totals: { views: number; visitors: number; contacts: number; calls: number; rate: number };
  prev: { views: number; visitors: number; contacts: number };
  series: { date: string; views: number; visitors: number }[];
  topPages: { path: string; views: number }[];
  sources: { name: string; value: number }[];
  devices: { name: string; value: number }[];
  browsers: { name: string; value: number }[];
  hours: number[];
  events: { name: string; label: string; value: number }[];
};

const sortTop = (o: Record<string, number>, n = 8) =>
  Object.entries(o)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, value]) => ({ name, value }));

export async function getStats(days: number): Promise<Stats> {
  const today = new Date();
  const dates = Array.from({ length: days * 2 }, (_, i) => dayKey(new Date(today.getTime() - i * 86400_000))).reverse();
  const recs = await Promise.all(dates.map((d) => getJSON<DayRecord>(key(d), emptyDay())));
  const cur = recs.slice(days);
  const prev = recs.slice(0, days);

  const sum = (rs: DayRecord[], f: (r: DayRecord) => number) => rs.reduce((a, r) => a + f(r), 0);
  const views = sum(cur, (r) => r.views);
  const visitors = sum(cur, (r) => r.visitors.length);
  const contacts = sum(cur, (r) => r.events.contact_submit ?? 0);
  const calls = sum(cur, (r) => r.events.tel_click ?? 0);

  const merge = (f: (r: DayRecord) => Record<string, number>) => {
    const o: Record<string, number> = {};
    cur.forEach((r) => Object.entries(f(r)).forEach(([k, v]) => inc(o, k, v)));
    return o;
  };
  const hours = Array(24).fill(0) as number[];
  cur.forEach((r) => r.hours.forEach((v, i) => (hours[i] += v)));
  const ev = merge((r) => r.events);

  return {
    days,
    totals: { views, visitors, contacts, calls, rate: visitors ? (contacts / visitors) * 100 : 0 },
    prev: { views: sum(prev, (r) => r.views), visitors: sum(prev, (r) => r.visitors.length), contacts: sum(prev, (r) => r.events.contact_submit ?? 0) },
    series: dates.slice(days).map((date, i) => ({ date, views: cur[i].views, visitors: cur[i].visitors.length })),
    topPages: sortTop(merge((r) => r.paths), 8).map((x) => ({ path: x.name, views: x.value })),
    sources: sortTop(merge((r) => r.sources)),
    devices: sortTop(merge((r) => r.devices)),
    browsers: sortTop(merge((r) => r.browsers), 5),
    hours,
    events: Object.entries(ev)
      .map(([name, value]) => ({ name, label: EVENT_LABELS[name] ?? name, value }))
      .sort((a, b) => b.value - a.value),
  };
}
