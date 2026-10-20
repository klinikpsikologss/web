import fs from "node:fs/promises";
import path from "node:path";
import { createHash, randomBytes } from "node:crypto";
import sharp from "sharp";
import { getJSON, updateJSON, uploadsDir } from "./store";

export type MediaItem = { url: string; name: string; width: number; height: number; size: number; createdAt: string; publicId?: string };

const KEY = "media";
export const MAX_UPLOAD = 12 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const CKEY = process.env.CLOUDINARY_API_KEY;
const CSECRET = process.env.CLOUDINARY_API_SECRET;
export const cloudinaryOn = Boolean(CLOUD && CKEY && CSECRET);

const sign = (params: Record<string, string>) =>
  createHash("sha1")
    .update(
      Object.keys(params)
        .sort()
        .map((k) => `${k}=${params[k]}`)
        .join("&") + CSECRET,
    )
    .digest("hex");

export const listMedia = () => getJSON<MediaItem[]>(KEY, []);

/** Yüklenen görseli doğrular, en fazla 2600px'e küçültür ve WebP olarak kaydeder. */
export async function saveUpload(file: File): Promise<MediaItem> {
  if (!ALLOWED.includes(file.type)) throw new Error("Yalnızca JPG, PNG, WebP veya AVIF yüklenebilir.");
  if (file.size > MAX_UPLOAD) throw new Error("Dosya 12 MB'dan büyük olamaz.");
  const input = Buffer.from(await file.arrayBuffer());
  let out: { data: Buffer; info: { width: number; height: number } };
  try {
    out = await sharp(input, { failOn: "error" })
      .rotate()
      .resize({ width: 2600, height: 2600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 88 })
      .toBuffer({ resolveWithObject: true });
  } catch {
    throw new Error("Görsel okunamadı. Dosya bozuk olabilir.");
  }
  if (cloudinaryOn) {
    const params = { folder: "selinsak", timestamp: String(Math.floor(Date.now() / 1000)) };
    const fd = new FormData();
    fd.append("file", new Blob([new Uint8Array(out.data)], { type: "image/webp" }), "upload.webp");
    fd.append("api_key", CKEY!);
    fd.append("signature", sign(params));
    Object.entries(params).forEach(([k, v]) => fd.append(k, v));
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: fd });
    const j = (await res.json().catch(() => null)) as { secure_url?: string; public_id?: string; error?: { message: string } } | null;
    if (!res.ok || !j?.secure_url) throw new Error("Görsel buluta yüklenemedi: " + (j?.error?.message ?? res.status));
    const item: MediaItem = {
      url: j.secure_url,
      publicId: j.public_id,
      name: file.name.replace(/.[^.]+$/, "").slice(0, 80) || "görsel",
      width: out.info.width,
      height: out.info.height,
      size: out.data.length,
      createdAt: new Date().toISOString(),
    };
    await updateJSON<MediaItem[]>(KEY, [], (l) => [item, ...l].slice(0, 500));
    return item;
  }
  const filename = `${Date.now().toString(36)}-${randomBytes(4).toString("hex")}.webp`;
  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(path.join(uploadsDir, filename), out.data);
  const item: MediaItem = {
    url: `/uploads/${filename}`,
    name: file.name.replace(/\.[^.]+$/, "").slice(0, 80) || "görsel",
    width: out.info.width,
    height: out.info.height,
    size: out.data.length,
    createdAt: new Date().toISOString(),
  };
  await updateJSON<MediaItem[]>(KEY, [], (l) => [item, ...l].slice(0, 500));
  return item;
}

export async function deleteUpload(url: string) {
  if (url.startsWith("https://res.cloudinary.com/")) {
    const hit = (await listMedia()).find((m) => m.url === url);
    if (hit?.publicId && cloudinaryOn) {
      const params = { public_id: hit.publicId, timestamp: String(Math.floor(Date.now() / 1000)) };
      await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/destroy`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ ...params, api_key: CKEY!, signature: sign(params) }),
      }).catch(() => null);
    }
    await updateJSON<MediaItem[]>(KEY, [], (l) => l.filter((m) => m.url !== url));
    return;
  }
  if (!url.startsWith("/uploads/")) return;
  const name = path.basename(url);
  await fs.rm(path.join(uploadsDir, name), { force: true });
  await updateJSON<MediaItem[]>(KEY, [], (l) => l.filter((m) => m.url !== url));
}
