import fs from "node:fs";
import path from "node:path";

import { getBlur } from "./blur";

export type GalleryImage = { src: string; alt: string; blur?: string };

/**
 * Klinik görselleri.
 * - Panelden galeri düzenlenmişse (`urls` dolu) o liste kullanılır.
 * - Aksi halde public/ klasöründeki klinik-1.jpg, klinik-2.jpg ... (eski adıyla ofis-1.jpg ...) dosyaları numara sırasıyla bulunur.
 */
export async function getClinicPhotos(urls?: string[] | null): Promise<GalleryImage[]> {
  if (urls && urls.length > 0) {
    return Promise.all(urls.map(async (u, i) => ({ src: u, alt: `Klinikten görünüm ${i + 1}`, blur: await getBlur(u) })));
  }
  const dir = path.join(process.cwd(), "public");
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => /^(klinik|ofis)-\d+\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)![0], 10) - parseInt(b.match(/\d+/)![0], 10));
  return Promise.all(files.map(async (f, i) => ({ src: `/${f}`, alt: `Klinikten görünüm ${i + 1}`, blur: await getBlur(`/${f}`) })));
}
