import fs from "node:fs/promises";
import path from "node:path";
import { uploadsDir } from "@/lib/cms/store";

// Panelden yüklenen görselleri (data/uploads) sunar. Dosya adları benzersizdir, bu yüzden uzun süre önbelleğe alınabilir.
const TYPES: Record<string, string> = { ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".avif": "image/avif" };

export async function GET(_req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await ctx.params;
  const name = parts.join("/");
  const ext = path.extname(name).toLowerCase();
  if (parts.length !== 1 || !/^[\w.-]+$/.test(name) || !TYPES[ext]) return new Response("Bulunamadı", { status: 404 });
  try {
    const buf = await fs.readFile(path.join(uploadsDir, name));
    return new Response(new Uint8Array(buf), {
      headers: { "Content-Type": TYPES[ext], "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" },
    });
  } catch {
    return new Response("Bulunamadı", { status: 404 });
  }
}
