import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd, withOg } from "@/lib/seo";
import { ContactBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { PostCard } from "@/components/PostCard";
import { BlogFilter } from "@/components/BlogFilter";
import { getContent, postCategories, visiblePosts } from "@/lib/cms/content";

export const metadata: Metadata = withOg({
  title: { absolute: "Psikoloji Blog Yazıları | Klinik Psikolog Selin Sak" },
  description:
    "Kaygı, panik atak, ilişkiler, uyku, tükenmişlik ve terapi süreci üzerine Klinik Psikolog Selin Sak’ın sade ve bilimsel temelli yazıları.",
  alternates: { canonical: "/blog" },
});

export default async function Blog() {
  const c = await getContent();
  const posts = visiblePosts(c);
  const categories = postCategories(c);
  const hero = { src: "/blog-hero.jpg", position: "68% 40%", editId: "blog.hero" };
  if (posts.length === 0) {
    return <PageHero editKey="blog" eyebrow="Yazılar" title="Blog" lead="Yazılar çok yakında burada olacak." image={hero} />;
  }

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Blog", path: "/blog" }]), webPageLd({ type: "CollectionPage", name: "Blog", path: "/blog" })]} />
      <PageHero editKey="blog" eyebrow="Yazılar" title="Blog" lead="Psikoloji ve psikoterapiye dair bilimsel temelli yazılar." image={hero} />

      {/* Tüm yazılar */}
      <section className="px-6 sm:px-8 section-pb">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">Tüm Yazılar</h2>
            <div className="mt-6">
              <BlogFilter categories={categories} />
            </div>
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 3) * 100}>
                <div data-post-cat={p.category}>
                  <PostCard post={p} />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
