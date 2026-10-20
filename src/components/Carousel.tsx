"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const ease = "[transition-timing-function:var(--ease-soft)]";

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "left" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} />
  </svg>
);

/**
 * Yatay kaydırmalı şerit: oklar (masaüstü), altta nokta göstergesi, mobilde parmakla kaydırma.
 * Öğeler `itemClass` genişliğinde <li> olarak çizilir.
 */
export function Carousel({ label, items, itemClass }: { label: string; items: ReactNode[]; itemClass: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ index: 0, start: true, end: items.length < 2 });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const x = el.scrollLeft;
    let index = 0;
    let best = Infinity;
    kids.forEach((k, i) => {
      const d = Math.abs(k.offsetLeft - el.offsetLeft - x);
      if (d < best) {
        best = d;
        index = i;
      }
    });
    const max = el.scrollWidth - el.clientWidth;
    setState({ index, start: x <= 4, end: x >= max - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el || el.children.length < 2) return;
    const step = (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  const goTo = (i: number) => {
    const el = track.current;
    const k = el?.children[i] as HTMLElement | undefined;
    if (el && k) el.scrollTo({ left: k.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  const arrow = `absolute top-[calc(50%-1rem)] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/95 text-navy shadow-[0_14px_30px_-12px_rgba(15,39,71,0.5)] ring-1 ring-navy/10 transition-[transform,opacity] duration-700 ${ease} hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0 md:grid`;

  return (
    <div className="relative" role="region" aria-roledescription="galeri" aria-label={label}>
      <button type="button" aria-label="Önceki" disabled={state.start} onClick={() => go(-1)} className={`${arrow} left-3`}>
        <Chevron dir="left" />
      </button>
      <button type="button" aria-label="Sonraki" disabled={state.end} onClick={() => go(1)} className={`${arrow} right-3`}>
        <Chevron dir="right" />
      </button>
      <ul ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden">
        {items.map((it, i) => (
          <li key={i} className={`${itemClass} shrink-0 snap-start`}>
            {it}
          </li>
        ))}
      </ul>
      {items.length > 1 && (
        <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Sayfa göstergesi">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === state.index}
              aria-label={`${i + 1}. öğeye git`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-[width,background-color] duration-500 ${ease} ${i === state.index ? "w-5 bg-navy" : "w-2 bg-navy/25 hover:bg-navy/45"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
