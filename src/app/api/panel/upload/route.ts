import { guardApi } from "@/lib/cms/auth";
import { deleteUpload, listMedia, saveUpload } from "@/lib/cms/media";

export async function GET() {
  const denied = await guardApi();
  if (denied) return denied;
  return Response.json({ items: await listMedia() });
}

export async function POST(req: Request) {
  const denied = await guardApi();
  if (denied) return denied;
  const form = await req.formData().catch(() => null);
  const files = form?.getAll("file").filter((f): f is File => f instanceof File) ?? [];
  if (!files.length) return Response.json({ error: "Dosya seçilmedi." }, { status: 400 });
  try {
    const items = [];
    for (const f of files.slice(0, 10)) items.push(await saveUpload(f));
    return Response.json({ ok: true, items, url: items[0].url });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Yüklenemedi." }, { status: 422 });
  }
}

export async function DELETE(req: Request) {
  const denied = await guardApi();
  if (denied) return denied;
  const url = new URL(req.url).searchParams.get("url") ?? "";
  await deleteUpload(url);
  return Response.json({ ok: true });
}
