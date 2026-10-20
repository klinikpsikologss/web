import { readDraft } from "@/lib/cms/content";
import { PageTitle } from "@/components/panel/kit";
import { Therapies } from "@/components/panel/Collections";

export const dynamic = "force-dynamic";

export default async function Page() {
  const c = await readDraft();
  return (
    <>
      <PageTitle title="Hizmetler" lead="Terapi türlerini ekleyin, düzenleyin ve sıralayın. Sıra sitedeki kartlara da yansır." />
      <Therapies initial={c.therapies} />
    </>
  );
}
