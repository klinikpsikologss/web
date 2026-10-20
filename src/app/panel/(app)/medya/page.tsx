import { listMedia } from "@/lib/cms/media";
import { PageTitle } from "@/components/panel/kit";
import { MediaLibrary } from "@/components/panel/Media";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  return (
    <>
      <PageTitle title="Medya" lead="Panelden yüklediğiniz görseller. Blog, hizmet ve galeri düzenlerken buradan seçebilirsiniz." />
      <MediaLibrary initial={await listMedia()} />
    </>
  );
}
