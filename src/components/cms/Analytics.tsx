"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function send(body: Record<string, string>) {
  const data = JSON.stringify(body);
  if (navigator.sendBeacon) navigator.sendBeacon("/api/t", new Blob([data], { type: "application/json" }));
  else fetch("/api/t", { method: "POST", body: data, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
}

/** Çerezsiz sayfa görüntüleme ve tıklama sayacı. Tarayıcıdaki "İzlemeyi reddet" ayarına uyar. */
export function Analytics() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (pathname.startsWith("/panel") || navigator.doNotTrack === "1") return;
    send({ p: pathname, r: first.current ? document.referrer : "" });
    first.current = false;
  }, [pathname]);

  useEffect(() => {
    if (navigator.doNotTrack === "1") return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) send({ e: "tel_click" });
      else if (href.startsWith("mailto:")) send({ e: "mail_click" });
      else if ((href === "/iletisim" || a?.target === "_blank") && /randevu/i.test(a?.textContent ?? "")) send({ e: "cta_click" });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
