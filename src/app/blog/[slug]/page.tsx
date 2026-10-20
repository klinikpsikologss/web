import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, ids, withOg } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, ContactBand } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Photo, hasAsset } from "@/components/Photo";
import { PostCard } from "@/components/PostCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareButton } from "@/components/ShareButton";
import { Toc, type TocItem } from "@/components/Toc";
import { Mark } from "@/components/Icons";
import { getContent, getPublished, siteOf, postBySlug, readingMinutesOf, visiblePosts } from "@/lib/cms/content";
import { slugify } from "@/lib/posts";
import { postCover } from "@/components/PostCard";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = async () => (await getPublished()).posts.filter((p) => p.status === "yayinda").map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await getContent();
  const p = postBySlug(c, slug);
  if (!p) return {};
  const img = postCover(p);
  return withOg(
    {
      title: { absolute: `${p.title} | Klinik Psikolog Selin Sak` },
      description: p.excerpt ?? `${p.title}. Klinik Psikolog Selin Sak blog yazısı.`,
      alternates: { canonical: `/blog/${p.slug}` },
      robots: p.body?.length ? undefined : { index: false, follow: true },
    },
    { type: "article", image: hasAsset(img) ? img : undefined },
  );
}

const NOTE = /^Bu yazı genel bilgilendirme/;

