// Eski WordPress sitesine ait, karşılığı olmayan adresler (next.config.mjs içindeki rewrites buraya yönlendirir).
// 410 Gone: arama motorlarına sayfanın kalıcı olarak kaldırıldığını bildirir, dizinden 404'e göre daha hızlı düşer.
const body = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Sayfa kaldırıldı</title></head><body style="font-family:Georgia,serif;text-align:center;padding:4rem 1rem;color:#0f2747"><h1>Bu sayfa kalıcı olarak kaldırıldı</h1><p><a href="/" style="color:#0f2747">Ana sayfaya dön</a></p></body></html>`;

const gone = () =>
  new Response(body, {
    status: 410,
    headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "public, max-age=3600" },
  });

export const GET = gone;
export const HEAD = gone;
export const POST = gone;
