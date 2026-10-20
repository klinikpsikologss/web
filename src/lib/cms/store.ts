import fs from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";

/**
 * Basit anahtar-değer depolama.
 * - Varsayılan: proje klasöründeki `data/` dizininde JSON dosyaları (kendi sunucu / VPS için).
 * - UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN tanımlıysa Upstash Redis (Vercel gibi kalıcı diski olmayan ortamlar için).
 * Her anahtar için yazmalar sıraya alınır (okuyup-değiştirip-yazma çakışmalarını önler).
 */
const DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = Boolean(REST_URL && REST_TOKEN);

async function redis<T = unknown>(cmd: (string | number)[]): Promise<T> {
  const res = await fetch(REST_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${REST_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis hatası: ${res.status}`);
  return ((await res.json()) as { result: T }).result;
}

const file = (key: string) => path.join(DIR, `${encodeURIComponent(key)}.json`);

export async function getJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    if (useRedis) {
      const raw = await redis<string | null>(["GET", `cms:${key}`]);
      return raw ? (JSON.parse(raw) as T) : fallback;
    }
    return JSON.parse(await fs.readFile(file(key), "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function setJSON(key: string, value: unknown): Promise<void> {
  const json = JSON.stringify(value);
  if (useRedis) {
    await redis(["SET", `cms:${key}`, json]);
    return;
  }
  await fs.mkdir(DIR, { recursive: true });
  const tmp = `${file(key)}.${randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, json, "utf8");
  await fs.rename(tmp, file(key));
}

export async function delKey(key: string): Promise<void> {
  if (useRedis) {
    await redis(["DEL", `cms:${key}`]);
    return;
  }
  await fs.rm(file(key), { force: true });
}

export async function listKeys(prefix: string): Promise<string[]> {
  if (useRedis) {
    const keys = await redis<string[]>(["KEYS", `cms:${prefix}*`]);
    return keys.map((k) => k.slice(4));
  }
  try {
    const names = await fs.readdir(DIR);
    return names
      .filter((n) => n.endsWith(".json"))
      .map((n) => decodeURIComponent(n.slice(0, -5)))
      .filter((k) => k.startsWith(prefix));
  } catch {
    return [];
  }
}

const locks = new Map<string, Promise<unknown>>();

/** Aynı anahtar üzerindeki işlemleri sıraya koyar. */
export function withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const prev = locks.get(key) ?? Promise.resolve();
  const next = prev.catch(() => undefined).then(fn);
  locks.set(
    key,
    next.catch(() => undefined),
  );
  return next;
}

/** Okuyup-değiştirip-yazar (sıraya alınmış). */
export function updateJSON<T>(key: string, fallback: T, fn: (cur: T) => T | Promise<T>): Promise<T> {
  return withLock(key, async () => {
    const next = await fn(await getJSON<T>(key, fallback));
    await setJSON(key, next);
    return next;
  });
}

export const storageMode: "redis" | "dosya" = useRedis ? "redis" : "dosya";
export const uploadsDir = path.join(DIR, "uploads");
