import fs from "node:fs";
import path from "node:path";

// Sertifika görselleri: public/sertifikalar/ klasörüne atılan jpg/png/webp dosyaları otomatik listelenir.
// Sıralama dosya adına göredir (01-..., 02-...). İsteğe bağlı başlık için aşağıdaki haritaya dosya adıyla yazın.
const captions: Record<string, string> = {
  // "01-gottman-seviye-1.jpg": "Gottman Enstitüsü, I. Düzey Çift Terapisi",
};

import { getBlur } from "./blur";

export type Certificate = { src: string; caption?: string; blur?: string };

export async function getCertificates(urls?: string[] | null): Promise<Certificate[]> {
  if (urls) return Promise.all(urls.map(async (u) => ({ src: u, blur: await getBlur(u) })));
  const dir = path.join(process.cwd(), "public", "sertifikalar");
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, "tr", { numeric: true }));
  return Promise.all(files.map(async (f) => ({ src: `/sertifikalar/${f}`, caption: captions[f], blur: await getBlur(`/sertifikalar/${f}`) })));
}
