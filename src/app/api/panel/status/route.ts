import { guardApi } from "@/lib/cms/auth";
import { getHistory, getMeta } from "@/lib/cms/content";
import { unreadCount } from "@/lib/cms/messages";

export async function GET() {
  const denied = await guardApi();
  if (denied) return denied;
  return Response.json({ meta: await getMeta(), unread: await unreadCount(), history: await getHistory() });
}
