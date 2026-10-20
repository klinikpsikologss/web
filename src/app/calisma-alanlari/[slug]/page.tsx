import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd, withOg } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, ContactBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { SpecialtyArt } from "@/components/SpecialtyArt";
import { Arrow } from "@/components/Icons";
import { categories } from "@/lib/specialties";
import { getContent, getPublished, specialtyBySlug, catTitle } from "@/lib/cms/content";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = async () => (await getPublished()).specialties.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = specialtyBySlug(await getContent(), slug);
  if (!s) return {};
  const filled = !!s.body?.length;
  return withOg({
    title: { absolute: `${s.title} | Bolu Psikolog Selin Sak` },
    description: s.summary ? `${s.summary} Bolu’da Klinik Psikolog Selin Sak ile yüz yüze ve online psikoterapi.` : `${s.title} konusunda Klinik Psikolog Selin Sak ile Bolu’da yüz yüze ve online psikoterapi.`,
    alternates: { canonical: `/calisma-alanlari/${s.slug}` },
    // İçerik yazılana kadar boş sayfalar arama sonuçlarında görünmesin.
    robots: filled ? undefined : { index: false, follow: true },
  });
}

export default async function SpecialtyPage({ params }: Props) {
  const { slug } = await params;
  const ct = await getContent();
  const s = specialtyBySlug(ct, slug);
  if (!s) notFound();

  const cat = categories.find((c) => c.key === s.category)!;
  // İlişki konularında çift terapisi, diğerlerinde bireysel ve online terapi öne çıkar
  const related_therapies = ct.therapies.filter((t) => (s.category === "iliski" ? t.slug !== "online-psikoterapi" : t.slug !== "cift-terapisi"));
  const related = ct.specialties.filter((x) => x.category === s.category && x.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Çalışma Alanları", path: "/calisma-alanlari" }, { name: s.title, path: `/calisma-alanlari/${s.slug}` }]),
          webPageLd({ type: "MedicalWebPage", name: s.title, path: `/calisma-alanlari/${s.slug}`, description: s.summary, extra: { audience: { "@type": "PeopleAudience", audienceType: "Yetişkinler" }, lastReviewed: undefined } }),
        ]}
      />
      <PageHero eyebrow={catTitle(ct, cat.key, cat.title)} title={s.title} lead={s.summary} />

      <section className="px-6 sm:px-8 section-pb">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div className="max-w-2xl">
            {s.body?.length ? (
              <div className="space-y-6 text-lg leading-[1.85] text-ink/90">
                {s.body.map((t, i) =>
                  t.startsWith("## ") ? (
                    <Reveal key={i} className="pt-6">
                      <h2 className="text-3xl sm:text-4xl">{t.slice(3)}</h2>
                    </Reveal>
                  ) : (
                    <Reveal as="p" key={i}>
                      {t}
                    </Reveal>
                  ),
                )}
                <Reveal as="p" className="!mt-12 text-sm text-muted">
                  Bu sayfa genel bilgilendirme amacı taşır; tanı koymaz ve bireysel bir değerlendirmenin yerini tutmaz. Destek almak için
                  randevu oluşturabilirsiniz.
                </Reveal>
                <Reveal className="!mt-10 rounded-[0.75rem] bg-sand/70 p-6 sm:p-8">
                  <p className="font-display text-2xl text-navy">Bu konuda destek almak için</p>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    Bolu’da yüz yüze ya da online olarak{" "}
                    {related_therapies.map((t, i) => (
                      <span key={t.slug}>
                        {i > 0 && (i === related_therapies.length - 1 ? " ve " : ", ")}
                        <Link href={`/terapi/${t.slug}`} className="link-soft text-gold-deep">
                          {t.title.toLocaleLowerCase("tr")}
                        </Link>
                      </span>
                    ))}{" "}
                    seçeneklerinden size uygun olanı birlikte belirleyebiliriz. Süreç hakkında <Link href="/sss" className="link-soft text-gold-deep">sık sorulan sorulara</Link> göz atabilir ya da <Link href="/iletisim" className="link-soft text-gold-deep">iletişime geçebilirsiniz</Link>.
                  </p>
                </Reveal>
              </div>
            ) : (
              <Reveal>
                <div className="bezel">
                  <div className="bezel-core p-8 sm:p-10">
                    <h2 className="text-3xl">Bu başlığın içeriği hazırlanıyor</h2>
                    <p className="mt-5 text-muted">
                      {s.title} konusunda destek almak veya sürecin nasıl işlediği hakkında bilgi edinmek için benimle iletişime geçebilirsiniz.
                    </p>
                    <div className="mt-8">
                      <Button href="/iletisim">İletişime geç</Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal className="space-y-10">
            <div className="bezel !p-3">
              {s.image ? (
                <Photo src={s.image} alt={s.title} sizes="(min-width: 1024px) 30vw, 90vw" className="aspect-[4/5] rounded-[0.5rem]" editId={`spec:${s.slug}`} />
              ) : (
                <SpecialtyArt slug={s.slug} category={s.category} label={s.title} />
              )}
            </div>
            {related.length > 0 && (
              <nav aria-label="İlgili başlıklar">
                <p className="text-sm tracking-wide text-gold-deep">{catTitle(ct, cat.key, cat.title)}</p>
                <ul className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/calisma-alanlari/${r.slug}`} className="group flex items-center justify-between gap-4 py-4 text-navy">
                        <span>{r.title}</span>
                        <Arrow className="shrink-0 text-gold-deep transition-transform duration-700 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <Link href="/calisma-alanlari" className="link-soft inline-block text-sm text-gold-deep">
              Tüm çalışma alanlarına dön
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
