import { guardApi } from "@/lib/cms/auth";
import { getMeta, saveDraft } from "@/lib/cms/content";
import { applyPatch, type Patch } from "@/lib/cms/validate";
import { getClinicPhotos } from "@/lib/gallery";
import { getCertificates } from "@/lib/certificates";
import { getEventPhotos } from "@/lib/event-photos";

/** Taslağa değişiklik kaydeder (yayına etkisi yoktur; "Yayınla" ayrı bir adımdır). */
export async function POST(req: Request) {
  const denied = await guardApi();
  if (denied) return denied;
  const patch = (await req.json().catch(() => null)) as Patch | null;
  if (!patch || typeof patch !== "object") return Response.json({ error: "Geçersiz istek." }, { status: 400 });
  // Galeri varsayılan (klasördeki) fotoğraflardaysa, tek bir görseli değiştirmek için önce listeye dönüştürülür
  const imgs = patch.images && typeof patch.images === "object" ? Object.keys(patch.images) : [];
  // Liste varsayılan (klasördeki) dosyalardaysa, tek bir görseli değiştirmek/silmek için önce listeye dönüştürülür
  const has = (p: string) => imgs.some((k) => k.startsWith(p));
  const defs = {
    gallery: has("gal:") ? (await getClinicPhotos(null)).map((x) => x.src) : null,
    certs: has("cert:") ? (await getCertificates()).map((x) => x.src) : null,
    events: has("evt:") ? (await getEventPhotos()).map((x) => x.src) : null,
  };
  try {
    await saveDraft((c) =>
      applyPatch(
        {
          ...c,
          ...(defs.gallery && !c.gallery?.length ? { gallery: defs.gallery } : {}),
          ...(defs.certs && !c.certs ? { certs: defs.certs } : {}),
          ...(defs.events && !c.events ? { events: defs.events } : {}),
        },
        patch,
      ),
    );
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Kaydedilemedi." }, { status: 422 });
  }
  return Response.json({ ok: true, meta: await getMeta() });
}
