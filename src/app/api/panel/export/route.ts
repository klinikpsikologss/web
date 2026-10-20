import { guardApi } from "@/lib/cms/auth";
import { readDraft, readPublished } from "@/lib/cms/content";
import { listMessages } from "@/lib/cms/messages";

/** Tüm site içeriğinin (yayındaki + taslak) ve mesajların yedeğini JSON olarak indirir. */
export async function GET() {
  const denied = await guardApi();
  if (denied) return denied;
  const body = JSON.stringify({ exportedAt: new Date().toISOString(), published: await readPublished(), draft: await readDraft(), messages: await listMessages() }, null, 2);
  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="site-yedegi-${new Date().toISOString().slice(0, 10)}.json"`,
    },
  });
}
