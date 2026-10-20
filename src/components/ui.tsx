import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./Icons";
import { Reveal } from "./Reveal";
import { Edit } from "./cms/Edit";
import { getContent, siteOf } from "@/lib/cms/content";

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  external?: boolean;
}) {
  const cls = `btn btn-${variant}`;
  const inner = (
    <>
      {children}
      <span className="btn-dot">
        <Arrow />
      </span>
    </>
  );
  return external || href.startsWith("tel:") || href.startsWith("mailto:") ? (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Metni, `editKey` verilmişse düzenlenebilir (satır içi), verilmemişse düz olarak çizer. */
function Txt({ editKey, suffix, as, className, style, children }: { editKey?: string; suffix: string; as: string; className?: string; style?: React.CSSProperties; children: string }) {
  if (editKey) {
    return (
      <Edit id={`${editKey}.${suffix}`} as={as} className={className} style={style}>
        {children}
      </Edit>
    );
  }
  const Tag = as as "p";
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
}

/** İnce, küçük etiket (üstte) + başlık + isteğe bağlı açıklama */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  editKey,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  editKey?: string;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <Txt editKey={editKey} suffix="eyebrow" as="p" className={`mb-5 inline-flex items-center gap-3 text-sm tracking-wide text-gold-deep ${align === "center" ? "justify-center" : ""}`}>
          {eyebrow}
        </Txt>
      )}
      <Txt editKey={editKey} suffix="title" as="h2" className="text-4xl leading-[1.1] sm:text-5xl">
        {title}
      </Txt>
      {lead && (
        <Txt editKey={editKey} suffix="lead" as="p" className="mt-6 text-lg text-muted">
          {lead}
        </Txt>
      )}
    </Reveal>
  );
}

/** İç sayfaların üst bölümü */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  editKey,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  editKey?: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-48 lg:pb-20">
      <div className="pointer-events-none absolute -right-36 -top-48 h-[26rem] w-[26rem] rounded-full bg-gold/25 max-sm:hidden blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        {eyebrow && (
          <Txt editKey={editKey} suffix="eyebrow" as="p" className="hero-in mb-6 inline-flex items-center gap-3 text-sm tracking-wide text-gold-deep">
            {eyebrow}
          </Txt>
        )}
        <Txt editKey={editKey} suffix="title" as="h1" className="hero-in max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl" style={{ "--d": "100ms" } as React.CSSProperties}>
          {title}
        </Txt>
        {lead && (
          <Txt editKey={editKey} suffix="lead" as="p" className="hero-in mt-8 max-w-2xl text-lg text-muted sm:text-xl" style={{ "--d": "220ms" } as React.CSSProperties}>
            {lead}
          </Txt>
        )}
        {children && (
          <div className="hero-in mt-10" style={{ "--d": "340ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/** Sayfa altı randevu çağrısı */
export async function ContactBand({
  title = "Terapi süreci hakkında bilgi almak veya randevu oluşturmak için benimle iletişime geçebilirsiniz.",
  cta = "İletişime geç",
  editKey = "contact.band",
}: {
  title?: string;
  cta?: string;
  editKey?: string;
}) {
  const { appointmentUrl } = siteOf(await getContent());
  return (
    <section className="px-4 section-y sm:px-6">
      <Reveal className="mx-auto max-w-6xl">
        <div className="bezel">
          <div className="bezel-core relative isolate overflow-hidden !bg-navy px-6 py-14 text-center sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 max-sm:hidden blur-3xl" aria-hidden="true" />
            <Txt editKey={editKey} suffix="title" as="h2" className="mx-auto max-w-3xl text-[1.7rem] leading-snug !text-ivory sm:text-[2.4rem] sm:leading-[1.25]">
              {title}
            </Txt>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Button href={appointmentUrl} external variant="light">
                Randevu Al
              </Button>
              <Link
                href="/iletisim"
                className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium text-ivory ring-1 ring-ivory/30 transition-[background-color,box-shadow] duration-500 hover:bg-ivory/10 hover:ring-ivory/60"
              >
                {cta}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
