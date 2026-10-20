import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd, withOg } from "@/lib/seo";
import Link from "next/link";
import { ContactBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Arrow, TherapyIcon } from "@/components/Icons";
import { getContent } from "@/lib/cms/content";

export const metadata: Metadata = withOg({
  title: { absolute: "Terapi Hizmetleri: Bireysel, Çift ve Online | Selin Sak" },
  description: "Bireysel psikoterapi, çift terapisi ve online psikoterapi. Bolu’da yüz yüze ve online olarak yürütülen terapi hizmetleri.",
  alternates: { canonical: "/hizmetler" },
});

export default async function Working() {
  const c = await getContent();
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Hizmetler", path: "/hizmetler" }]), webPageLd({ type: "CollectionPage", name: "Hizmetler", path: "/hizmetler" })]} />
      <PageHero
        editKey="hizmetler"
        eyebrow="Hizmetler"
        title="Terapi hizmetlerim"
        lead="Psikoterapi hizmetlerimi bireysel terapi ve çift terapisi alanında, yüz yüze ve online olarak yürütmekteyim."
      />
      <section className="relative isolate overflow-hidden px-6 sm:px-8 section-pb">
        <div className="pointer-events-none absolute left-[12%] top-[10%] -z-10 h-72 w-72 rounded-full bg-gold/55 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute right-[10%] bottom-[8%] -z-10 h-80 w-80 rounded-full bg-navy/[0.16] blur-3xl" aria-hidden="true" />
        <ul className="mx-auto max-w-6xl space-y-6">
          {c.therapies.map((t) => (
            <Reveal as="li" key={t.slug}>
              <Link href={`/terapi/${t.slug}`} className="glass-card group block">
                <div className="grid items-center gap-6 p-7 sm:p-10 md:grid-cols-[auto_0.55fr_1fr_auto] md:gap-10">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-navy/[0.06] text-gold-deep shadow-[inset_0_0_0_1px_rgba(15,39,71,0.08)] transition-colors duration-[1000ms] [transition-timing-function:var(--ease-soft)] group-hover:bg-navy group-hover:text-gold">
                    <TherapyIcon name={t.slug} />
                  </span>
                  <h2 className="text-3xl sm:text-4xl">{t.title}</h2>
                  <p className="line-clamp-3 text-muted">{t.short}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-deep">
                    Detaylı bilgi
                    <Arrow className="transition-transform duration-700 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-2" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <ContactBand />
    </>
  );
}
