import { guardApi } from "@/lib/cms/auth";
import { listMessages, removeMessage, setRead } from "@/lib/cms/messages";

export async function GET() {
  const denied = await guardApi();
  if (denied) return denied;
  return Response.json({ items: await listMessages() });
}

export async function POST(req: Request) {
  const denied = await guardApi();
  if (denied) return denied;
  const b = (await req.json().catch(() => null)) as { id?: string; action?: "read" | "unread" | "delete" } | null;
  if (!b?.id) return Response.json({ error: "Geçersiz istek." }, { status: 400 });
  if (b.action === "delete") await removeMessage(b.id);
  else await setRead(b.id, b.action !== "unread");
  return Response.json({ ok: true });
}
