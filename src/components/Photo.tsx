import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Mark } from "./Icons";
import { getBlur } from "@/lib/blur";
import { getContent } from "@/lib/cms/content";
import { uploadsDir } from "@/lib/cms/store";

/**
 * Dosya var mı? `/uploads/...` panelden yüklenen görseller (data/uploads), diğerleri public/ altındadır.
 * Yoksa yer tutucu gösterilir; dosya eklenince site kendiliğinden kullanır.
 */
export const hasAsset = (src: string) =>
  src.startsWith("https://")
    ? true
    : src.startsWith("/uploads/")
    ? fs.existsSync(path.join(uploadsDir, src.slice("/uploads/".length)))
    : fs.existsSync(path.join(process.cwd(), "public", src));

export async function Photo({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
  position = "center",
  editId,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  position?: string;
  /** Panelde değiştirilebilir görsel kimliği (ör. "hero.desktop") */
  editId?: string;
}) {
  let finalSrc = src;
  if (editId) {
    const c = await getContent();
    finalSrc = c.images[editId] || src;
  }
  const edit = editId ? { "data-edit-img": editId, "data-edit-default": src } : {};

  if (hasAsset(finalSrc)) {
    const blur = await getBlur(finalSrc);
    return (
      <div {...edit} className={`overflow-hidden ${className.includes("absolute") ? "" : "relative"} ${className}`}>
        <Image
          src={finalSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={blur ? "blur" : undefined}
          blurDataURL={blur}
          className={`object-cover zoom-img ${imgClassName}`}
          style={{ objectPosition: position }}
        />
      </div>
    );
  }
  return (
    <div
      {...edit}
      role="img"
      aria-label={alt}
      className={`overflow-hidden ${className.includes("absolute") ? "" : "relative"} bg-gradient-to-br from-navy-soft via-navy to-navy-deep ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.16]" style={{ background: "radial-gradient(60% 50% at 70% 20%, #d9c6a1, transparent)" }} />
      <Mark className="absolute left-1/2 top-1/2 h-1/3 w-auto -translate-x-1/2 -translate-y-1/2 text-gold opacity-40" />
    </div>
  );
}
