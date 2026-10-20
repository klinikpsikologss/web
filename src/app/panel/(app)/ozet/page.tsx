import Link from "next/link";
import { getStats } from "@/lib/cms/analytics";
import { getMeta } from "@/lib/cms/content";
import { listMessages } from "@/lib/cms/messages";
import { storageMode } from "@/lib/cms/store";
import { Card, PageTitle, Badge, Empty } from "@/components/panel/kit";
import { fmtDate } from "@/components/panel/util";

export const dynamic = "force-dynamic";

const RANGES = [
  { d: 7, label: "7 gün" },
  { d: 30, label: "30 gün" },
  { d: 90, label: "90 gün" },
];

function delta(cur: number, prev: number) {
  if (!prev) return cur ? { text: "yeni", up: true } : null;
  const p = Math.round(((cur - prev) / prev) * 100);
  return { text: `${p > 0 ? "+" : ""}${p}%`, up: p >= 0 };
}

function Stat({ label, value, sub, d }: { label: string; value: string; sub?: string; d?: { text: string; up: boolean } | null }) {
  return (
    <Card as="div" className="!p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-5xl leading-none text-navy">{value}</p>
      <p className="mt-3 flex items-center gap-2 text-xs text-muted">
        {d && <span className={`rounded-full px-2 py-0.5 font-medium ${d.up ? "bg-[#2f8f5b]/15 text-[#206c43]" : "bg-[#a2332e]/10 text-[#8f2f2b]"}`}>{d.text}</span>}
        {sub}
      </p>
    </Card>
  );
}

