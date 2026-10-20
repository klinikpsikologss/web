// İletişim formundan çıkan e-posta: yalnızca Selin Hanım'a bildirim gider, ziyaretçiye e-posta gönderilmez.
// Eski e-posta istemcileri için tablo düzeni ve satır içi stil kullanılır; her e-postanın düz metin karşılığı da vardır.

export type EmailSite = { name: string; phone: string; address: string; url: string };
export type Contact = { name: string; phone: string; email: string; message: string };

const NAVY = "#0f2747";
const GOLD = "#b79b62";
const GOLD_SOFT = "#d9c6a1";
const IVORY = "#f8f5ee";
const INK = "#1c2433";
const MUTED = "#6b7385";

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Telefonu WhatsApp için uluslararası biçime çevirir (05xx → 905xx). */
const waNumber = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  if (d.length < 10) return "";
  return d.startsWith("90") ? d : `90${d.replace(/^0/, "")}`;
};

const button = (href: string, label: string, primary = true) =>
  `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 22px;border-radius:999px;font:600 14px/1 Arial,Helvetica,sans-serif;text-decoration:none;${
    primary ? `background:${NAVY};color:#ffffff;` : `background:#ffffff;color:${NAVY};border:1px solid ${NAVY};`
  }">${esc(label)}</a>`;

function layout(opts: { preheader: string; site: EmailSite; body: string; footerNote: string }) {
  const { site } = opts;
  return `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(site.name)}</title></head>
<body style="margin:0;padding:0;background:${IVORY};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${IVORY};">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${IVORY};"><tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">
  <tr><td style="background:${NAVY};border-radius:16px 16px 0 0;padding:26px 32px;">
    <div style="font:400 26px/1.1 Georgia,'Times New Roman',serif;color:#ffffff;letter-spacing:.5px;">Selin Sak</div>
    <div style="margin-top:6px;font:400 12px/1 Arial,Helvetica,sans-serif;color:${GOLD_SOFT};letter-spacing:2.5px;text-transform:uppercase;">Klinik Psikolog</div>
  </td></tr>
  <tr><td style="height:3px;background:${GOLD};font-size:0;line-height:0;">&nbsp;</td></tr>
  <tr><td style="background:#ffffff;padding:34px 32px 28px;font:400 15px/1.7 Arial,Helvetica,sans-serif;color:${INK};">
    ${opts.body}
  </td></tr>
  <tr><td style="background:#ffffff;border-radius:0 0 16px 16px;padding:0 32px 30px;">
    <div style="border-top:1px solid #ece6d8;padding-top:20px;font:400 12.5px/1.7 Arial,Helvetica,sans-serif;color:${MUTED};">
      <strong style="color:${NAVY};">${esc(site.name)}</strong><br>
      ${esc(site.address)}<br>
      <a href="tel:${esc(site.phone.replace(/\s/g, ""))}" style="color:${MUTED};text-decoration:none;">${esc(site.phone)}</a> ·
      <a href="${esc(site.url)}" style="color:${MUTED};">${esc(site.url.replace(/^https?:\/\//, ""))}</a>
    </div>
  </td></tr>
  <tr><td style="padding:18px 12px 0;text-align:center;font:400 11.5px/1.6 Arial,Helvetica,sans-serif;color:${MUTED};">${opts.footerNote}</td></tr>
</table>
</td></tr></table></body></html>`;
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:10px 0;border-bottom:1px solid #f1ecdf;width:96px;font:600 12px/1.4 Arial,Helvetica,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:1px;vertical-align:top;">${label}</td><td style="padding:10px 0;border-bottom:1px solid #f1ecdf;font:400 15px/1.5 Arial,Helvetica,sans-serif;color:${INK};">${value}</td></tr>`;

/** Selin Hanım'a: yeni mesaj bildirimi. */
export function ownerEmail(c: Contact, site: EmailSite, when: Date, panelUrl: string) {
  const time = when.toLocaleString("tr-TR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Istanbul" });
  const wa = waNumber(c.phone);
  const message = esc(c.message).replace(/\n/g, "<br>");
  const body = `
    <div style="font:400 12px/1 Arial,Helvetica,sans-serif;color:${GOLD};letter-spacing:2px;text-transform:uppercase;">Yeni mesaj</div>
    <h1 style="margin:10px 0 4px;font:400 26px/1.25 Georgia,'Times New Roman',serif;color:${NAVY};">${esc(c.name)} size yazdı</h1>
    <div style="font:400 13px/1.4 Arial,Helvetica,sans-serif;color:${MUTED};">${esc(time)} · İletişim formu</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 6px;">
      ${row("Ad", esc(c.name))}
      ${c.phone ? row("Telefon", `<a href="tel:${esc(c.phone.replace(/\s/g, ""))}" style="color:${NAVY};text-decoration:none;">${esc(c.phone)}</a>`) : ""}
      ${c.email ? row("E-posta", `<a href="mailto:${esc(c.email)}" style="color:${NAVY};">${esc(c.email)}</a>`) : ""}
    </table>
    <div style="margin:18px 0 24px;padding:18px 20px;background:${IVORY};border-left:3px solid ${GOLD};border-radius:0 10px 10px 0;font:400 15px/1.75 Georgia,'Times New Roman',serif;color:${INK};">${message}</div>
    <div>
      ${c.email ? button(`mailto:${c.email}?subject=${encodeURIComponent("Mesajınız hakkında")}`, "E-postayla yanıtla") : ""}
      ${wa ? button(`https://wa.me/${wa}`, "WhatsApp'tan yaz", !c.email) : ""}
      ${button(panelUrl, "Panelde aç", false)}
    </div>`;
  const text = [
    `Yeni mesaj: ${c.name}`,
    time,
    "",
    `Ad: ${c.name}`,
    c.phone ? `Telefon: ${c.phone}` : false,
    c.email ? `E-posta: ${c.email}` : false,
    "",
    c.message,
    "",
    `Panelde aç: ${panelUrl}`,
  ]
    .filter((x): x is string => x !== false)
    .join("\n");
  return {
    subject: `Yeni mesaj: ${c.name.replace(/[\r\n]+/g, " ")}`,
    html: layout({ preheader: `${c.name}: ${c.message.slice(0, 90)}`, site, body, footerNote: "Bu bildirim web sitenizdeki iletişim formundan otomatik gönderildi." }),
    text,
  };
}
