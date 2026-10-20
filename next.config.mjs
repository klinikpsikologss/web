/** @type {import('next').NextConfig} */
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
    ];
  },
};
export default nextConfig;
