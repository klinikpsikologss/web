import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd, withOg } from "@/lib/seo";
import { ContactBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { GalleryGrid } from "@/components/Gallery";
import { getClinicPhotos } from "@/lib/gallery";
import { getContent } from "@/lib/cms/content";

export const metadata: Metadata = withOg({
  title: { absolute: "Klinik Görselleri | Klinik Psikolog Selin Sak" },
  description: "Klinik Psikolog Selin Sak’ın kliniğinden görüntüler: terapi odası ve bekleme alanı. Görüşmelerin yapıldığı sakin ve güvenli ortam.",
  alternates: { canonical: "/klinik-gorselleri" },
});

export default async function ClinicPhotos() {
  const ct = await getContent();
  const images = await getClinicPhotos(ct.gallery);

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Klinik Görselleri", path: "/klinik-gorselleri" }]), webPageLd({ type: "WebPage", name: "Klinik Görselleri", path: "/klinik-gorselleri" })]} />
      <PageHero editKey="klinik" eyebrow="Klinik" title="Klinik Görselleri" lead="Psikoterapi görüşmelerinin yapıldığı sakin ve güvenli klinik ortamından görüntüler." />
      <section className="px-6 sm:px-8 section-pb">
        <Reveal className="mx-auto max-w-6xl">
          {ct.__draft && <div data-edit-add="gal" data-edit-label="Klinik fotoğrafı ekle" />}
          {images.length > 0 ? (
            <GalleryGrid images={images} />
          ) : (
            <p className="text-muted">Görseller yakında eklenecek.</p>
          )}
        </Reveal>
      </section>
      <ContactBand />
    </>
  );
}
