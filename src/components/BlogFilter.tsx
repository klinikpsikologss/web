"use client";

import { useEffect, useState } from "react";

/**
 * Konu filtresi. Kartlar sunucuda üretilir; her kartın [data-post-cat] özniteliği vardır.
 * Seçime göre uymayan kartlar gizlenir.
 */
export function BlogFilter({ categories }: { categories: string[] }) {
  const [active, setActive] = useState("Tümü");

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-post-cat]").forEach((el) => {
      const target = el.closest("li") ?? el;
      target.hidden = active !== "Tümü" && el.dataset.postCat !== active;
    });
  }, [active]);

  return (
    <div role="group" aria-label="Konuya göre filtrele" className="flex flex-wrap gap-2.5">
      {["Tümü", ...categories].map((c) => {
        const on = c === active;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={on}
            onClick={() => setActive(c)}
            className={`rounded-full px-5 py-2 text-sm transition-[background-color,color,box-shadow] duration-500 ${
              on ? "bg-navy text-ivory" : "text-navy shadow-[inset_0_0_0_1px_rgba(15,39,71,0.18)] hover:bg-navy/[0.05]"
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
