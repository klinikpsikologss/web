import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd, withOg } from "@/lib/seo";
import { Button, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, Pin } from "@/components/Icons";
import { Edit } from "@/components/cms/Edit";
import { getContent, siteOf } from "@/lib/cms/content";

export const metadata: Metadata = withOg({
  title: { absolute: "Randevu ve İletişim | Klinik Psikolog Selin Sak" },
  description: "Klinik Psikolog Selin Sak ile iletişime geçin ve randevu oluşturun. Yüz yüze ve online görüşme.",
  alternates: { canonical: "/iletisim" },
});

export default async function Contact() {
  const site = siteOf(await getContent());
  const mapQuery = encodeURIComponent(`${site.address.street}, ${site.address.district}, ${site.address.city}`);
  // Harita yalnızca mahalle, sokak ve site adıyla aranır; tam daire bilgisi konumu bulmayı zorlaştırabilir.
  const embedQuery = encodeURIComponent(`${site.address.street.split(" No:")[0]}, ${site.address.city}`);
  const items = [
    { icon: <Phone />, label: "Telefon", value: site.phone, href: site.phoneHref, action: "Hemen ara" },
    { icon: <Mail />, label: "E-posta", value: site.email, href: `mailto:${site.email}`, action: "E-posta yaz" },
    {
      icon: <Pin />,
      label: "Adres",
      value: `${site.address.street}, ${site.address.district}/${site.address.city}`,
      href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      action: "Yol tarifi al",
    },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "İletişim", path: "/iletisim" }]), webPageLd({ type: "ContactPage", name: "İletişim", path: "/iletisim" })]} />
      <PageHero
        editKey="iletisim"
        eyebrow="İletişim"
        title="İletişime geçin"
        lead="Terapi süreci hakkında bilgi almak veya randevu oluşturmak için formu doldurabilir ya da doğrudan arayabilirsiniz."
      />
      <section className="px-6 sm:px-8 section-pb">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.label}>
                  <a href={it.href} target={it.label === "Adres" ? "_blank" : undefined} rel={it.label === "Adres" ? "noopener" : undefined} className="glass-row group flex items-center gap-5 px-5 py-5 sm:gap-6 sm:px-7 sm:py-6">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-gold shadow-[0_18px_36px_-18px_rgba(15,39,71,0.6)] transition-transform duration-700 [transition-timing-function:var(--ease-soft)] group-hover:scale-105">{it.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-[0.16em] text-gold-deep">{it.label}</span>
                      <span className="mt-1 block break-words font-sans text-[1.05rem] font-medium leading-snug text-navy [font-variant-numeric:lining-nums] sm:text-[1.2rem]">{it.value}</span>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-500 group-hover:text-navy">
                        {it.action}
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-700 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-3 rounded-2xl bg-gold/20 px-5 py-4 text-sm leading-relaxed text-navy/80">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
              <Edit id="iletisim.note">Yüz yüze seanslar Bolu’daki kliniğimde, online seanslar görüntülü olarak gerçekleştirilir.</Edit>
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative isolate overflow-hidden rounded-[1.5rem] bg-navy p-7 shadow-[0_50px_90px_-40px_rgba(15,39,71,0.7)] sm:p-12">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-gold/25 max-sm:hidden blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-72 w-72 rounded-full bg-navy-soft max-sm:hidden blur-3xl" />
              <Edit id="iletisim.form.title" as="h2" className="text-3xl !text-ivory sm:text-4xl">Mesaj Bırakın</Edit>
              <Edit id="iletisim.form.lead" as="p" className="mb-8 mt-3 text-ivory/70">Sorularınızı ve randevu taleplerinizi form aracılığıyla iletebilirsiniz.</Edit>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Harita: sayfa genişliğinde */}
      <section className="section-pt">
        <div className="relative">
          <iframe
            title="Klinik Psikolog Selin Sak konumu, Google Haritalar"
            src={`https://www.google.com/maps?q=${embedQuery}&hl=tr&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[24rem] w-full border-0 [filter:grayscale(0.25)_contrast(1.03)] sm:h-[28rem] lg:h-[32rem]"
          />
          <div className="pointer-events-none px-6 py-6 sm:px-8 lg:absolute lg:inset-0 lg:flex lg:items-center lg:py-0">
            <div className="mx-auto w-full max-w-6xl">
              <div className="glass-card pointer-events-auto p-7 hover:!transform-none lg:max-w-sm [&::before]:hidden">
                <Edit id="iletisim.map.eyebrow" as="p" className="eyebrow">Klinik Konumu</Edit>
                <Edit id="iletisim.map.name" as="p" className="mt-4 font-display text-2xl leading-snug text-navy">{`Kln. Psk. ${site.shortName}`}</Edit>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {site.address.street}, {site.address.district}/{site.address.city}
                </p>
                <div className="mt-6">
                  <Button href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`} external>
                    Yol tarifi al
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
