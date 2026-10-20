import { NextResponse } from "next/server";
import { addMessage } from "@/lib/cms/messages";
import { recordEvent } from "@/lib/cms/analytics";
import { readPublished, siteOf } from "@/lib/cms/content";
import { clientIp, countHit, limitedFor } from "@/lib/cms/ratelimit";
import { headers } from "next/headers";
import { site } from "@/lib/site";
import { ownerEmail } from "@/lib/email";

// Ortam değişkenleri (Vercel > Settings > Environment Variables):
//   RESEND_API_KEY      Resend API anahtarı
//   CONTACT_FROM_EMAIL  Gönderen adres (Resend'de doğrulanmış alan adı), örn. "Klinik Psikolog Selin Sak <bildirim@klinikpsikologselinsak.com>"
//   CONTACT_TO_EMAIL    Mesajların gideceği adres (varsayılan: site.email)

// Aynı IP'den saatte en fazla 5 mesaj (spam ve e-posta kotası koruması)
const FORM_LIMIT = 5;
const FORM_WINDOW = 60 * 60_000;
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  // Bot tuzağı: gerçek kullanıcı bu alanı doldurmaz.
  if (typeof data.website === "string" && data.website.trim() !== "") return NextResponse.json({ ok: true });

  const ip = clientIp(await headers());
  const wait = await limitedFor("form", ip, FORM_LIMIT, FORM_WINDOW);
  if (wait) return NextResponse.json({ error: `Çok fazla mesaj gönderdiniz. Lütfen ${wait} dakika sonra tekrar deneyin ya da telefonla ulaşın.` }, { status: 429 });

  const name = oneLine(String(data.name ?? "").trim().slice(0, 120));
  const phone = oneLine(String(data.phone ?? "").trim().slice(0, 40));
  const email = oneLine(String(data.email ?? "").trim().slice(0, 160));
  const message = String(data.message ?? "").trim().slice(0, 4000);
  const consent = data.consent === true;

  if (!name || !message || (!phone && !email)) {
    return NextResponse.json({ error: "Lütfen ad, mesaj ve bir iletişim bilgisi girin." }, { status: 422 });
  }
  if (email && !EMAIL.test(email)) {
    return NextResponse.json({ error: "Lütfen geçerli bir e-posta adresi girin." }, { status: 422 });
  }
  if (!consent) {
    return NextResponse.json({ error: "Devam etmek için aydınlatma metnini onaylayın." }, { status: 422 });
  }

  // Mesaj her durumda panele (Mesajlar) kaydedilir; e-posta bildirimi ayarlıysa ayrıca gönderilir.
  try {
    await countHit("form", ip, FORM_WINDOW);
    await addMessage({ name, phone, email, message });
    await recordEvent("contact_submit");
  } catch {
    return NextResponse.json({ error: "Mesaj kaydedilemedi. Lütfen telefon veya e-posta ile ulaşın." }, { status: 500 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (key && from) {
    const s = siteOf(await readPublished());
    const mailSite = { name: site.name, phone: s.phone, address: `${s.address.street}, ${s.address.district}/${s.address.city}`, url: site.url };
    const contact = { name, phone, email, message };
    const owner = process.env.CONTACT_TO_EMAIL || s.email;
    const send = (payload: object) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, ...payload }),
      });

    const toOwner = ownerEmail(contact, mailSite, new Date(), `${site.url}/panel/mesajlar`);
    // E-posta gönderilemese de mesaj panelde duruyor; hata siteyi etkilemesin
    await send({ to: [owner], reply_to: email || undefined, subject: toOwner.subject, html: toOwner.html, text: toOwner.text }).catch(() => undefined);
  }
  return NextResponse.json({ ok: true });
}
