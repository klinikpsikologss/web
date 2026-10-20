import { readDraft } from "@/lib/cms/content";
import { getCertificates } from "@/lib/certificates";
import { PageTitle } from "@/components/panel/kit";
import { GalleryEditor } from "@/components/panel/Media";

export const dynamic = "force-dynamic";

export default async function Page() {
  const c = await readDraft();
  const items = await getCertificates(c.certs);
  return (
    <>
      <PageTitle title="Sertifika görselleri" lead="Eğitimler ve Sertifikalar sayfasının altındaki sertifika şeridi. Görsel ekleyin, sıralayın veya kaldırın." />
      <GalleryEditor field="certs" initial={items.map((p) => p.src)} isDefault={c.certs === null} addLabel="Sertifika görseli ekle" note="Henüz panelden sertifika eklenmedi. Eklediğiniz görseller sayfadaki şeritte gösterilir." />
    </>
  );
}
