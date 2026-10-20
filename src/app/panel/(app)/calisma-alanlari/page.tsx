import { readDraft } from "@/lib/cms/content";
import { PageTitle } from "@/components/panel/kit";
import { Specialties } from "@/components/panel/Collections";

export const dynamic = "force-dynamic";

export default async function Page() {
  const c = await readDraft();
  return (
    <>
      <PageTitle title="Çalışma alanları" lead="Çalıştığınız konuların sayfalarını düzenleyin, yeni konu ekleyin ve görsellerini değiştirin." />
      <Specialties initial={c.specialties} texts={c.texts} />
    </>
  );
}
