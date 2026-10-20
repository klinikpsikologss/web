import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getJSON, setJSON } from "./store";
import { clearHits, countHit, limitedFor } from "./ratelimit";

/**
 * Tek kullanıcılı yönetim paneli girişi.
 * İlk çalıştırmada kullanıcı adı/şifre aşağıdaki varsayılanlardan (ya da PANEL_USERNAME / PANEL_PASSWORD
 * ortam değişkenlerinden) alınıp şifre özetlenerek (scrypt) saklanır. Şifre panelden (Ayarlar) değiştirilebilir.
 * Canlıda PANEL_PASSWORD (ve isteğe bağlı PANEL_USERNAME) ortam değişkeni zorunludur; tanımlı değilse giriş kapalı kalır.
 */
const DEFAULT_USER = process.env.PANEL_USERNAME || "admin";
const PROD = process.env.NODE_ENV === "production";
// Canlıda varsayılan şifre yoktur: PANEL_PASSWORD tanımlı olmalı. Yalnızca geliştirme ortamında deneme şifresi kullanılır.
const DEFAULT_PASS = process.env.PANEL_PASSWORD || (PROD ? "" : "gelistirme-sifresi");

export const isPanelConfigured = async () => Boolean(DEFAULT_PASS) || (await getJSON<Credentials | null>("auth", null)) !== null;

export const SESSION_COOKIE = "panel_session";
const SESSION_DAYS = 7;

type Credentials = { username: string; salt: string; hash: string };

const scryptAsync = (pw: string, salt: string) =>
  new Promise<Buffer>((resolve, reject) => scrypt(pw, salt, 64, (e, k) => (e ? reject(e) : resolve(k))));

async function getCredentials(): Promise<Credentials> {
  const stored = await getJSON<Credentials | null>("auth", null);
  if (stored) return stored;
  if (!DEFAULT_PASS) throw new Error("PANEL_NOT_CONFIGURED");
  const salt = randomBytes(16).toString("hex");
  const creds = { username: DEFAULT_USER, salt, hash: (await scryptAsync(DEFAULT_PASS, salt)).toString("hex") };
  await setJSON("auth", creds);
  return creds;
}

export async function getSecret(): Promise<string> {
  if (process.env.PANEL_SECRET) return process.env.PANEL_SECRET;
  const stored = await getJSON<{ v: string } | null>("secret", null);
  if (stored) return stored.v;
  const v = randomBytes(32).toString("hex");
  await setJSON("secret", { v });
  return v;
}

const safeEqual = (a: string, b: string) => {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
};

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const c = await getCredentials();
  const hash = (await scryptAsync(password, c.salt)).toString("hex");
  const okUser = safeEqual(username.trim().toLowerCase(), c.username.toLowerCase());
  const okPass = safeEqual(hash, c.hash);
  return okUser && okPass;
}

export async function currentUsername() {
  return (await getCredentials()).username;
}

export async function changeCredentials(newPassword: string | null, newUsername?: string) {
  const cur = await getCredentials();
  const salt = newPassword ? randomBytes(16).toString("hex") : cur.salt;
  await setJSON("auth", {
    username: newUsername?.trim() || cur.username,
    salt,
    hash: newPassword ? (await scryptAsync(newPassword, salt)).toString("hex") : cur.hash,
  });
}

const sign = (payload: string, secret: string) => createHmac("sha256", secret).update(payload).digest("base64url");

export async function startSession() {
  const secret = await getSecret();
  const exp = Date.now() + SESSION_DAYS * 86400_000;
  // Şifre değişince eski oturumlar geçersiz olsun diye özetin bir parçası oturuma yazılır
  const v = (await getCredentials()).hash.slice(0, 16);
  const payload = Buffer.from(JSON.stringify({ u: "admin", exp, v })).toString("base64url");
  const jar = await cookies();
  jar.set(SESSION_COOKIE, `${payload}.${sign(payload, secret)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Verilen çerez değeri geçerli bir oturum mu? */
export async function validToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const secret = await getSecret();
  if (!safeEqual(sig, sign(payload, secret))) return false;
  try {
    const { exp, v } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp: number; v?: string };
    return typeof exp === "number" && exp > Date.now() && typeof v === "string" && safeEqual(v, (await getCredentials()).hash.slice(0, 16));
  } catch {
    return false;
  }
}

export async function isAuthed(): Promise<boolean> {
  return validToken((await cookies()).get(SESSION_COOKIE)?.value);
}

/** Sayfalar için: oturum yoksa giriş ekranına yönlendirir. */
export async function requireAuth() {
  if (!(await isAuthed())) redirect("/panel");
}

/** API'ler için: oturum + aynı kaynak (Origin) kontrolü. Başarısızsa Response döner, başarılıysa null. */
export async function guardApi(): Promise<Response | null> {
  if (!(await isAuthed())) return Response.json({ error: "Oturum gerekli." }, { status: 401 });
  const h = await headers();
  const origin = h.get("origin");
  const host = h.get("host");
  if (origin) {
    try {
      if (new URL(origin).host !== host) return Response.json({ error: "Geçersiz istek kaynağı." }, { status: 403 });
    } catch {
      return Response.json({ error: "Geçersiz istek kaynağı." }, { status: 403 });
    }
  }
  return null;
}

/* Giriş denemesi sınırı (kalıcı depoda): 15 dakikada 5 hatalı denemeden sonra o IP 15 dakika kilitlenir */
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW = 15 * 60_000;
export const loginLocked = (ip: string) => limitedFor("login", ip, LOGIN_LIMIT, LOGIN_WINDOW);
export const loginFailed = (ip: string) => countHit("login", ip, LOGIN_WINDOW);
export const loginSucceeded = (ip: string) => clearHits("login", ip);
