import Link from "next/link";
import { Button } from "@/components/ui";
import { Arrow } from "@/components/Icons";

const links = [
  { href: "/hizmetler", label: "Hizmetler", note: "Bireysel, çift ve online terapi" },
  { href: "/calisma-alanlari", label: "Çalışma alanları", note: "Anksiyete, depresyon, travma ve daha fazlası" },
  { href: "/blog", label: "Blog", note: "Psikoloji üzerine yazılar" },
  { href: "/hakkimda", label: "Hakkımda", note: "Klinik Psikolog Selin Sak" },
];

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44">
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-gold/35 max-sm:hidden blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-navy/[0.08] max-sm:hidden blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-5xl text-center">
        <p aria-hidden="true" className="hero-in select-none font-display text-[7.5rem] font-medium leading-none text-gold/60 sm:text-[12rem]">
          404
        </p>
        <h1 className="hero-in -mt-4 text-4xl leading-tight sm:-mt-8 sm:text-6xl" style={{ "--d": "120ms" } as React.CSSProperties}>
          Aradığınız sayfa bulunamadı
        </h1>
        <p className="hero-in mx-auto mt-6 max-w-xl text-lg text-muted" style={{ "--d": "220ms" } as React.CSSProperties}>
          Bağlantı değişmiş ya da sayfa kaldırılmış olabilir. Aşağıdan aradığınıza ulaşabilirsiniz.
        </p>
        <div className="hero-in mt-9 flex flex-wrap justify-center gap-3 sm:gap-4" style={{ "--d": "320ms" } as React.CSSProperties}>
          <Button href="/">Ana sayfaya dön</Button>
          <Button href="/iletisim" variant="ghost">
            İletişime geç
          </Button>
        </div>

        <ul className="hero-in mx-auto mt-14 grid max-w-3xl gap-3 text-left sm:grid-cols-2" style={{ "--d": "440ms" } as React.CSSProperties}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="glass-row group flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <span>
                  <span className="block font-display text-xl text-navy">{l.label}</span>
                  <span className="mt-0.5 block text-sm text-muted">{l.note}</span>
                </span>
                <Arrow className="shrink-0 text-gold-deep transition-transform duration-700 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
