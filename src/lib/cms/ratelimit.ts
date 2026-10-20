import { createHash } from "node:crypto";
import { delKey, getJSON, updateJSON } from "./store";

/**
 * Depolamaya (dosya ya da Redis) dayalı hız sınırı. Bellek içi sayaçların aksine, sunucusuz ortamda
 * birden çok örnek çalışsa da sınır korunur. IP adresi düz yazılmaz, özetlenir.
 */
type Rec = { start: number; n: number };

const keyOf = (bucket: string, who: string) => `rl-${bucket}-${createHash("sha256").update(who).digest("hex").slice(0, 16)}`;

/** Pencere içinde sınır aşıldıysa kalan dakikayı, aşılmadıysa 0 döndürür (sayacı artırmaz). */
export async function limitedFor(bucket: string, who: string, limit: number, windowMs: number): Promise<number> {
  const r = await getJSON<Rec | null>(keyOf(bucket, who), null);
  if (!r || Date.now() - r.start > windowMs || r.n < limit) return 0;
  return Math.max(1, Math.ceil((r.start + windowMs - Date.now()) / 60000));
}

/** Bir olayı sayar (hatalı giriş, form gönderimi vb.). */
export async function countHit(bucket: string, who: string, windowMs: number): Promise<void> {
  await updateJSON<Rec>(keyOf(bucket, who), { start: 0, n: 0 }, (r) => {
    const now = Date.now();
    return now - r.start > windowMs ? { start: now, n: 1 } : { start: r.start, n: r.n + 1 };
  });
}

export const clearHits = (bucket: string, who: string) => delKey(keyOf(bucket, who));

/** İstemci IP'si (proxy arkasında ilk X-Forwarded-For değeri). */
export const clientIp = (h: Headers) => (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "yerel";
