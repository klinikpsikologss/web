import Link from "next/link";
import { PageHero } from "./ui";
import { Reveal } from "./Reveal";
import { LEGAL_UPDATED, getLegal, legalDocsFor } from "@/lib/legal";
import { getContent, siteOf } from "@/lib/cms/content";

/** Yasal metin sayfası: sade, rahat okunur; altta diğer yasal sayfalara bağlantılar. */
export async function LegalPage({ slug }: { slug: string }) {
  const site = siteOf(await getContent());
  const doc = getLegal(site, slug);
  const others = legalDocsFor(site).filter((d) => d.slug !== slug);

  return (
    <>
      <PageHero eyebrow="Yasal" title={doc.title} lead={doc.lead} />
      <section className="px-6 sm:px-8 section-pb">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted">Son güncelleme: {LEGAL_UPDATED}</p>
          <div className="mt-8 space-y-10">
            {doc.sections.map((s) => (
              <Reveal key={s.title}>
                <h2 className="text-2xl sm:text-3xl">{s.title}</h2>
                {s.paragraphs?.map((p, i) => (
                  <p key={i} className="mt-4 text-[1.05rem] leading-[1.85] text-ink/90">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2.5">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-4 text-[1.05rem] leading-[1.75] text-ink/90">
                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>

          <nav aria-label="Diğer yasal sayfalar" className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-navy/10 pt-8 text-sm">
            {others.map((o) => (
              <Link key={o.slug} href={`/${o.slug}`} className="link-soft text-gold-deep">
                {o.title}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
