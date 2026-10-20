"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** Herkese açık sitenin üst/alt çerçevesi. Yönetim paneli (/panel) kendi düzenini kullanır. */
export function SiteChrome({ header, footer, editor, children }: { header: ReactNode; footer: ReactNode; editor: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/panel")) return <>{children}</>;
  return (
    <>
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-ivory"
      >
        İçeriğe geç
      </a>
      {editor}
      {header}
      <main id="icerik" className="flex-1">
        {children}
      </main>
      {footer}
    </>
  );
}
