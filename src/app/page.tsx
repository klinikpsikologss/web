import type { ReactNode } from "react";
import Link from "next/link";
import { Button, ContactBand, SectionHeading } from "@/components/ui";
import { Photo, hasAsset } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { getClinicPhotos } from "@/lib/gallery";
import { PostCard } from "@/components/PostCard";
import { FaqList } from "@/components/FaqList";
import { faqJsonLd } from "@/lib/faq";
import { Arrow, CategoryIcon, TherapyIcon } from "@/components/Icons";
import { categories } from "@/lib/specialties";
import { site } from "@/lib/site";
import { Edit } from "@/components/cms/Edit";
import { JsonLd } from "@/components/JsonLd";
import { getContent, siteOf, visiblePosts, type Content, catTitle } from "@/lib/cms/content";
import { HOME_ORDER_DEFAULT } from "@/lib/cms/home-sections";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
type C = Content & { __draft: boolean };

/* ───────── Hero ───────── */
function Hero({ appointmentUrl }: { appointmentUrl: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ivory" data-section-fixed="hero">
      {/* Mobil: dikey/kare kadraj üstte; varsa public/selin-hero-mobile.jpg kullanılır */}
      <Photo
        src={hasAsset("/selin-hero-mobile.jpg") ? "/selin-hero-mobile.jpg" : "/selin-hero.jpg"}
        alt="Klinik Psikolog Selin Sak"
        sizes="100vw"
        priority
        editId="hero.mobile"
        className="hero-photo absolute inset-x-0 top-0 -z-10 h-[29rem] sm:h-[38rem] lg:hidden"
        position="78% 20%"
      />
      <Photo src="/selin-hero.jpg" alt="" sizes="100vw" editId="hero.desktop" className="hero-photo absolute inset-0 -z-10 hidden lg:block" position="70% 25%" />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[calc(29rem+2px)] bg-[linear-gradient(to_top,var(--color-ivory)_0%,rgb(248_245_238/0.92)_14%,rgb(248_245_238/0.5)_32%,transparent_62%)] sm:h-[calc(38rem+2px)] lg:inset-0 lg:h-full lg:bg-[linear-gradient(to_right,rgb(248_245_238/0.1)_0%,rgb(248_245_238/0.4)_35%,transparent_52%)]"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 hidden h-28 bg-gradient-to-t from-ivory to-transparent lg:block" aria-hidden="true" />

      <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-[25.5rem] sm:px-8 sm:pb-20 sm:pt-[34rem] lg:flex lg:min-h-[46rem] lg:items-center lg:pb-28 lg:pt-44 xl:min-h-[52rem]">
        <div className="relative max-w-xl lg:max-w-[31rem] lg:[&_h1]:[text-shadow:0_0_28px_rgba(255,255,255,0.45)] lg:[&_p]:[text-shadow:0_0_20px_rgba(255,255,255,0.4)]">
          <div className="hero-text-veil pointer-events-none absolute -inset-x-20 -inset-y-16 -z-10 hidden lg:block" aria-hidden="true" />
          <Edit id="home.hero.title" as="h1" className="hero-in text-[2.15rem] leading-[1.12] sm:text-5xl lg:text-[3.1rem] xl:text-[3.4rem]" style={d(80)}>
            Değişim, fark etmekle başlar; duygularla temas ederek ve yeni adımlar atarak şekillenir.
          </Edit>

          <div className="hero-in mt-6 flex items-center gap-5 sm:mt-8" style={d(240)}>
            <div>
              <Edit id="home.hero.role" as="p" className="text-sm tracking-wide text-gold-deep">
                Klinik Psikolog
              </Edit>
              <Edit id="home.hero.name" as="p" className="font-display text-3xl text-navy">
                Selin Sak
              </Edit>
            </div>
          </div>

          <Edit id="home.hero.desc" as="p" multiline className="hero-in mt-4 text-[0.97rem] text-ink sm:mt-6 sm:text-lg" style={d(360)}>
            Her danışanın deneyiminin kendine özgü olduğunu gözeterek terapi sürecini bilimsel temeller ve etik ilkeler doğrultusunda, bireysel ihtiyaçlara göre şekillendiririm.
          </Edit>

          <div className="hero-in mt-7 flex gap-3 sm:mt-9 sm:gap-4" style={d(480)}>
            <Button href={appointmentUrl} external>Randevu Al</Button>
            <Button href="/hakkimda" variant="ghost">
              Hakkımda
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Bölümler (sıralanabilir) ───────── */
const sections: Record<string, (c: C) => ReactNode | Promise<ReactNode>> = {
  hizmetler: (c) => (
    <section className="relative isolate overflow-hidden px-6 sm:px-8 section-y">
      <div className="pointer-events-none absolute left-[18%] top-[48%] -z-10 h-72 w-72 rounded-full bg-gold/55 max-sm:hidden blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[16%] top-[30%] -z-10 h-80 w-80 rounded-full bg-navy/[0.16] max-sm:hidden blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading editKey="home.hizmetler" eyebrow="Hizmetler" title="Size uygun olan biçimde, birlikte çalışırız" />
        <ul className="mt-10 -mx-6 flex scroll-pl-6 snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-14 pt-2 -mb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:scroll-pl-8 sm:px-8 md:mx-0 md:scroll-pl-0 md:mb-0 md:grid md:overflow-visible md:px-0 md:pb-0 md:pt-0 md:grid-cols-3 md:gap-8">
          {c.therapies.map((t, i) => (
            <Reveal as="li" key={t.slug} delay={i * 120} className="w-[84%] shrink-0 snap-start md:w-auto">
              <Link href={`/terapi/${t.slug}`} className="glass-card group block h-full">
                <div className="flex h-full flex-col p-6 sm:p-9">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-navy/[0.06] text-gold-deep shadow-[inset_0_0_0_1px_rgba(15,39,71,0.08)] transition-colors duration-[1000ms] [transition-timing-function:var(--ease-soft)] group-hover:bg-navy group-hover:text-gold">
                    <TherapyIcon name={t.slug} />
                  </span>
                  <h3 className="mt-6 text-[1.7rem] leading-tight sm:mt-7 sm:text-[1.9rem]">{t.title}</h3>
                  <p className="mt-4 line-clamp-5 flex-1 text-[0.97rem] leading-relaxed text-muted md:line-clamp-6">{t.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-deep sm:mt-8">
                    Detaylı bilgi
                    <Arrow className="transition-transform duration-[900ms] [transition-timing-function:var(--ease-soft)] group-hover:translate-x-2" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  ),

  galeri: async (c) => (
    <section className="section-y">
      <Reveal>
        <Gallery images={await getClinicPhotos(c.gallery)} label="Klinik ortamı" seeAllHref="/klinik-gorselleri" />
      </Reveal>
      <Reveal className="mt-[var(--section-y)] px-6 sm:px-8">
        <Edit id="home.quote" as="p" className="mx-auto max-w-4xl text-center font-display text-3xl leading-snug text-navy sm:text-5xl sm:leading-[1.2]">
          Duygularınıza alan açmak, onlarla farklı bir ilişki kurabilmenin başlangıcıdır.
        </Edit>
      </Reveal>
    </section>
  ),

  "calisma-alanlari": (c) => (
    <section className="bg-sand/60 px-6 sm:px-8 section-y">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            editKey="home.alanlar"
            eyebrow="Çalışma alanları"
            title="Hangi konularda destek veriyorum"
            lead="Kaygıdan ilişki sorunlarına, yeme bozukluklarından psikoonkolojiye uzanan alanlarda çalışıyorum."
          />
          <Reveal delay={150} className="mt-10">
            <Button href="/calisma-alanlari">Tüm çalışma alanları</Button>
          </Reveal>
        </div>

        <ul className="divide-y divide-navy/10 border-y border-navy/10">
          {categories.map((cat, i) => {
            const names = c.specialties.filter((s) => s.category === cat.key).slice(0, 3).map((s) => s.title);
            return (
              <Reveal as="li" key={cat.key} delay={i * 60}>
                <Link href={`/calisma-alanlari#${cat.key}`} className="group flex items-center gap-6 py-7 sm:gap-8 sm:py-8">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-paper text-gold-deep shadow-[inset_0_0_0_1px_rgba(15,39,71,0.07)] transition-colors duration-700 group-hover:bg-navy group-hover:text-gold">
                    <CategoryIcon name={cat.key} width={30} height={30} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-2xl text-navy sm:text-[1.7rem]">{catTitle(c, cat.key, cat.title)}</span>
                    <span className="mt-1 block truncate text-sm text-muted">{names.join(", ")}…</span>
                  </span>
                  <Arrow className="shrink-0 text-gold-deep transition-transform duration-700 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1.5" />
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  ),

  hakkimda: () => (
    <section className="px-6 sm:px-8 section-y">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal className="group">
          <div className="bezel !p-3">
            <Photo
              src="/selin-hakkimda.jpg"
              alt="Klinik Psikolog Selin Sak"
              sizes="(min-width: 1024px) 40vw, 90vw"
              editId="about.photo"
              className="aspect-[4/5] rounded-[0.5rem]"
              position="center 25%"
            />
          </div>
        </Reveal>
        <div>
          <SectionHeading editKey="home.hakkimda" eyebrow="Hakkımda" title="Formülasyon temelli, bilimsel ve etik bir yaklaşım" />
          <Reveal delay={120}>
            <Edit id="home.hakkimda.text" as="p" multiline className="mt-8 max-w-xl text-lg text-muted">
              Bilişsel ve Davranışçı Terapiler (BDT) yaklaşımıyla çalışıyor, yaşadığınız zorlanmaları yalnızca belirtiler üzerinden değil, onları sürdüren süreçler üzerinden birlikte ele alıyorum. Kendi kliniğimde 900’ü aşkın seans deneyimimle, yüz yüze ve online psikoterapi yürütüyorum.
            </Edit>
            <div className="mt-10">
              <Button href="/hakkimda" variant="ghost">
                Devamını oku
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  ),

  blog: (c) => (
    <section className="bg-sand/60 px-6 sm:px-8 section-y">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading editKey="home.blog" eyebrow="Blog" title="Güncel yazılar" />
          <Reveal>
            <Button href="/blog" variant="ghost">
              Tüm yazılar
            </Button>
          </Reveal>
        </div>
        <ul className="mt-10 -mx-6 flex scroll-pl-6 snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-14 pt-2 -mb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:scroll-pl-8 sm:px-8 md:mx-0 md:scroll-pl-0 md:mb-0 md:grid md:overflow-visible md:px-0 md:pb-0 md:pt-0 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
          {visiblePosts(c)
            .slice(0, 3)
            .map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 100} className="w-[78%] shrink-0 snap-start md:w-auto">
                <PostCard post={p} />
              </Reveal>
            ))}
        </ul>
      </div>
    </section>
  ),

  sss: (c) => {
    const homeFaqs = c.faqs.filter((f) => f.home);
    return (
      <section className="relative isolate overflow-hidden px-6 section-y sm:px-8">
        <div className="pointer-events-none absolute left-[8%] top-0 -z-10 h-80 w-80 rounded-full bg-gold/50 max-sm:hidden blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute right-[6%] top-[22%] -z-10 h-80 w-80 rounded-full bg-navy/[0.1] max-sm:hidden blur-3xl" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              editKey="home.sss"
              eyebrow="Merak edilenler"
              title="Sık sorulan sorular"
              lead="Terapi sürecine dair en çok sorulan sorular. Aklınızdaki başka bir soru için bize yazabilirsiniz."
            />
            <Reveal delay={150} className="mt-10">
              <Button href="/sss">Tüm sorular</Button>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <FaqList items={homeFaqs} />
          </Reveal>
        </div>
        <JsonLd data={faqJsonLd(homeFaqs)} />
      </section>
    );
  },
};

export default async function Home() {
  const c = await getContent();
  const hidden = new Set(c.home.hidden);
  const known = HOME_ORDER_DEFAULT.filter((id) => id in sections);
  const order = [...c.home.order.filter((id) => known.includes(id)), ...known.filter((id) => !c.home.order.includes(id))];

  return (
    <>
      <Hero appointmentUrl={siteOf(c).appointmentUrl} />
      {await Promise.all(
        order.map(async (id) => {
          const isHidden = hidden.has(id);
          if (isHidden && !c.__draft) return null;
          return (
            <div key={id} data-section-id={id} data-section-hidden={isHidden ? "true" : undefined}>
              {await sections[id](c)}
            </div>
          );
        }),
      )}
      <ContactBand />
    </>
  );
}
