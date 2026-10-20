"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/faq";

const soft = "[transition-timing-function:var(--ease-soft)] motion-reduce:transition-none";

/** Açılır kapanır soru listesi. Her soru kendi başına açılır; yumuşak yükseklik geçişi kullanır. */
export function FaqList({ items }: { items: Faq[] }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="space-y-3.5">
      {items.map((f, i) => {
        const on = open === i;
        const id = `${base}-${i}`;
        return (
          <li key={f.q} data-open={on} className="glass-row">
            <h3 className="!font-sans text-base font-normal">
              <button
                type="button"
                id={`${id}-b`}
                aria-expanded={on}
                aria-controls={`${id}-p`}
                onClick={() => setOpen(on ? null : i)}
                className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-sans text-[1rem] font-medium leading-snug text-navy sm:px-7"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-[transform,rotate,background-color,color] duration-700 ${soft} ${
                    on ? "rotate-45 bg-navy text-gold" : "bg-navy/[0.06] text-gold-deep"
                  }`}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`${id}-p`}
              role="region"
              aria-labelledby={`${id}-b`}
              className={`grid transition-[grid-template-rows,opacity] duration-700 ${soft} ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 pr-14 font-sans text-[0.97rem] leading-relaxed text-muted sm:px-7 sm:pr-16">{f.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