/** "Kısa etiket. Devamı..." biçimindeki paragrafları ipucu bloğu olarak ayırır. */
function splitTip(text: string): { label: string; rest: string } | null {
  const m = text.match(/^([^.!?]{3,48}[.!?])\s+(.{60,})$/s);
  if (!m) return null;
  return m[1].trim().split(/\s+/).length <= 6 ? { label: m[1], rest: m[2] } : null;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const c = await getContent();
  const p = postBySlug(c, slug);
  if (!p) notFound();
  const posts = visiblePosts(c);

  const body = p.body ?? [];
  const note = body.find((t) => NOTE.test(t));
  const content = body.filter((t) => !NOTE.test(t));
  const toc: TocItem[] = content.filter((t) => t.startsWith("## ")).map((t) => ({ id: slugify(t.slice(3)), text: t.slice(3) }));
  const firstPara = content.findIndex((t) => !t.startsWith("## "));
  const coverSrc = postCover(p);
  // Yazar yuvarlağı: selin-avatar.jpg varsa o, yoksa Hakkımda fotoğrafı
  const avatar = hasAsset("/selin-avatar.jpg") ? "/selin-avatar.jpg" : "/selin-hakkimda.jpg";
  const related = [...posts.filter((o) => o.slug !== p.slug && o.category === p.category), ...posts.filter((o) => o.slug !== p.slug && o.category !== p.category)].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    image: hasAsset(coverSrc) ? `${site.url}${coverSrc}` : undefined,
    datePublished: p.updatedAt,
    dateModified: p.updatedAt,
    inLanguage: "tr-TR",
    author: { "@id": ids.person },
    publisher: { "@id": ids.business },
    mainEntityOfPage: `${site.url}/blog/${p.slug}`,
  };

  return (
    <>
      <ReadingProgress targetId="yazi" />
      <JsonLd data={[jsonLd, breadcrumbLd([{ name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }])]} />

      {/* Başlık */}
      <header className="relative isolate overflow-hidden px-6 pb-10 pt-36 sm:px-8 sm:pb-14 sm:pt-44">
        <div className="pointer-events-none absolute -right-32 -top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-gold/30 blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Konum" className="hero-in text-sm text-muted">
            <Link href="/blog" className="link-soft text-gold-deep">
              Blog
            </Link>
            <span className="mx-2 text-navy/30">/</span>
            <span>{p.category}</span>
          </nav>
          <h1 className="hero-in mt-6 text-4xl leading-[1.1] sm:text-6xl" style={{ "--d": "100ms" } as React.CSSProperties}>
            {p.title}
          </h1>
          {p.excerpt && (
            <p className="hero-in mt-7 max-w-2xl text-lg text-muted sm:text-xl" style={{ "--d": "200ms" } as React.CSSProperties}>
              {p.excerpt}
            </p>
          )}
          <div className="hero-in mt-9 flex items-center gap-4" style={{ "--d": "300ms" } as React.CSSProperties}>
            {hasAsset(avatar) ? (
              <Photo src={avatar} alt="" sizes="48px" className="h-12 w-12 rounded-full" position="center 20%" />
            ) : (
              <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-gold">
                <Mark className="h-6 w-6" />
              </span>
            )}
            <div className="text-sm leading-tight">
              <p className="font-medium text-navy">Klinik Psikolog Selin Sak</p>
              <p className="mt-1 text-muted">{readingMinutesOf(p)} dk okuma</p>
            </div>
          </div>
        </div>
      </header>

      {/* Kapak görseli */}
      <div className="px-6 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[0.875rem] shadow-[0_40px_80px_-44px_rgba(15,39,71,0.5)]">
            {hasAsset(coverSrc) ? (
              <Photo src={coverSrc} alt={p.title} sizes="(min-width: 1024px) 64rem, 100vw" priority className="aspect-[16/9] sm:aspect-[21/9]" editId={`post:${p.id}`} />
            ) : (
              <div className="grid aspect-[16/9] place-items-center bg-gradient-to-br from-paper via-sand to-gold/40 sm:aspect-[21/9]">
                <Mark className="h-20 w-20 text-navy/25" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Okuma alanı */}
      <section className="px-6 pt-12 sm:px-8 sm:pt-16 section-pb">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[13rem_minmax(0,40rem)] lg:justify-center lg:gap-16">
          {/* İçindekiler: masaüstünde yapışkan, mobilde katlanır */}
          <aside className="lg:order-first">
            <div className="lg:sticky lg:top-32">
              <details className="rounded-[0.875rem] bg-navy/[0.04] p-5 lg:hidden">
                <summary className="cursor-pointer text-sm text-navy">Bu yazıda neler var?</summary>
                <ol className="mt-4 space-y-2.5 text-[0.95rem]">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="text-muted hover:text-navy">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
              <div className="hidden lg:block">
                <Toc items={toc} />
              </div>
            </div>
          </aside>

          <article id="yazi" className="min-w-0">
            {content.length === 0 ? (
              <div className="glass-card p-8">
                <h2 className="text-3xl">Bu yazı hazırlanıyor</h2>
                <p className="mt-4 text-muted">Yazı çok yakında burada yayımlanacak.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {content.map((t, i) => {
                  if (t.startsWith("## ")) {
                    const text = t.slice(3);
                    return (
                      <h2 key={i} id={slugify(text)} className="scroll-mt-32 pt-8 text-3xl leading-tight sm:text-[2.2rem]">
                        {text}
                      </h2>
                    );
                  }
                  if (i === firstPara) {
                    return (
                      <p key={i} className="font-display text-[1.45rem] leading-[1.6] text-navy sm:text-[1.65rem]">
                        {t}
                      </p>
                    );
                  }
                  const tip = splitTip(t);
                  if (tip) {
                    return (
                      <p key={i} className="rounded-r-lg border-l-2 border-gold bg-navy/[0.03] py-4 pl-5 pr-4 text-[1.075rem] leading-[1.85] text-ink/90">
                        <strong className="font-semibold text-navy">{tip.label}</strong> {tip.rest}
                      </p>
                    );
                  }
                  return (
                    <p key={i} className="text-[1.125rem] leading-[1.9] text-ink/90">
                      {t}
                    </p>
                  );
                })}
              </div>
            )}

            {note && (
              <p className="mt-12 rounded-[0.875rem] bg-navy/[0.04] p-5 text-sm leading-relaxed text-muted">
                {note} Destek almak için randevu oluşturabilirsiniz.
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-8">
              <Link href="/blog" className="link-soft text-sm text-gold-deep">
                Tüm yazılara dön
              </Link>
              <ShareButton title={p.title} />
            </div>
          </article>
        </div>
      </section>

      {/* Yazar */}
      <section className="px-6 sm:px-8 section-pb">
        <Reveal className="mx-auto max-w-5xl">
          <div className="glass-card grid items-center gap-8 p-7 sm:grid-cols-[auto_1fr_auto] sm:p-10">
            {hasAsset(avatar) ? (
              <Photo src={avatar} alt="Klinik Psikolog Selin Sak" sizes="112px" className="h-24 w-24 rounded-full sm:h-28 sm:w-28" position="center 20%" />
            ) : (
              <span className="grid h-24 w-24 place-items-center rounded-full bg-navy text-gold sm:h-28 sm:w-28">
                <Mark className="h-10 w-10" />
              </span>
            )}
            <div>
              <p className="text-sm text-gold-deep">Yazar</p>
              <p className="mt-1 font-display text-3xl text-navy">Selin Sak</p>
              <p className="mt-2 max-w-xl text-muted">
                Klinik Psikolog. Bilişsel ve Davranışçı Terapiler yaklaşımıyla Bolu’da yüz yüze ve online psikoterapi.
              </p>
            </div>
            <div className="justify-self-start"><Button href={siteOf(c).appointmentUrl} external>Randevu Al</Button></div>
          </div>
        </Reveal>
      </section>

      {/* İlgili yazılar */}
      {related.length > 0 && (
        <section className="px-6 sm:px-8 section-pb">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl">Okumaya devam edin</h2>
            </Reveal>
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Reveal as="li" key={r.id} delay={i * 100}>
                  <PostCard post={r} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactBand />
    </>
  );
}
