import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd, withOg } from "@/lib/seo";
import { ContactBand } from "@/components/ui";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { ActivityAccordion } from "@/components/ActivityAccordion";
import { Edit } from "@/components/cms/Edit";
import { bio } from "@/lib/about";
import { getContent } from "@/lib/cms/content";
import { getEventPhotos } from "@/lib/event-photos";

export const metadata: Metadata = withOg({
  title: { absolute: "Hakkımda | Klinik Psikolog Selin Sak" },
  description:
    "Klinik Psikolog Selin Sak: Başkent Üniversitesi psikoloji, Beykoz Üniversitesi klinik psikoloji yüksek lisans. BDT, Gottman çift terapisi ve psikoonkoloji eğitimleri; 1000 saatin üzerinde seans deneyimi.",
  alternates: { canonical: "/hakkimda" },
});

export default async function About() {
  const ct = await getContent();
  const { memberships, activities } = ct.about;
  const photos = await getEventPhotos(ct.events);
  const editable = ct.__draft;

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Hakkımda", path: "/hakkimda" }]), webPageLd({ type: "AboutPage", name: "Hakkımda", path: "/hakkimda" })]} />
      <section className="px-6 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-44">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Edit id="about.title" as="h1" className="hero-in text-5xl leading-[1.05] sm:text-6xl">
              Hakkımda
            </Edit>
            <span className="hero-in mt-5 block h-px w-12 bg-gold-deep" style={{ "--d": "80ms" } as React.CSSProperties} aria-hidden="true" />
            <p className="hero-in mt-8 text-sm font-medium uppercase tracking-[0.22em] text-gold-deep" style={{ "--d": "140ms" } as React.CSSProperties}>
              Klinik Psikolog
            </p>
            <p className="hero-in mt-2 font-display text-5xl leading-none text-navy sm:text-6xl" style={{ "--d": "200ms" } as React.CSSProperties}>
              Selin Sak
            </p>
            <div className="mt-10 space-y-5 text-[1.05rem] leading-[1.85] text-ink/90">
              {bio.map((p, i) => (
                <Reveal key={i} delay={i * 60}>
                  <Edit id={`about.bio.${i}`} as="p" multiline>
                    {p}
                  </Edit>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <div className="bezel !p-3">
              <Photo
                src="/selin-hakkimda.jpg"
                alt="Klinik Psikolog Selin Sak"
                sizes="(min-width: 1024px) 38vw, 90vw"
                editId="about.photo"
                className="aspect-[4/5] rounded-[0.5rem]"
                position="center 25%"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand/70 px-6 py-12 sm:px-8 sm:py-16" aria-labelledby="uyelikler">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 id="uyelikler" className="text-3xl sm:text-4xl">
              Mesleki Üyelikler
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-navy/15">
            {memberships.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 80} className="sm:px-8 sm:first:pl-0">
                <p className="font-display text-[1.3rem] leading-snug text-navy">{m.name}</p>
                <p className="mt-1 text-gold-deep">{m.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="etkinlikler">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <h2 id="etkinlikler" className="text-3xl sm:text-4xl">
              Bilimsel ve Mesleki Etkinlikler
            </h2>
            <p className="mt-3 max-w-2xl text-muted">Konuşmacı olarak yer aldığı konferanslar, seminerler, paneller ve vaka ek dersleri.</p>
          </Reveal>

          {editable && <div className="mt-6" data-edit-add="evt" data-edit-label="Etkinlik fotoğrafı ekle" />}
        </div>

        {photos.length > 0 && (
          <Reveal className="mt-8 sm:mt-10">
            <Gallery
              images={photos.map((p, i) => ({ src: p.src, alt: `Etkinlikten fotoğraf ${i + 1}`, blur: p.blur }))}
              label="Etkinlik fotoğrafları"
              limit={photos.length}
              editPrefix="evt"
              aspect="aspect-[3/4]"
              itemClass="w-[66vw] shrink-0 snap-start sm:w-[36vw] lg:w-[min(24vw,22rem)]"
              position="center 35%"
            />
          </Reveal>
        )}

        <div className="mx-auto mt-4 max-w-6xl px-6 sm:mt-6 sm:px-8">
          <ActivityAccordion groups={activities} />
        </div>
      </section>

      <ContactBand />
    </>
  );
}
