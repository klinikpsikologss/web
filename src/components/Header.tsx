"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

const ease = "[transition-timing-function:var(--ease-soft)]";

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Yüzen cam hap menü; mobilde tam ekran, sıralı açılan menü. */
export function Header({ logo, appointmentUrl }: { logo: React.ReactNode; appointmentUrl: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 sm:pt-5">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full py-2.5 pl-6 pr-3 transition-[background-color,box-shadow] duration-700 ${ease} sm:pr-4 bg-ivory/80 shadow-[0_18px_50px_-24px_rgba(15,39,71,0.35),inset_0_0_0_1px_rgba(15,39,71,0.06)] backdrop-blur-xl`}
        >
          <Link href="/" aria-label="Ana sayfa" className="shrink-0">
            {logo}
          </Link>

          <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => {
              const active = !n.href.includes("#") && pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative whitespace-nowrap rounded-full px-2 py-2 text-[0.86rem] font-medium xl:px-4 xl:text-[0.95rem] transition-colors duration-500 ${
                    active ? "text-gold-deep" : "text-navy-deep/90 hover:text-navy-deep"
                  }`}
                >
                  {n.label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-2 bottom-0.5 h-[2px] bg-gradient-to-r from-transparent via-gold-deep to-transparent transition-[clip-path,opacity] duration-700 [transition-timing-function:var(--ease-soft)] xl:inset-x-4 ${
                      active
                        ? "opacity-90 [clip-path:inset(0_0_0_0)]"
                        : "opacity-0 [clip-path:inset(0_50%_0_50%)] group-hover:opacity-60 group-hover:[clip-path:inset(0_25%_0_25%)]"
                    }`}
                  />
                </Link>
              );
            })}
            <a href={appointmentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary ml-3 !py-1.5 !pl-5 !pr-1.5">
              Randevu Al
              <span className="btn-dot !h-8 !w-8">
                <ArrowIcon />
              </span>
            </a>
          </nav>

          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-navy/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-px w-5 bg-navy transition-transform duration-700 ${ease} ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-5 bg-navy transition-transform duration-700 ${ease} ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-30 flex flex-col justify-center bg-ivory/95 px-8 backdrop-blur-2xl transition-[opacity,visibility] duration-700 ${ease} lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobil menü" className="mx-auto w-full max-w-md">
          <ul>
            {nav.map((n, i) => (
              <li
                key={n.href}
                className={`transition-[opacity,transform,translate] duration-1000 ${ease} ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
              >
                <Link href={n.href} tabIndex={open ? 0 : -1} className="block border-b border-navy/10 py-4 font-display text-3xl text-navy">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={`mt-10 transition-[opacity,transform,translate] duration-1000 ${ease} ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ transitionDelay: open ? "560ms" : "0ms" }}
          >
            <a href={appointmentUrl} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn btn-primary">
              Randevu Al
              <span className="btn-dot">
                <ArrowIcon size={18} />
              </span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
