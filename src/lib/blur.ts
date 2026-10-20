import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { uploadsDir } from "./cms/store";

// Görsel yüklenirken gösterilen küçük bulanık önizleme (blur-up). Sunucuda üretilir, bellekte saklanır.
const cache = new Map<string, Promise<string | undefined>>();

const resolveFile = (src: string) =>
  src.startsWith("/uploads/") ? path.join(uploadsDir, src.slice("/uploads/".length)) : path.join(process.cwd(), "public", src);

export function getBlur(src: string): Promise<string | undefined> {
  let hit = cache.get(src);
  if (!hit) {
    hit = (async () => {
      try {
        if (/\.svg$/i.test(src)) return undefined;
        const buf = src.startsWith("https://")
          ? Buffer.from(await (await fetch(src.replace("/upload/", "/upload/w_48/"), { signal: AbortSignal.timeout(5000) })).arrayBuffer())
          : await fs.readFile(resolveFile(src));
        const tiny = await sharp(buf).rotate().resize(24, 24, { fit: "inside" }).jpeg({ quality: 55 }).toBuffer();
        return `data:image/jpeg;base64,${tiny.toString("base64")}`;
      } catch {
        return undefined;
      }
    })();
    cache.set(src, hit);
  }
  return hit;
}
