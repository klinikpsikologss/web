import type { Metadata } from "next";
import { site } from "./site";

/** Meta açıklamasını arama sonuçlarında kesilmeyecek uzunluğa (≈155 karakter) kısaltır; kelimeyi bölmez. */
export function clip(text: string, max = 155): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\-–]$/, "")}…`;
}

/**
 * Sayfa üst verisini (başlık, açıklama, kanonik adres) alıp Open Graph ve Twitter bilgilerini de aynı değerlerle doldurur.
 * Sayfa kendi `openGraph` alanını verdiğinde üst düzeydeki görsel kaybolduğu için görsel burada yeniden eklenir.
 */
export function withOg(meta: Metadata, opts: { type?: "website" | "article"; image?: string } = {}): Metadata {
  const title = typeof meta.title === "string" ? meta.title : meta.title && "absolute" in meta.title ? meta.title.absolute : undefined;
  const canonical = typeof meta.alternates?.canonical === "string" ? meta.alternates.canonical : undefined;
  const description = meta.description ? clip(String(meta.description)) : undefined;
  const images = [{ url: opts.image ?? "/og-image.jpg", width: opts.image ? undefined : 1200, height: opts.image ? undefined : 630, alt: title ?? site.name }];
  return {
    ...meta,
    description,
    openGraph: {
      type: opts.type ?? "website",
      locale: "tr_TR",
      siteName: site.name,
      url: canonical ? `${site.url}${canonical}` : site.url,
      title,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}

/* ───────── JSON-LD ───────── */
export const ids = {
  business: `${site.url}/#business`,
  person: `${site.url}/#selin-sak`,
  website: `${site.url}/#website`,
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Ana sayfa", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function webPageLd(p: { type?: string; name: string; path: string; description?: string; extra?: Record<string, unknown> }) {
  return {
    "@context": "https://schema.org",
    "@type": p.type ?? "WebPage",
    "@id": `${site.url}${p.path}#page`,
    url: `${site.url}${p.path}`,
    name: p.name,
    description: p.description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.business },
    ...p.extra,
  };
}
