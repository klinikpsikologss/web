import { site } from "@/lib/site";
import { getPublished, siteOf } from "@/lib/cms/content";
import { clip } from "@/lib/seo";

/** Yapay zekâ asistanları için kısa, okunabilir site özeti (llmstxt.org biçimi). Panelden yayınlanan içerikten üretilir. */
export async function GET() {
  const c = await getPublished();
  const s = siteOf(c);
  const link = (title: string, path: string, note?: string) => `- [${title}](${site.url}${path})${note ? `: ${note}` : ""}`;

  const lines = [
    `# ${site.name}`,
    "",
    `> ${c.seo.description}`,
    "",
    `${site.name}, Bolu’da yetişkinlerle yüz yüze ve online bireysel psikoterapi ve çift terapisi yürüten bir klinik psikologdur. Çalışmalarında Bilişsel ve Davranışçı Terapiler (BDT) yaklaşımını temel alır.`,
    "",
    "## İletişim",
    `- Adres: ${s.address.street}, ${s.address.district}/${s.address.city}`,
    `- Telefon: ${s.phone}`,
    `- E-posta: ${s.email}`,
    `- Randevu: ${s.appointmentUrl}`,
    "",
    "## Sayfalar",
    link("Hakkımda", "/hakkimda", "eğitim, deneyim ve mesleki üyelikler"),
    link("Eğitimler ve Sertifikalar", "/egitimler-ve-sertifikalar"),
    link("Çalışma Alanları", "/calisma-alanlari", "kaygı, depresyon, travma, ilişki sorunları, yeme bozuklukları ve diğerleri"),
    link("Hizmetler", "/hizmetler", "bireysel terapi, çift terapisi, online terapi"),
    link("Sık Sorulan Sorular", "/sss"),
    link("Blog", "/blog"),
    link("İletişim", "/iletisim"),
    "",
    "## Hizmetler",
    ...c.therapies.map((t) => link(t.title, `/terapi/${t.slug}`, clip(t.short, 140))),
    "",
    "## Çalışma alanları",
    ...c.specialties.filter((x) => x.body?.length).map((x) => link(x.title, `/calisma-alanlari/${x.slug}`)),
    "",
    "## Blog yazıları",
    ...c.posts.filter((p) => p.status === "yayinda" && p.body?.length).map((p) => link(p.title, `/blog/${p.slug}`)),
    "",
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
