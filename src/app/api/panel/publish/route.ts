import { guardApi } from "@/lib/cms/auth";
import { discardDraft, getMeta, publishDraft, restoreToDraft } from "@/lib/cms/content";

/** Taslağı yayına alır (yayındaki sürüm geçmişe kaydedilir). */
export async function POST(req: Request) {
  const denied = await guardApi();
  if (denied) return denied;
  const body = (await req.json().catch(() => ({}))) as { action?: string; label?: string; id?: string };

  if (body.action === "discard") {
    await discardDraft();
    return Response.json({ ok: true, meta: await getMeta() });
  }
  if (body.action === "restore") {
    const ok = await restoreToDraft(String(body.id ?? ""));
    return ok ? Response.json({ ok: true, meta: await getMeta() }) : Response.json({ error: "Sürüm bulunamadı." }, { status: 404 });
  }
  await publishDraft(String(body.label ?? "Yayınlandı").slice(0, 80));
  return Response.json({ ok: true, meta: await getMeta() });
}
