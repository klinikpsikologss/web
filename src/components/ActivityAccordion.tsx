"use client";

import { useState } from "react";
import type { ActivityGroup } from "@/lib/about";

const ease = "[transition-timing-function:var(--ease-soft)]";
const PREVIEW = 5;

/** Açılır başlıklar: her grupta ilk 5 kayıt görünür, fazlası "Tüm etkinlikleri gör" ile açılır. */
export function ActivityAccordion({ groups }: { groups: ActivityGroup[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });
  const [all, setAll] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-3 sm:space-y-4">
      {groups.map((g, gi) => {
        const isOpen = !!open[gi];
        const expanded = !!all[gi];
        const shown = expanded ? g.items : g.items.slice(0, PREVIEW);
        const more = g.items.length > PREVIEW;
        return (
          <section key={g.title} className="[overflow-anchor:none] overflow-hidden rounded-[0.875rem] bg-sand/70 ring-1 ring-navy/[0.06]">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`act-${gi}`}
                onClick={() => setOpen((o) => ({ ...o, [gi]: !isOpen }))}
                className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-7 sm:py-5"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.3rem] leading-snug text-navy sm:text-[1.55rem]">{g.title}</span>
                  <span className="mt-0.5 block font-sans text-[0.9rem] font-normal leading-snug text-muted">{g.lead}</span>
                </span>
                <span className="relative h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  <span className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-700 ${ease} ${isOpen ? "scale-y-0" : ""}`} />
                </span>
              </button>
            </h3>
            <div id={`act-${gi}`} className={`grid transition-[grid-template-rows] duration-[800ms] ${ease} ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden" inert={!isOpen}>
                <ul className="mx-3 mb-3 divide-y divide-navy/10 rounded-[0.6rem] bg-paper px-4 sm:mx-5 sm:mb-5 sm:px-6">
                  {shown.map((it, i) => (
                    <li key={`${it.title}-${it.date}-${i}`} className="py-4">
                      <p className="font-display text-[1.1rem] leading-snug text-navy sm:text-[1.2rem]">{it.title}</p>
                      <p className="mt-1 text-[0.92rem] leading-snug text-muted">{it.place}</p>
                      <p className="mt-1 text-[0.92rem] text-gold-deep">{it.date}</p>
                    </li>
                  ))}
                  {more && (
                    <li className="py-3 text-center">
                      <button type="button" onClick={() => setAll((a) => ({ ...a, [gi]: !expanded }))} className="inline-flex items-center gap-2 text-sm text-gold-deep">
                        {expanded ? "Daha az göster" : `Tüm etkinlikleri gör (${g.items.length})`}
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
