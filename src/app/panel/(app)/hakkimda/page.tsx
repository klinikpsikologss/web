import { readDraft } from "@/lib/cms/content";
import { PageTitle } from "@/components/panel/kit";
import { AboutEditor } from "@/components/panel/About";

export const dynamic = "force-dynamic";

export default async function Page() {
  const c = await readDraft();
  return (
    <>
      <PageTitle title="Hakkımda" lead="Mesleki üyelikler ile konferans, atölye ve gönüllü çalışma listelerini düzenleyin." />
      <AboutEditor initial={c.about} />
    </>
  );
}
