import { readDraft } from "@/lib/cms/content";
import { PageTitle } from "@/components/panel/kit";
import { Posts } from "@/components/panel/Posts";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const c = await readDraft();
  return (
    <>
      <PageTitle title="Blog yazıları" lead="Yeni yazı ekleyin, mevcutları düzenleyin ya da taslak olarak saklayın. Değişiklikler Yayınla’ya basana kadar sitede görünmez." />
      <Posts initial={c.posts} />
    </>
  );
}
