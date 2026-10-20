import { changeCredentials, currentUsername, guardApi, verifyCredentials } from "@/lib/cms/auth";

/** Kullanıcı adı / şifre değiştirme (mevcut şifre doğrulanır). */
export async function POST(req: Request) {
  const denied = await guardApi();
  if (denied) return denied;
  const b = (await req.json().catch(() => null)) as { current?: string; username?: string; password?: string } | null;
  if (!b) return Response.json({ error: "Geçersiz istek." }, { status: 400 });

  const username = await currentUsername();
  if (!(await verifyCredentials(username, String(b.current ?? "")))) {
    return Response.json({ error: "Mevcut şifre hatalı." }, { status: 403 });
  }
  const newPass = String(b.password ?? "");
  const newUser = String(b.username ?? "").trim();
  if (newPass && newPass.length < 8) return Response.json({ error: "Yeni şifre en az 8 karakter olmalı." }, { status: 422 });
  if (newUser && !/^[\w.-]{3,40}$/.test(newUser)) return Response.json({ error: "Kullanıcı adı 3–40 karakter olmalı (harf, rakam, . _ -)." }, { status: 422 });
  if (!newPass && !newUser) return Response.json({ error: "Değiştirilecek bir şey girilmedi." }, { status: 422 });
  await changeCredentials(newPass || null, newUser || undefined);
  return Response.json({ ok: true });
}
