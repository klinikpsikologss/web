"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";
import { Mark } from "./Icons";

const ease = "[transition-timing-function:var(--ease-soft)]";

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "left" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} />
  </svg>
);

function Placeholder() {
  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-navy-soft via-navy to-navy-deep" role="img" aria-label="Görsel yakında eklenecek">
      <Mark className="h-1/3 w-auto text-gold opacity-40" />
    </div>
  );
}

/**
 * Ofis galerisi: bölüm genişliğinde, 16:9 görsellerden oluşan yana kaydırmalı şerit.
 * İlk `limit` görselden sonra son slayt olarak "Tümünü gör" kartı gelir.
 * Masaüstünde oklar, mobilde parmakla kaydırma. Görsele tıklayınca tam ekran görüntüleyici açılır.
 * Görsel yoksa (images boş) yer tutucular gösterilir.
 */
export function Gallery({ images, label, limit = 4, seeAllHref }: { images: GalleryImage[]; label: string; limit?: number; seeAllHref: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [pos, setPos] = useState({ start: true, end: false, progress: 0 });
  const count = Math.min(images.length || 4, limit);

  const slide = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el || el.children.length < 2) return;
    const step = (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setPos({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4, progress: max > 0 ? Math.min(1, el.scrollLeft / max) : 0 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const arrow =
    "absolute top-[calc(50%-1.5rem)] z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/95 text-navy shadow-[0_14px_30px_-12px_rgba(15,39,71,0.5)] transition-[transform,scale,opacity] duration-700 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0 md:grid";
  const item = "w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[min(38vw,44rem)]";
  const tile = "group relative aspect-[16/9] overflow-hidden rounded-[0.875rem] shadow-[0_30px_60px_-36px_rgba(15,39,71,0.45)]";

  return (
    <div className="relative" role="region" aria-roledescription="galeri" aria-label={label}>
      <button type="button" aria-label="Önceki görsel" disabled={pos.start} onClick={() => slide(-1)} className={`${arrow} left-6 ${ease}`}>
        <Chevron dir="left" />
      </button>
      <button type="button" aria-label="Sonraki görsel" disabled={pos.end} onClick={() => slide(1)} className={`${arrow} right-6 ${ease}`}>
        <Chevron dir="right" />
      </button>

      <ul
        ref={track}
        className="relative -mb-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad)] pb-12 pt-2 [--pad:1.5rem] [scroll-padding-inline:var(--pad)] [scrollbar-width:none] sm:gap-5 sm:[--pad:max(2rem,calc((100%-72rem)/2))] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: count }).map((_, i) => {
          const img = images[i];
          return (
            <li key={i} aria-label={`${i + 1} / ${count + 1}`} className={item}>
              <div className={tile} data-edit-img={img ? `gal:${i}` : undefined}>
                {img ? (
                  <button type="button" onClick={() => setOpen(i)} aria-label={`${img.alt}, büyüt`} className="absolute inset-0 block h-full w-full cursor-zoom-in">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 44rem, (min-width: 640px) 46vw, 78vw"
                      quality={90}
                      placeholder={img.blur ? "blur" : undefined}
                      blurDataURL={img.blur}
                      className="zoom-img object-cover"
                    />
                  </button>
                ) : (
                  <Placeholder />
                )}
              </div>
            </li>
          );
        })}

        {/* Son slayt: tüm görsellere git */}
        <li aria-label={`${count + 1} / ${count + 1}`} className={item}>
          <Link href={seeAllHref} className="group relative flex aspect-[16/9] flex-col justify-end overflow-hidden rounded-[0.875rem] bg-navy-deep text-ivory shadow-[0_30px_60px_-36px_rgba(15,39,71,0.6)]">
            {(() => {
              const bg = images[count] ?? images[0];
              return bg ? (
                <Image
                  src={bg.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 44rem, (min-width: 640px) 46vw, 78vw"
                  placeholder={bg.blur ? "blur" : undefined}
                  blurDataURL={bg.blur}
                  className="object-cover blur-[3px] transition-transform duration-[1600ms] [transition-timing-function:var(--ease-soft)] group-hover:scale-[1.06]"
                  aria-hidden="true"
                />
              ) : null;
            })()}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(9_27_52/0.96)_0%,rgb(15_39_71/0.78)_45%,rgb(15_39_71/0.5)_100%)]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-2.5 rounded-[0.5rem] ring-1 ring-gold/35 sm:inset-4" aria-hidden="true" />
            <div className="relative p-5 sm:p-10">
              <span className="hidden text-sm tracking-wide text-gold sm:block">{images.length > 0 ? `${images.length} görsel` : "Klinik"}</span>
              <span className="block max-w-md font-display text-[1.3rem] leading-tight sm:mt-2 sm:text-3xl lg:text-[2.6rem]">Kliniğin tamamını keşfedin</span>
              <span className="btn btn-light mt-3.5 inline-flex sm:mt-6 lg:mt-8">
                Tümünü gör
                <span className="btn-dot">
                  <Chevron dir="right" />
                </span>
              </span>
            </div>
          </Link>
        </li>
      </ul>

      <div className="mx-auto h-0.5 w-40 rounded-full bg-navy/10" aria-hidden="true">
        <div className="h-full w-[30%] rounded-full bg-navy/60" style={{ transform: `translateX(${pos.progress * 233}%)` }} />
      </div>

      {open !== null && images.length > 0 && <Lightbox images={images} start={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

/** Tam ekran görüntüleyici: ok tuşları, Esc, mobilde yana kaydırma. */
function Lightbox({ images, start, onClose }: { images: GalleryImage[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const [sharp, setSharp] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = images.length;

  const prev = useCallback(() => setI((v) => (v - 1 + n) % n), [n]);
  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [onClose, prev, next]);

  const btn =
    "grid h-12 w-12 place-items-center rounded-full bg-ivory/10 text-ivory ring-1 ring-ivory/25 backdrop-blur-md transition-colors duration-500 hover:bg-ivory/20";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Görsel görüntüleyici"
      className="lightbox fixed inset-0 z-[60] flex flex-col bg-navy-deep/95"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
      }}
    >
      <div className="flex items-center justify-between px-5 pb-2 pt-5 text-sm text-ivory/70 sm:px-8" onClick={(e) => e.stopPropagation()}>
        <span aria-live="polite">
          {i + 1} / {n}
        </span>
        <button ref={closeBtn} type="button" onClick={onClose} aria-label="Kapat" className={btn}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-4 pb-6 sm:px-20">
        <div key={i} className="lightbox-img relative h-full w-full" onClick={(e) => e.stopPropagation()}>
          {/* Büyük sürüm yüklenince yumuşakça belirir. Bulanık yer tutucu kullanılmaz: object-contain ile kenarlarda taşıp zıplama yaratıyordu. */}
          <Image
            src={images[i].src}
            alt={images[i].alt}
            fill
            sizes="(min-width: 1536px) 1600px, 100vw"
            quality={90}
            className={`object-contain transition-opacity duration-700 ${ease} ${sharp === i ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setSharp(i)}
            priority
          />
        </div>
        {/* Komşu görseller önceden yüklenir; gezinirken anında görünür */}
        {n > 1 && (
          <div aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0">
            {[(i + 1) % n, (i - 1 + n) % n].map((j) => (
              <Image key={j} src={images[j].src} alt="" width={64} height={64} sizes="(min-width: 1536px) 1600px, 100vw" quality={90} loading="eager" />
            ))}
          </div>
        )}
        {n > 1 && (
          <>
            <button type="button" aria-label="Önceki görsel" onClick={(e) => (e.stopPropagation(), prev())} className={`${btn} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}>
              <Chevron dir="left" />
            </button>
            <button type="button" aria-label="Sonraki görsel" onClick={(e) => (e.stopPropagation(), next())} className={`${btn} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}>
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** Ofis görselleri sayfası: tüm görseller duyarlı ızgarada, tıklayınca tam ekran görüntüleyici. */
export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src} data-edit-img={`gal:${i}`} className="group relative aspect-[4/3] overflow-hidden rounded-[0.875rem] shadow-[0_30px_60px_-36px_rgba(15,39,71,0.45)]">
            <button type="button" onClick={() => setOpen(i)} aria-label={`${img.alt}, büyüt`} className="absolute inset-0 block h-full w-full cursor-zoom-in">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                quality={90}
                placeholder={img.blur ? "blur" : undefined}
                blurDataURL={img.blur}
                className="zoom-img object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox images={images} start={open} onClose={() => setOpen(null)} />}
    </>
  );
}
