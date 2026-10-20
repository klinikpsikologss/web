"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string };

/** "Bu yazıda": ara başlıklara bağlantılar; okunan bölüm vurgulanır. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-18% 0px -72% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="Yazı içeriği">
      <p className="text-sm tracking-wide text-gold-deep">Bu yazıda</p>
      <ol className="mt-4 space-y-1 border-l border-navy/10">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "true" : undefined}
                className={`-ml-px block border-l py-1.5 pl-4 text-[0.92rem] leading-snug transition-[color,border-color] duration-500 ${
                  on ? "border-gold-deep text-navy" : "border-transparent text-muted hover:text-navy"
                }`}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
