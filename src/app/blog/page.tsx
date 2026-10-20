import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd, withOg } from "@/lib/seo";
import Link from "next/link";
import { Button, ContactBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Photo, hasAsset } from "@/components/Photo";
import { PostCard } from "@/components/PostCard";
import { BlogFilter } from "@/components/BlogFilter";
import { Mark } from "@/components/Icons";
import { getContent, postCategories, readingMinutesOf, visiblePosts } from "@/lib/cms/content";
import { postCover } from "@/components/PostCard";

export const metadata: Metadata = withOg({
  title: { absolute: "Psikoloji Blog Yazıları | Klinik Psikolog Selin Sak" },
  description:
    "Kaygı, panik atak, ilişkiler, uyku, tükenmişlik ve terapi süreci üzerine Klinik Psikolog Selin Sak’ın sade ve bilimsel temelli yazıları.",
  alternates: { canonical: "/blog" },
});

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function Blog() {
  const c = await getContent();
  const posts = visiblePosts(c);
  const categories = postCategories(c);
  const [featured] = posts;
  if (!featured) {
    return (
      <PageHero eyebrow="Blog" title="Güncel yazılar" lead="Yazılar çok yakında burada olacak." />
    );
  }
  const featuredImg = postCover(featured);

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Blog", path: "/blog" }]), webPageLd({ type: "CollectionPage", name: "Blog", path: "/blog" })]} />
      {/* Giriş */}
      <section className="relative isolate overflow-hidden px-6 pb-10 pt-36 sm:px-8 sm:pb-14 sm:pt-44">
        <div className="pointer-events-none absolute -right-32 -top-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-gold/35 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-40 top-40 -z-10 h-80 w-80 rounded-full bg-navy/[0.07] blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-6xl">
          <p className="hero-in mb-6 text-sm tracking-wide text-gold-deep">Blog</p>
          <h1 className="hero-in max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl" style={d(100)}>
            Zihne, ilişkilere ve yaşama dair yazılar
          </h1>
          <p className="hero-in mt-8 max-w-xl text-lg text-muted sm:text-xl" style={d(220)}>
            Psikolojik süreçleri sade bir dille anlatan, bilimsel temelli kısa yazılar.
          </p>
          <p className="hero-in mt-6 text-sm text-muted" style={d(320)}>
            {posts.length} yazı <span className="mx-2 text-navy/30">/</span> {categories.length} konu
          </p>
        </div>
      </section>

      {/* Öne çıkan yazı */}
      <section className="px-6 pb-12 sm:px-8 sm:pb-16 lg:pb-20">
        <Reveal className="mx-auto max-w-6xl">
          <Link href={`/blog/${featured.slug}`} className="glass-card group grid md:grid-cols-[1.15fr_1fr]">
            <div className="relative min-h-[16rem] overflow-hidden md:min-h-[26rem]">
              {hasAsset(featuredImg) ? (
                <Photo src={featuredImg} alt="" sizes="(min-width: 768px) 55vw, 100vw" priority className="absolute inset-0" editId={`post:${featured.id}`} />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-paper via-sand to-gold/40">
                  <Mark className="h-20 w-20 text-navy/25" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="text-sm text-gold-deep">
                Öne çıkan <span className="mx-1.5 text-navy/30">/</span> {featured.category} <span className="mx-1.5 text-navy/30">/</span>{" "}
                {readingMinutesOf(featured)} dk okuma
              </p>
              <h2 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-[2.6rem]">{featured.title}</h2>
              {featured.excerpt && <p className="mt-5 text-muted">{featured.excerpt}</p>}
              <span className="btn btn-primary mt-8 self-start">
                Yazıyı oku
                <span className="btn-dot">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Tüm yazılar */}
      <section className="px-6 sm:px-8 section-pb">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">Tüm yazılar</h2>
            <div className="mt-6">
              <BlogFilter categories={categories} />
            </div>
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 3) * 100}>
                <div data-post-cat={p.category} data-post-featured={p.id === featured.id ? "1" : undefined}>
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
