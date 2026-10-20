/** @type {import('next').NextConfig} */

// Eski WordPress sitesinin (temalı kurulum) sayfaları. Google'da hâlâ görünen ya da bağlantısı olan adresler:
// gerçek içeriği olanlar yeni sayfalara 301 ile taşınır, demo/mağaza/yönetim adresleri 410 (kalıcı olarak silindi) döner.
const to = (source, destination) => ({ source, destination, statusCode: 301 });

const wpRedirects = [
  // Hizmetler
  to("/services_group/:path*", "/hizmetler"),
  to("/services/cift-terapisi", "/terapi/cift-terapisi"),
  to("/services/bireysel-psikoterapi", "/terapi/bireysel-psikoterapi"),
  to("/services/online-psikoterapi", "/terapi/online-psikoterapi"),
  to("/services", "/hizmetler"),
  to("/services/:path*", "/hizmetler"),
  to("/uzmanliklarimiz", "/calisma-alanlari"),
  to("/uzmanliklarimiz-2", "/calisma-alanlari"),
  // Eski blog yazıları: konusu en yakın sayfaya
  to("/cift-terapisi-nedir-hangi-durumlarda-cift-terapisine-basvurulmali", "/terapi/cift-terapisi"),
  to("/online-terapi-nedir-kimler-icin-uygundur-ve-nasil-isler", "/terapi/online-psikoterapi"),
  to("/kaygi-nedir-zihninizdeki-alarm-gercekten-tehlikeyi-mi-haber-veriyor", "/calisma-alanlari/anksiyete-bozukluklari"),
  // Blog listeleri ve kategoriler
  to("/blog-yazilari", "/blog"),
  to("/blog-list", "/blog"),
  to("/blog-standard", "/blog"),
  to("/blog-portfolio", "/blog"),
  to("/category/:path*", "/blog"),
  to("/tag/:path*", "/blog"),
  to("/author/:path*", "/hakkimda"),
  // Diğer gerçek sayfalar
  to("/faq", "/sss"),
  to("/privacy-policy", "/gizlilik-politikasi"),
  to("/pricing", "/iletisim"),
  to("/consultation", "/iletisim"),
  to("/online-booking", "/iletisim"),
  // Eski site haritaları yeni haritaya
  to("/sitemaps.xml", "/sitemap.xml"),
  to("/wp-sitemap.xml", "/sitemap.xml"),
  to("/sitemap_index.xml", "/sitemap.xml"),
  to("/post-sitemap1.xml", "/sitemap.xml"),
  to("/page-sitemap1.xml", "/sitemap.xml"),
  to("/category-sitemap1.xml", "/sitemap.xml"),
];

// Hiçbir karşılığı olmayan eski adresler: 410 Gone (arama motorları 404'e göre çok daha çabuk düşürür).
const gone = [
  "/wp-admin/:path*",
  "/wp-login.php",
  "/wp-content/:path*",
  "/wp-includes/:path*",
  "/wp-json/:path*",
  "/xmlrpc.php",
  "/feed/:path*",
  "/comments/feed/:path*",
  "/urun/:path*",
  "/product/:path*",
  "/team/:path*",
  "/testimonials/:path*",
  "/portfolio/:path*",
  "/magaza/:path*",
  "/shop/:path*",
  "/sepet",
  "/cart",
  "/odeme",
  "/checkout",
  "/my-account/:path*",
  "/wishlist-page",
  "/typography",
  "/newsletter-popups",
  "/psychology",
  "/helpline",
  "/addiction-rehab",
  "/youth-center",
  "/counseling",
  "/our-psychologists",
  "/service-plus",
];
const goneRewrites = [
  ...gone.map((source) => ({ source, destination: "/api/gone" })),
  // WooCommerce sepete ekleme vb. parametreli adresler (herhangi bir sayfada)
  ...["add-to-cart", "wc-ajax", "post_type", "elementor_library", "replytocom"].map((key) => ({
    source: "/:path*",
    has: [{ type: "query", key }],
    destination: "/api/gone",
  })),
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://res.cloudinary.com",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-src https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          ...(process.env.NODE_ENV === "production" ? [{ key: "Content-Security-Policy", value: csp }] : []),
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  images: { qualities: [75, 90], remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }] },
  // Eski adresler yeni adreslere kalıcı yönlenir (arama motorları ve paylaşılan bağlantılar için)
  async redirects() {
    return [
      { source: "/uzmanliklar", destination: "/calisma-alanlari", permanent: true },
      { source: "/uzmanliklar/:slug([a-z0-9-]+)", destination: "/calisma-alanlari/:slug", permanent: true },
      { source: "/ofis-gorselleri", destination: "/klinik-gorselleri", permanent: true },
      { source: "/calisma-sekli", destination: "/hizmetler", permanent: true },
      ...wpRedirects,
    ];
  },
  async rewrites() {
    return { beforeFiles: goneRewrites, afterFiles: [], fallback: [] };
  },
};
export default nextConfig;
