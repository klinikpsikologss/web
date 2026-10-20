import { cookies, headers } from "next/headers";
import { SESSION_COOKIE, validToken } from "@/lib/cms/auth";
import { isBot, recordEvent, recordView } from "@/lib/cms/analytics";

// Basit ziyaret/etkinlik sayacı (çerezsiz). Yönetici oturumu açıkken ve botlarda sayılmaz.
const EVENTS = new Set(["tel_click", "mail_click", "cta_click"]);

export async function POST(req: Request) {
  const done = () => new Response(null, { status: 204 });
  try {
    const h = await headers();
    const ua = h.get("user-agent") ?? "";
    if (isBot(ua)) return done();
    if (await validToken((await cookies()).get(SESSION_COOKIE)?.value)) return done();

    const body = (await req.json().catch(() => null)) as { p?: string; r?: string; e?: string } | null;
    if (!body) return done();

    if (body.e) {
      if (EVENTS.has(body.e)) await recordEvent(body.e);
      return done();
    }
    const path = String(body.p ?? "").split(/[?#]/)[0].slice(0, 160);
    if (!path.startsWith("/") || path.startsWith("/panel") || path.startsWith("/api")) return done();
    const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || "yerel";
    await recordView({ path, referrer: String(body.r ?? "").slice(0, 300), host: h.get("host") ?? "", ua, ip });
  } catch {
    /* sayaç hataları siteyi etkilemesin */
  }
  return done();
}
