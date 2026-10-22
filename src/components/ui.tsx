import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";
import { titleCase } from "@/lib/titlecase";
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
  const inner = children;
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
        <Txt editKey={editKey} suffix="eyebrow" as="p" className={`eyebrow mb-5 ${align === "center" ? "is-center" : ""}`}>
          {eyebrow}
        </Txt>
      )}
      <Txt editKey={editKey} suffix="title" as="h2" className="text-4xl leading-[1.1] sm:text-5xl">
        {titleCase(title)}
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
  image,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  editKey?: string;
  /** Giriş alanına arka plan olarak konan fotoğraf (sağda, sola doğru kremle erir) */
  image?: { src: string; position?: string };
}) {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-48 lg:pb-20">
      {image ? (
        <>
          <Photo src={image.src} alt="" sizes="100vw" priority position={image.position ?? "center"} className="absolute inset-0 -z-10 lg:left-[28%]" />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-ivory)_0%,rgb(248_245_238/0.9)_38%,rgb(248_245_238/0.45)_62%,rgb(248_245_238/0.1)_100%)] max-lg:bg-ivory/80 lg:bg-[linear-gradient(to_right,var(--color-ivory)_28%,rgb(248_245_238/0.55)_52%,transparent_82%)]"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-ivory to-transparent" aria-hidden="true" />
        </>
      ) : (
        <div className="pointer-events-none absolute -right-36 -top-48 h-[26rem] w-[26rem] rounded-full bg-gold/25 max-sm:hidden blur-3xl" aria-hidden="true" />
      )}
      <div className="relative mx-auto max-w-6xl">
        {eyebrow && (
          <Txt editKey={editKey} suffix="eyebrow" as="p" className="hero-in eyebrow mb-6">
            {eyebrow}
          </Txt>
        )}
        <Txt editKey={editKey} suffix="title" as="h1" className="hero-in max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl" style={{ "--d": "100ms" } as React.CSSProperties}>
          {titleCase(title)}
        </Txt>
        {!eyebrow && <span className="hero-in mt-6 block h-px w-12 bg-gold-deep" style={{ "--d": "160ms" } as React.CSSProperties} aria-hidden="true" />}
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
  title = "Terapi süreci hakkında bilgi almak veya randevu oluşturmak için iletişime geçebilirsiniz.",
  cta = "İletişime Geç",
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
