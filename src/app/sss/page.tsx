import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd, withOg } from "@/lib/seo";
import { ContactBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { FaqList } from "@/components/FaqList";
import { faqJsonLd } from "@/lib/faq";
import { getContent } from "@/lib/cms/content";

export const metadata: Metadata = withOg({
  title: { absolute: "Sık Sorulan Sorular | Bolu Psikolog Selin Sak" },
  description:
    "Psikoterapi süreci, ilk seans, online terapi, gizlilik ve randevu hakkında sık sorulan soruların cevapları. Klinik Psikolog Selin Sak, Bolu.",
  alternates: { canonical: "/sss" },
});

export default async function Faqs() {
  const { faqs } = await getContent();
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Sık Sorulan Sorular", path: "/sss" }]), webPageLd({ type: "WebPage", name: "Sık Sorulan Sorular", path: "/sss" })]} />
      <PageHero editKey="sss" eyebrow="Merak edilenler" title="Sık sorulan sorular" lead="Terapi sürecine dair en çok sorulan soruların cevapları." />
      <section className="relative isolate overflow-hidden px-6 section-pb sm:px-8">
        <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-gold/40 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-96 w-96 rounded-full bg-navy/[0.1] blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <FaqList items={faqs} />
          </Reveal>
        </div>
        <JsonLd data={faqJsonLd(faqs)} />
      </section>
      <ContactBand title="Aklınızdaki başka bir soru mu var? Benimle iletişime geçebilirsiniz." />
    </>
  );
}
