"use client";

import { useState } from "react";

/** Bağlantıyı panoya kopyalar (mümkünse cihazın paylaşım menüsünü açar). */
export function ShareButton({ title }: { title: string }) {
  const [done, setDone] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setDone(true);
      setTimeout(() => setDone(false), 2200);
    } catch {
      /* kullanıcı paylaşımı iptal etti */
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-navy shadow-[inset_0_0_0_1px_rgba(15,39,71,0.18)] transition-colors duration-500 hover:bg-navy/[0.04]"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1" />
      </svg>
      <span aria-live="polite">{done ? "Bağlantı kopyalandı" : "Bağlantıyı paylaş"}</span>
    </button>
  );
}
