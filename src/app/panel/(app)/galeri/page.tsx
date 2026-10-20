import { readDraft } from "@/lib/cms/content";
import { getClinicPhotos } from "@/lib/gallery";
import { PageTitle } from "@/components/panel/kit";
import { GalleryEditor } from "@/components/panel/Media";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const c = await readDraft();
  const photos = await getClinicPhotos(c.gallery);
  return (
    <>
      <PageTitle title="Klinik galerisi" lead="Ana sayfada ve Klinik görselleri sayfasında gösterilen fotoğraflar. Sırayı değiştirebilir, yenilerini ekleyebilirsiniz." />
      <GalleryEditor initial={photos.map((p) => p.src)} isDefault={!c.gallery || c.gallery.length === 0} />
    </>
  );
}
