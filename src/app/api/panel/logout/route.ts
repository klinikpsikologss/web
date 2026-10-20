import { draftMode } from "next/headers";
import { endSession, guardApi } from "@/lib/cms/auth";

export async function POST() {
  const denied = await guardApi();
  if (denied) return denied;
  (await draftMode()).disable();
  await endSession();
  return Response.json({ ok: true });
}
