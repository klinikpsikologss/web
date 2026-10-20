import { readDraft } from "@/lib/cms/content";
import { PageTitle } from "@/components/panel/kit";
import { Education } from "@/components/panel/Collections";

export const dynamic = "force-dynamic";

export default async function Page() {
  const c = await readDraft();
  return (
    <>
      <PageTitle title="Eğitimler ve sertifikalar" lead="Eğitim, sertifika ve deneyim gruplarını düzenleyin." />
      <Education initial={c.education} />
    </>
  );
}
