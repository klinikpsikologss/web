import { readDraft } from "@/lib/cms/content";
import { getEventPhotos } from "@/lib/event-photos";
import { PageTitle } from "@/components/panel/kit";
import { GalleryEditor } from "@/components/panel/Media";

export const dynamic = "force-dynamic";

export default async function Page() {
  const c = await readDraft();
  const items = await getEventPhotos(c.events);
  return (
    <>
      <PageTitle title="Etkinlik fotoğrafları" lead="Hakkımda sayfasındaki “Bilimsel ve mesleki etkinlikler” bölümünün fotoğraf şeridi." />
      <GalleryEditor field="events" initial={items.map((p) => p.src)} isDefault={c.events === null} addLabel="Etkinlik fotoğrafı ekle" note="Henüz panelden etkinlik fotoğrafı eklenmedi. Eklediğiniz görseller Hakkımda sayfasındaki şeritte gösterilir." />
    </>
  );
}
