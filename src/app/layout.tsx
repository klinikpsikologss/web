import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { hasAsset } from "@/components/Photo";
import { SiteChrome } from "@/components/cms/SiteChrome";
import { Analytics } from "@/components/cms/Analytics";
import { EditorLayer } from "@/components/cms/EditorLayer";
import { getContent, siteOf } from "@/lib/cms/content";
import { ids } from "@/lib/seo";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f2747",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const description = c.seo.description;
  return {
    metadataBase: new URL(site.url),
    title: { default: c.seo.title, template: `%s | ${site.name}` },
    description,
    applicationName: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: site.url,
      siteName: site.name,
      title: site.name,
      description,
      images: hasAsset("/og-image.jpg") ? [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.name }] : undefined,
    },
    twitter: { card: "summary_large_image", title: site.name, description },
    icons: {
      icon: hasAsset("/favicon.ico")
        ? [
            { url: "/favicon.ico", sizes: "48x48" },
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
          ]
        : undefined,
      apple: hasAsset("/apple-touch-icon.png") ? "/apple-touch-icon.png" : undefined,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await getContent();
  const s = siteOf(c);
  const { isEnabled: draft } = await draftMode();

  const person = {
    "@type": "Person",
    "@id": ids.person,
    name: "Selin Sak",
    jobTitle: "Klinik Psikolog",
    url: `${site.url}/hakkimda`,
    image: hasAsset("/selin-hakkimda.jpg") ? `${site.url}/selin-hakkimda.jpg` : undefined,
    worksFor: { "@id": ids.business },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Beykoz Üniversitesi" },
      { "@type": "CollegeOrUniversity", name: "Başkent Üniversitesi" },
    ],
    memberOf: c.about.memberships.map((m) => ({ "@type": "Organization", name: m.name })),
    knowsAbout: ["Bilişsel ve Davranışçı Terapiler", "Çift terapisi", "Kaygı bozuklukları", "Depresyon", "Travma", "Psikoonkoloji", "Yeme bozuklukları"],
    sameAs: [s.instagram, s.linkedin].filter(Boolean),
  };
  const business = {
    "@type": ["Psychologist", "LocalBusiness"],
    "@id": ids.business,
    name: site.name,
    url: site.url,
    description: c.seo.description,
    telephone: s.phoneHref.replace("tel:", ""),
    email: s.email,
    image: hasAsset("/og-image.jpg") ? `${site.url}/og-image.jpg` : undefined,
    logo: hasAsset("/icon-512.png") ? `${site.url}/icon-512.png` : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address.street,
      addressLocality: s.address.district,
      addressRegion: s.address.city,
      addressCountry: "TR",
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(`${s.address.street}, ${s.address.district}, ${s.address.city}`)}`,
    areaServed: { "@type": "City", name: "Bolu" },
    availableLanguage: "Turkish",
    founder: { "@id": ids.person },
    sameAs: [s.instagram, s.linkedin].filter(Boolean),
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": ids.website, url: site.url, name: site.name, inLanguage: "tr-TR", publisher: { "@id": ids.business } },
      business,
      person,
    ],
  };

  // Panelden seçilen marka renkleri (varsayılanlarsa hiçbir şey eklenmez)
  const customTheme = c.theme.navy !== "#0f2747" || c.theme.gold !== "#d9c6a1";
  const themeCss = customTheme
    ? `:root{--color-navy:${c.theme.navy};--color-navy-deep:color-mix(in srgb,${c.theme.navy} 62%,#000);--color-navy-soft:color-mix(in srgb,${c.theme.navy} 80%,#fff);--color-gold:${c.theme.gold};--color-gold-deep:color-mix(in srgb,${c.theme.gold} 40%,#000)}`
    : "";

  return (
    <html lang="tr" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {themeCss && <style dangerouslySetInnerHTML={{ __html: themeCss }} />}
        <SiteChrome header={<Header logo={<Logo />} appointmentUrl={s.appointmentUrl} />} footer={<Footer />} editor={draft ? <EditorLayer /> : null}>
          {children}
        </SiteChrome>
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
