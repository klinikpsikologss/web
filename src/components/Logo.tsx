import Image from "next/image";
import { hasAsset } from "./Photo";
import { Mark } from "./Icons";

/**
 * public/logo.svg       → açık zeminde yatay logo (Ψ + yazı)
 * public/logo-light.svg → lacivert zeminde (footer) yatay logo
 * Dosya yoksa aynı düzende yedek (Ψ + yazı) gösterilir.
 */
export function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  const src = variant === "light" ? "/logo-light.svg" : "/logo.svg";
  if (hasAsset(src)) {
    return <Image src={src} alt="Klinik Psikolog Selin Sak" width={220} height={56} priority className={`h-11 w-auto sm:h-[3.25rem] ${className}`} />;
  }
  const light = variant === "light";
  return (
    <span className={`flex items-center gap-3 ${className}`} aria-label="Klinik Psikolog Selin Sak">
      <Mark className={`h-9 w-9 ${light ? "text-gold" : "text-navy"}`} />
      <span className="leading-none">
        <span className={`block font-display text-[1.15rem] font-semibold tracking-[0.2em] ${light ? "text-ivory" : "text-navy"}`}>SELİN SAK</span>
        <span className={`mt-1 block text-[0.7rem] tracking-[0.18em] ${light ? "text-gold" : "text-gold-deep"}`}>Klinik Psikolog</span>
      </span>
    </span>
  );
}
