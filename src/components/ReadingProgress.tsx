"use client";

import { useEffect, useRef } from "react";

/** Sayfanın en üstünde, makalenin ne kadarının okunduğunu gösteren ince çizgi. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = Math.max(r.height - window.innerHeight * 0.4, 1);
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.3 - r.top) / total));
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-gold-deep will-change-transform" />
    </div>
  );
}
