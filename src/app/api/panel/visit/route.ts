import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/cms/auth";

/**
 * Siteyi taslak modunda açar: ?mode=edit (satır içi düzenleme) | preview (önizleme) | off (çıkış).
 * Taslak modu yalnızca oturum açmış yöneticiye verilir.
 */
export async function GET(req: Request) {
  if (!(await isAuthed())) redirect("/panel");
  const url = new URL(req.url);
  const mode = url.searchParams.get("mode") ?? "preview";
  let to = url.searchParams.get("to") ?? "/";
  if (!to.startsWith("/") || to.startsWith("//") || to.startsWith("/panel")) to = "/";

  const dm = await draftMode();
  if (mode === "off") {
    dm.disable();
    redirect("/panel/ozet");
  }
  dm.enable();
  const sep = to.includes("?") ? "&" : "?";
  redirect(`${to}${sep}__pm=${mode === "edit" ? "edit" : "preview"}`);
}
