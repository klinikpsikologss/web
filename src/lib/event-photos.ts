import fs from "node:fs";
import path from "node:path";
import { getBlur } from "./blur";

// Etkinlik fotoğrafları: public/etkinlikler/ klasörüne atılan jpg/png/webp dosyaları dosya adı sırasıyla (01-..., 02-...) listelenir.
export type EventPhoto = { src: string; blur?: string };

export async function getEventPhotos(urls?: string[] | null): Promise<EventPhoto[]> {
  if (urls) return Promise.all(urls.map(async (u) => ({ src: u, blur: await getBlur(u) })));
  const dir = path.join(process.cwd(), "public", "etkinlikler");
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, "tr", { numeric: true }));
  return Promise.all(files.map(async (f) => ({ src: `/etkinlikler/${f}`, blur: await getBlur(`/etkinlikler/${f}`) })));
}
