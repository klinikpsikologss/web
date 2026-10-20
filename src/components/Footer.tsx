import Link from "next/link";
import { nav } from "@/lib/site";
import { getContent, siteOf } from "@/lib/cms/content";
import { Edit } from "./cms/Edit";
import { Instagram, Linkedin } from "./Icons";
import { Logo } from "./Logo";

const social = "grid h-11 w-11 place-items-center rounded-full ring-1 ring-ivory/20 transition-colors duration-500 hover:bg-ivory/10";

export async function Footer() {
  const site = siteOf(await getContent());
  return (
    <footer className="bg-navy text-ivory/80">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-20">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo variant="light" className="!h-14 sm:!h-16" />
            <Edit id="footer.tagline" as="p" className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ivory/65">
              Bilişsel ve Davranışçı Terapiler yaklaşımıyla Bolu’da yüz yüze ve online psikoterapi.
            </Edit>
            <div className="mt-6 flex gap-3">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={social}>
                <Instagram />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={social}>
                <Linkedin />
              </a>
            </div>
          </div>

          <nav aria-label="Alt menü">
            <p className="text-sm text-gold">Sayfalar</p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors duration-500 hover:text-gold">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm text-gold">İletişim</p>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li>
                <a href={site.phoneHref} className="transition-colors duration-500 hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all transition-colors duration-500 hover:text-gold">
                  {site.email}
                </a>
              </li>
              <li className="text-ivory/65">
                {site.address.street}, {site.address.district}/{site.address.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-sm text-ivory/50 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/gizlilik-politikasi" className="hover:text-gold">
                Gizlilik Politikası
              </Link>
            </li>
            <li>
              <Link href="/kvkk" className="hover:text-gold">
                KVKK Aydınlatma Metni
              </Link>
            </li>
            <li>
              <Link href="/cerez-politikasi" className="hover:text-gold">
                Çerez Politikası
              </Link>
            </li>
          </ul>
          <p>© {new Date().getFullYear()} Selin Sak. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
