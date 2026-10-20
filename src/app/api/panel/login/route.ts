import { headers } from "next/headers";
import { isPanelConfigured, loginFailed, loginLocked, loginSucceeded, startSession, verifyCredentials } from "@/lib/cms/auth";
import { clientIp } from "@/lib/cms/ratelimit";

export async function POST(req: Request) {
  const h = await headers();
  const ip = clientIp(h);

  if (!(await isPanelConfigured())) {
    return Response.json({ error: "Panel kurulumu tamamlanmamış: sunucuda PANEL_PASSWORD ortam değişkeni tanımlanmalı." }, { status: 503 });
  }
  const wait = await loginLocked(ip);
  if (wait) return Response.json({ error: `Çok fazla hatalı deneme. Lütfen ${wait} dakika sonra tekrar deneyin.` }, { status: 429 });

  const body = (await req.json().catch(() => null)) as { username?: string; password?: string } | null;
  const username = String(body?.username ?? "").slice(0, 80);
  const password = String(body?.password ?? "").slice(0, 200);

  if (!(await verifyCredentials(username, password))) {
    await loginFailed(ip);
    // Yanıt süresini eşitleyerek kullanıcı adı tahminini zorlaştır
    await new Promise((r) => setTimeout(r, 400));
    return Response.json({ error: "Kullanıcı adı ya da şifre hatalı." }, { status: 401 });
  }
  await loginSucceeded(ip);
  await startSession();
  return Response.json({ ok: true });
}