function AreaChart({ data }: { data: { date: string; views: number; visitors: number }[] }) {
  const W = 760;
  const H = 220;
  const pad = { l: 36, r: 8, t: 12, b: 26 };
  const max = Math.max(4, ...data.map((d) => d.views));
  const nice = Math.ceil(max / 4) * 4;
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / Math.max(1, data.length - 1);
  const y = (v: number) => pad.t + (1 - v / nice) * (H - pad.t - pad.b);
  const line = (k: "views" | "visitors") => data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(d[k]).toFixed(1)}`).join(" ");
  const area = `${line("views")} L${x(data.length - 1)} ${H - pad.b} L${x(0)} ${H - pad.b} Z`;
  const ticks = [0, 1, 2, 3, 4].map((i) => (nice / 4) * i);
  const labelEvery = Math.ceil(data.length / 7);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Ziyaret grafiği">
      <defs>
        <linearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d9c6a1" stopOpacity="0.55" />
          <stop offset="1" stopColor="#d9c6a1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#0f2747" strokeOpacity="0.08" />
          <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#566376">
            {t}
          </text>
        </g>
      ))}
      <path d={area} fill="url(#ga)" />
      <path d={line("views")} fill="none" stroke="#b79b62" strokeWidth="2.2" strokeLinejoin="round" />
      <path d={line("visitors")} fill="none" stroke="#0f2747" strokeWidth="2.2" strokeLinejoin="round" />
      {data.map((d, i) =>
        i % labelEvery === 0 ? (
          <text key={d.date} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="#566376">
            {d.date.slice(8)}.{d.date.slice(5, 7)}
          </text>
        ) : null,
      )}
    </svg>
  );
}

function Bars({ items, empty = "Henüz veri yok." }: { items: { name: string; value: number }[]; empty?: string }) {
  if (!items.length) return <Empty>{empty}</Empty>;
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ul className="grid gap-3">
      {items.map((i) => (
        <li key={i.name}>
          <div className="mb-1 flex justify-between gap-3 text-sm">
            <span className="truncate text-ink">{i.name}</span>
            <span className="text-muted">{i.value}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-navy/[0.07]">
            <div className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold" style={{ width: `${Math.max(4, (i.value / max) * 100)}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function Overview({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const sp = await searchParams;
  const days = [7, 30, 90].includes(Number(sp.d)) ? Number(sp.d) : 30;
  const [s, meta, msgs] = await Promise.all([getStats(days), getMeta(), listMessages()]);
  const unread = msgs.filter((m) => !m.read).length;
  const hoursMax = Math.max(1, ...s.hours);
  const empty = s.totals.views === 0;

  return (
    <>
      <PageTitle
        title="Merhaba, Selin Hanım"
        lead="Sitenizin son durumu ve ziyaretçi hareketleri. Veriler çerez kullanılmadan, anonim olarak toplanır."
        actions={
          <div className="flex rounded-full bg-navy/[0.06] p-1" role="tablist" aria-label="Zaman aralığı">
            {RANGES.map((r) => (
              <Link key={r.d} href={`/panel/ozet?d=${r.d}`} className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${days === r.d ? "bg-navy text-ivory" : "text-navy hover:bg-navy/10"}`}>
                {r.label}
              </Link>
            ))}
          </div>
        }
      />

      <div className="mb-6 grid gap-5 md:grid-cols-[1.3fr_1fr]">
        <Card className="relative overflow-hidden !bg-navy text-ivory">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Siteyi özelleştir</p>
          <h2 className="mt-2 text-3xl !text-ivory sm:text-4xl">Yazıları, görselleri ve bölümleri canlı sitede düzenleyin</h2>
          <p className="mt-3 max-w-lg text-ivory/75">Sitenin kendisi açılır; metne tıklayıp yazar, görseli değiştirir, bölümlerin yerini oynatırsınız. Beğendiğinizde Yayınla’ya basmanız yeterli.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/api/panel/visit?mode=edit&to=/" className="inline-flex items-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-navy transition-colors duration-500 hover:bg-[#e6d6b6]">
              Düzenlemeye başla
            </a>
            <Link href="/panel/yazilar" className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-ivory shadow-[inset_0_0_0_1px_rgba(248,245,238,0.35)] hover:bg-ivory/10">
              Yeni yazı ekle
            </Link>
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl">Yayın durumu</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="flex items-center justify-between gap-3">
              <span className="text-muted">Durum</span>
              {meta.dirty ? <Badge tone="gold">Yayınlanmamış değişiklik var</Badge> : <Badge tone="green">Güncel</Badge>}
            </li>
            <li className="flex items-center justify-between gap-3">
              <span className="text-muted">Son yayın</span>
              <span>{fmtDate(meta.publishedAt)}</span>
            </li>
            <li className="flex items-center justify-between gap-3">
              <span className="text-muted">Okunmamış mesaj</span>
              <Link href="/panel/mesajlar" className="font-medium text-navy underline decoration-gold-deep underline-offset-4">
                {unread}
              </Link>
            </li>
            <li className="flex items-center justify-between gap-3">
              <span className="text-muted">Depolama</span>
              <span>{storageMode === "redis" ? "Bulut (Redis)" : "Sunucu dosyası"}</span>
            </li>
          </ul>
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Sayfa görüntüleme" value={String(s.totals.views)} d={delta(s.totals.views, s.prev.views)} sub={`son ${days} gün`} />
        <Stat label="Tekil ziyaretçi" value={String(s.totals.visitors)} d={delta(s.totals.visitors, s.prev.visitors)} sub="günlük toplam" />
        <Stat label="İletişim formu" value={String(s.totals.contacts)} d={delta(s.totals.contacts, s.prev.contacts)} sub="gönderim" />
        <Stat label="Dönüşüm oranı" value={`%${s.totals.rate.toFixed(1)}`} sub={`${s.totals.calls} telefon tıklaması`} />
      </div>

      <Card className="mb-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl">Ziyaret grafiği</h2>
          <div className="flex gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-5 rounded-full bg-[#b79b62]" /> Görüntüleme
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-5 rounded-full bg-navy" /> Ziyaretçi
            </span>
          </div>
        </div>
        {empty ? <Empty>Henüz ziyaret kaydı yok. Site yayına çıktıkça veriler burada görünecek.</Empty> : <AreaChart data={s.series} />}
      </Card>

      <div className="mb-6 grid gap-5 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-2xl">En çok bakılan sayfalar</h2>
          <Bars items={s.topPages.map((p) => ({ name: p.path, value: p.views }))} />
        </Card>
        <Card>
          <h2 className="mb-4 text-2xl">Ziyaretçiler nereden geliyor?</h2>
          <Bars items={s.sources} />
        </Card>
        <Card>
          <h2 className="mb-4 text-2xl">Cihaz ve tarayıcı</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Bars items={s.devices} />
            <Bars items={s.browsers} />
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-2xl">Etkileşimler</h2>
          <Bars items={s.events.map((e) => ({ name: e.label, value: e.value }))} empty="Henüz etkileşim yok." />
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
        <Card>
          <h2 className="mb-1 text-2xl">Günün hangi saatinde?</h2>
          <p className="mb-4 text-sm text-muted">Görüntülemelerin saat dağılımı (sunucu saati).</p>
          <div className="flex h-36 items-end gap-1" role="img" aria-label="Saatlik dağılım">
            {s.hours.map((v, h) => (
              <div key={h} className="group relative flex-1">
                <div className="w-full rounded-t bg-gradient-to-t from-gold-deep/70 to-gold" style={{ height: `${Math.max(3, (v / hoursMax) * 100)}%` }} title={`${h}:00 · ${v}`} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>00</span>
            <span>06</span>
            <span>12</span>
            <span>18</span>
            <span>23</span>
          </div>
        </Card>
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl">Son mesajlar</h2>
            <Link href="/panel/mesajlar" className="text-sm text-gold-deep underline underline-offset-4">
              Tümü
            </Link>
          </div>
          {msgs.length === 0 ? (
            <Empty>Henüz mesaj yok.</Empty>
          ) : (
            <ul className="grid gap-3">
              {msgs.slice(0, 4).map((m) => (
                <li key={m.id} className="rounded-xl bg-navy/[0.04] px-4 py-3">
                  <p className="flex items-center justify-between gap-2 text-sm font-medium text-navy">
                    <span className="truncate">{m.name}</span>
                    {!m.read && <span className="h-2 w-2 shrink-0 rounded-full bg-gold-deep" />}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm text-muted">{m.message}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
