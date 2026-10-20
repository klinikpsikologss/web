import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, clip, ids, webPageLd, withOg } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { getContent, getPublished, therapyBySlug } from "@/lib/cms/content";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = async () => (await getPublished()).therapies.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = therapyBySlug(await getContent(), slug);
  if (!t) return {};
  return withOg({ title: { absolute: `${t.title} | Bolu Psikolog Selin Sak` }, description: t.short, alternates: { canonical: `/terapi/${t.slug}` } });
}

export default async function TherapyPage({ params }: Props) {
  const { slug } = await params;
  const c = await getContent();
  const t = therapyBySlug(c, slug);
  if (!t) notFound();
  const others = c.therapies.filter((o) => o.slug !== t.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Hizmetler", path: "/hizmetler" }, { name: t.title, path: `/terapi/${t.slug}` }]),
          webPageLd({ name: t.title, path: `/terapi/${t.slug}`, description: clip(t.short) }),
          { "@context": "https://schema.org", "@type": "Service", name: t.title, serviceType: t.title, description: clip(t.short, 300), provider: { "@id": ids.business }, areaServed: { "@type": "City", name: "Bolu" }, availableChannel: { "@type": "ServiceChannel", serviceUrl: `https://www.klinikpsikologselinsak.com/terapi/${t.slug}` } },
        ]}
      />
      <PageHero eyebrow="Hizmetler" title={t.title} />

      <section className="px-6 sm:px-8 section-pb">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div className="max-w-2xl">
            <Reveal as="p" className="text-xl leading-[1.8] text-ink/90">
              {t.short}
            </Reveal>
            <Reveal as="p" className="mt-6 text-[1.1rem] leading-[1.85] text-ink/90">
              {t.intro}
            </Reveal>
            {t.points.length > 0 && (
              <Reveal className="mt-12">
                <ul className="divide-y divide-navy/10 border-y border-navy/10">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-5 py-5 text-lg text-navy">
                      <span className="mt-[0.8em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            <div className="mt-14 space-y-10">
              {t.sections.map((sec) => (
                <Reveal key={sec.title}>
                  <h2 className="text-3xl sm:text-4xl">{sec.title}</h2>
                  {sec.paragraphs.map((para, i) => (
                    <p key={i} className="mt-4 text-[1.1rem] leading-[1.85] text-ink/90">
                      {para}
                    </p>
                  ))}
                  {sec.list && sec.list.length > 0 && (
                    <ul className="mt-5 divide-y divide-navy/10 border-y border-navy/10">
                      {sec.list.map((p) => (
                        <li key={p} className="flex gap-5 py-3.5 text-[1.05rem] text-navy">
                          <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                          {p.replace(/[,]$/, "")}
                        </li>
                      ))}
                    </ul>
                  )}
                  {sec.closing?.map((para, i) => (
                    <p key={i} className="mt-4 text-[1.1rem] leading-[1.85] text-ink/90">
                      {para}
                    </p>
                  ))}
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <p className="text-sm tracking-wide text-gold-deep">Diğer çalışma biçimleri</p>
            <ul className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/terapi/${o.slug}`} className="block py-5 font-display text-2xl text-navy transition-colors duration-500 hover:text-gold-deep">
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
