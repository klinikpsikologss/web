import fs from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { createClient, type RedisClientType } from "redis";

/**
 * Basit anahtar-değer depolama.
 * - Varsayılan: proje klasöründeki `data/` dizininde JSON dosyaları (kendi sunucu / VPS için).
 * - UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (ya da KV_REST_API_*) tanımlıysa Upstash Redis (REST).
 * - KV_REDIS_URL / REDIS_URL tanımlıysa standart Redis bağlantısı (Vercel Marketplace > Redis).
 * Vercel gibi kalıcı diski olmayan ortamlarda ikisinden biri gerekir.
 * Her anahtar için yazmalar sıraya alınır (okuyup-değiştirip-yazma çakışmalarını önler).
 */
const DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
// Vercel Marketplace entegrasyonu KV_REST_API_* adlarıyla da ekleyebilir; ikisi de desteklenir
const REST_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const TCP_URL = process.env.KV_REDIS_URL || process.env.REDIS_URL;
const useRest = Boolean(REST_URL && REST_TOKEN);
const useRedis = useRest || Boolean(TCP_URL);

// Standart Redis bağlantısı: sunucusuz ortamda örnek başına tek bağlantı, kopunca yeniden kurulur
const g = globalThis as unknown as { __redis?: Promise<RedisClientType> };
function tcp(): Promise<RedisClientType> {
  if (!g.__redis) {
    const client = createClient({ url: TCP_URL, socket: { connectTimeout: 5000, reconnectStrategy: false } }) as RedisClientType;
    client.on("error", () => {
      g.__redis = undefined;
    });
    g.__redis = client.connect().then(() => client).catch((e) => {
      g.__redis = undefined;
      throw e;
    });
  }
  return g.__redis;
}

async function redis<T = unknown>(cmd: (string | number)[]): Promise<T> {
  if (!useRest) {
    const client = await tcp();
    return (await client.sendCommand(cmd.map(String))) as T;
  }
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
