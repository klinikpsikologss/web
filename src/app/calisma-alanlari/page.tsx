import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd, withOg } from "@/lib/seo";
import Link from "next/link";
import { ContactBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/Icons";
import { categories } from "@/lib/specialties";
import { catTitle, getContent } from "@/lib/cms/content";

export const metadata: Metadata = withOg({
  title: { absolute: "Çalışma Alanları: Anksiyete, Depresyon, Travma | Selin Sak" },
  description:
    "Anksiyete, depresyon, travma, ilişki sorunları, yeme bozuklukları, tükenmişlik, psikoonkoloji ve daha fazlası. Klinik Psikolog Selin Sak’ın çalıştığı alanlar.",
  alternates: { canonical: "/calisma-alanlari" },
});

export default async function Specialties() {
  const ct = await getContent();
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Çalışma Alanları", path: "/calisma-alanlari" }]), webPageLd({ type: "CollectionPage", name: "Çalışma Alanları", path: "/calisma-alanlari" })]} />
      <PageHero
        editKey="alanlar"
        eyebrow="Psikoterapi"
        title="Çalışma alanları"
        lead="Bilimsel temellere dayalı, kişiye özgü psikoterapi süreci."
      />

      <section className="relative isolate overflow-hidden px-6 sm:px-8 section-pb">
        <div className="pointer-events-none absolute -right-24 top-[8%] -z-10 h-80 w-80 rounded-full bg-gold/40 max-sm:hidden blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-6xl space-y-12 sm:space-y-14">
          {categories.map((cat) => {
            const items = ct.specialties.filter((x) => x.category === cat.key);
            if (!items.length) return null;
            return (
              <div key={cat.key} id={cat.key} className="scroll-mt-28 grid gap-x-16 gap-y-3 lg:grid-cols-[13rem_1fr]">
                <Reveal>
                  <h2 className="font-sans text-[0.8rem] font-medium uppercase tracking-[0.18em] text-gold-deep lg:pt-5">{catTitle(ct, cat.key, cat.title)}</h2>
                </Reveal>
                <ul className="border-t border-navy/10 lg:columns-2 lg:gap-x-14">
                  {items.map((s, i) => (
                    <Reveal as="li" key={s.slug} delay={(i % 6) * 50} className="break-inside-avoid border-b border-navy/10">
                      <Link
                        href={`/calisma-alanlari/${s.slug}`}
                        className="group flex items-center gap-4 py-[1.05rem] transition-[padding,background-color] duration-700 [transition-timing-function:var(--ease-soft)] hover:bg-gold/15 hover:pl-3 hover:pr-3 sm:py-[1.15rem]"
                      >
                        <span className="min-w-0 flex-1 font-display text-[1.25rem] leading-snug text-navy sm:text-[1.4rem]">{s.title}</span>
                        <Arrow className="shrink-0 text-gold-deep opacity-0 transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1 group-hover:opacity-100 max-lg:opacity-60" />
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-sm text-muted">Bir başlığa tıklayarak o konu hakkında daha ayrıntılı bilgiye ulaşabilirsiniz.</p>
      </section>

      <ContactBand />
    </>
  );
}
