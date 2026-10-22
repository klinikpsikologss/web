import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd, withOg } from "@/lib/seo";
import { ContactBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { titleCase } from "@/lib/titlecase";
import { getContent } from "@/lib/cms/content";
import { getCertificates } from "@/lib/certificates";
import { getBlur } from "@/lib/blur";

export const metadata: Metadata = withOg({
  title: { absolute: "Eğitimler ve Sertifikalar | Klinik Psikolog Selin Sak" },
  description:
    "Klinik Psikolog Selin Sak’ın eğitimleri ve sertifikaları: BDT, Gottman çift terapisi, mindfulness, psikoonkoloji ve klinik deneyimi.",
  alternates: { canonical: "/egitimler-ve-sertifikalar" },
});

export default async function Education() {
  const ct = await getContent();
  const groups = ct.education;
  const fromPanel = await Promise.all(
    groups.flatMap((g) => g.items.filter((i) => i.image)).map(async (i) => ({ src: i.image!, caption: i.title, blur: await getBlur(i.image!) })),
  );
  const base = await getCertificates(ct.certs);
  const certs = [...base, ...fromPanel];
  const editable = ct.__draft;

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Eğitimler ve Sertifikalar", path: "/egitimler-ve-sertifikalar" }]), webPageLd({ type: "WebPage", name: "Eğitimler ve Sertifikalar", path: "/egitimler-ve-sertifikalar" })]} />
      <PageHero
        editKey="egitim"
        eyebrow="Akademik Birikim"
        title="Eğitimler ve sertifikalar"
        lead="Akademik birikimi ve klinik uygulamaları destekleyen eğitim, süpervizyon ve mesleki gelişim süreçleri."
      />

      <section className="relative isolate overflow-hidden px-6 sm:px-8 section-pb">
        <div className="pointer-events-none absolute -left-24 top-[10%] -z-10 h-80 w-80 rounded-full bg-gold/40 max-sm:hidden blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 top-[55%] -z-10 h-96 w-96 rounded-full bg-navy/[0.08] max-sm:hidden blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-6xl space-y-16 sm:space-y-24">
          {groups.map((g) => (
            <div key={g.title}>
              <Reveal>
                <h2 className="text-3xl sm:text-4xl">{titleCase(g.title)}</h2>
              </Reveal>
              <ul className="mt-6 border-t border-navy/10 sm:mt-8">
                {g.items.map((item) => (
                  <Reveal as="li" key={item.title + (item.detail ?? "")} className="border-b border-navy/10">
                    <div className="grid gap-3 py-7 sm:py-9 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
                      <div>
                        <h3 className="font-display text-[1.45rem] leading-snug text-navy sm:text-[1.7rem]">{item.title}</h3>
                        {item.detail && <p className="mt-1.5 font-display text-[1.05rem] leading-snug text-gold-deep sm:text-lg">{item.detail}</p>}
                      </div>
                      {item.text && <p className="text-[0.98rem] leading-[1.8] text-muted sm:text-base">{item.text}</p>}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {(certs.length > 0 || editable) && (
        <section className="bg-sand/60 py-12 sm:py-16" aria-label="Sertifikalar">
          {editable && (
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
              <div data-edit-add="cert" data-edit-label="Sertifika görseli ekle" />
            </div>
          )}
          {certs.length > 0 && (
            <Reveal>
              <Gallery
                images={certs.map((c, i) => ({ src: c.src, alt: c.caption ?? `Sertifika ${i + 1}`, blur: c.blur }))}
                label="Sertifikalar"
                limit={certs.length}
                editPrefix="cert"
                editLimit={base.length}
                aspect="aspect-[3/2]"
              />
            </Reveal>
          )}
        </section>
      )}

      <ContactBand />
    </>
  );
}
