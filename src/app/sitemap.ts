import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublished } from "@/lib/cms/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = await getPublished();
  const fixed = ["", "/hakkimda", "/egitimler-ve-sertifikalar", "/calisma-alanlari", "/hizmetler", "/klinik-gorselleri", "/blog", "/sss", "/iletisim"].map((p) => ({
    url: `${site.url}${p}`,
    priority: p === "" ? 1 : 0.8,
  }));
  // Güncelleme tarihi bilinmeyen sayfalara sahte "lastModified" yazılmaz; yalnızca blog yazılarının gerçek tarihi vardır.
  const th = c.therapies.map((t) => ({ url: `${site.url}/terapi/${t.slug}`, priority: 0.7 }));
  // İçeriği henüz yazılmamış (noindex) uzmanlık sayfaları site haritasına girmez.
  const sp = c.specialties.filter((s) => s.body?.length).map((s) => ({ url: `${site.url}/calisma-alanlari/${s.slug}`, priority: 0.6 }));
  const bp = c.posts
    .filter((p) => p.status === "yayinda" && p.body?.length)
    .map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.updatedAt), priority: 0.6 }));
  return [...fixed, ...th, ...sp, ...bp];
}
