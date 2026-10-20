import { readDraft } from "@/lib/cms/content";
import { PageTitle } from "@/components/panel/kit";
import { Faqs } from "@/components/panel/Collections";

export const dynamic = "force-dynamic";

export default async function Page() {
  const c = await readDraft();
  return (
    <>
      <PageTitle title="Sık sorulan sorular" lead="Soruları ekleyin ve sıralayın. İşaretlediğiniz sorular ana sayfada da görünür." />
      <Faqs initial={c.faqs} />
    </>
  );
}
