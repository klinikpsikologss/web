import { cache } from "react";
import { draftMode } from "next/headers";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { getJSON, setJSON, withLock } from "./store";
import { HOME_ORDER_DEFAULT } from "./home-sections";
import { posts as seedPosts, type Post } from "@/lib/posts";
import { therapies as seedTherapies, type Therapy } from "@/lib/therapies";
import { specialties as seedSpecialties, type Specialty } from "@/lib/specialties";
import { faqs as seedFaqs, type Faq } from "@/lib/faq";
import { groups as seedEducation, type EducationGroup } from "@/lib/education";
import { site as seedSite } from "@/lib/site";
import { memberships as seedMemberships, activities as seedActivities, type ActivityGroup, type Membership } from "@/lib/about";

/* ───────────── Tipler ───────────── */
export type PostRec = Post & { id: string; status: "yayinda" | "taslak"; cover?: string; updatedAt: string };
export type SpecialtyRec = Specialty & { image?: string };
export type FaqRec = Faq & { id: string };
export type SiteInfo = {
  phone: string;
  email: string;
  street: string;
  district: string;
  city: string;
  instagram: string;
  linkedin: string;
  /** "Randevu Al" butonlarının gittiği adres */
  appointmentUrl: string;
};
export type AboutContent = { memberships: Membership[]; activities: ActivityGroup[] };
export type EducationGroupLike = EducationGroup;
export type Theme = { navy: string; gold: string };
export type Seo = { title: string; description: string };

export type Content = {
  /** Satır içi düzenlenen metinler: kimlik -> metin */
  texts: Record<string, string>;
  /** Değiştirilen görseller: kimlik -> adres */
  images: Record<string, string>;
  home: { order: string[]; hidden: string[] };
  /** Klinik galerisi; null ise public/ içindeki klinik-N.jpg dosyaları kullanılır */
  gallery: string[] | null;
  /** Sertifika şeridi; null ise public/sertifikalar klasörü kullanılır */
  certs: string[] | null;
  /** Hakkımda etkinlik fotoğrafları; null ise public/etkinlikler klasörü kullanılır */
  events: string[] | null;
  about: AboutContent;
  posts: PostRec[];
  therapies: Therapy[];
  specialties: SpecialtyRec[];
  faqs: FaqRec[];
  education: EducationGroup[];
  site: SiteInfo;
  theme: Theme;
  seo: Seo;
};

export type ContentMeta = { dirty: boolean; updatedAt: string | null; publishedAt: string | null };
export type HistoryEntry = { id: string; at: string; label: string; content: Content };

/* ───────────── Varsayılanlar (kodda duran ilk içerik) ───────────── */
export function defaultContent(): Content {
  return {
    texts: {},
    images: {},
    home: { order: [...HOME_ORDER_DEFAULT], hidden: [] },
    gallery: null,
    certs: null,
    events: null,
    about: structuredClone({ memberships: seedMemberships, activities: seedActivities }),
    posts: seedPosts.map((p) => ({ ...p, id: p.slug, status: "yayinda" as const, updatedAt: "2026-10-19T00:00:00.000Z" })),
    therapies: structuredClone(seedTherapies),
    specialties: structuredClone(seedSpecialties) as SpecialtyRec[],
    faqs: seedFaqs.map((f, i) => ({ ...f, id: `s${i + 1}` })),
    education: structuredClone(seedEducation),
    site: {
      phone: seedSite.phone,
      email: seedSite.email,
      street: seedSite.address.street,
      district: seedSite.address.district,
      city: seedSite.address.city,
      instagram: seedSite.instagram,
      linkedin: seedSite.linkedin,
      appointmentUrl: seedSite.appointmentUrl,
    },
    theme: { navy: "#0f2747", gold: "#d9c6a1" },
    seo: { title: "Klinik Psikolog Selin Sak | Bolu Psikoterapi ve Çift Terapisi", description: "Bolu’da Klinik Psikolog Selin Sak ile Bilişsel ve Davranışçı Terapiler (BDT) temelli yüz yüze ve online bireysel psikoterapi ve çift terapisi." },
  };
}

function merge(stored: Partial<Content> | null): Content {
  const d = defaultContent();
  if (!stored) return d;
  return {
    ...d,
    ...stored,
    about: stored.about ?? d.about,
    certs: stored.certs ?? null,
    events: stored.events ?? null,
    home: { ...d.home, ...(stored.home ?? {}) },
    site: { ...d.site, ...(stored.site ?? {}) },
    theme: { ...d.theme, ...(stored.theme ?? {}) },
    seo: { ...d.seo, ...(stored.seo ?? {}) },
    texts: { ...(stored.texts ?? {}) },
    images: { ...(stored.images ?? {}) },
  };
}

/* ───────────── Okuma ───────────── */
const KEY_PUB = "content:published";
const KEY_DRAFT = "content:draft";
const KEY_META = "content:meta";
const KEY_HIST = "content:history";

// Her dağıtımda önbellek anahtarı değişir: koddaki varsayılan içerik/ayar değişiklikleri eski önbellekte takılı kalmaz.
const BUILD = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.VERCEL_DEPLOYMENT_ID ?? `local-${Date.now()}`;

export const readPublished = async (): Promise<Content> => merge(await getJSON<Partial<Content> | null>(KEY_PUB, null));
const publishedCached = unstable_cache(readPublished, ["cms-published", BUILD], { tags: ["cms"] });

export async function readDraft(): Promise<Content> {
  const draft = await getJSON<Partial<Content> | null>(KEY_DRAFT, null);
  return draft ? merge(draft) : readPublished();
}

export async function getMeta(): Promise<ContentMeta> {
  return getJSON<ContentMeta>(KEY_META, { dirty: false, updatedAt: null, publishedAt: null });
}

/** Sayfalarda kullanılan içerik: taslak modundaysa taslak, değilse yayındaki (önbellekli) sürüm. */
export const getContent = cache(async (): Promise<Content & { __draft: boolean }> => {
  const { isEnabled } = await draftMode();
  const c = isEnabled ? await readDraft() : await publishedCached();
  return { ...c, __draft: isEnabled };
});

/** Sitemap/robots gibi istek dışı bağlamlar için */
export const getPublished = publishedCached;

/* ───────────── Yazma ───────────── */
export async function saveDraft(patch: (c: Content) => Content | void): Promise<Content> {
  return withLock("content:draft-write", async () => {
    const cur = await readDraft();
    const next = (patch(cur) as Content | undefined) ?? cur;
    await setJSON(KEY_DRAFT, next);
    await setJSON(KEY_META, { ...(await getMeta()), dirty: true, updatedAt: new Date().toISOString() });
    return next;
  });
}

export async function discardDraft() {
  await setJSON(KEY_DRAFT, null);
  await setJSON(KEY_META, { ...(await getMeta()), dirty: false });
}

export async function publishDraft(label = "Yayınlandı") {
  return withLock("content:draft-write", async () => {
    const draft = await readDraft();
    const prev = await readPublished();
    const hist = await getJSON<HistoryEntry[]>(KEY_HIST, []);
    hist.unshift({ id: crypto.randomUUID(), at: new Date().toISOString(), label, content: prev });
    await setJSON(KEY_HIST, hist.slice(0, 10));
    await setJSON(KEY_PUB, draft);
    await setJSON(KEY_DRAFT, null);
    const now = new Date().toISOString();
    await setJSON(KEY_META, { dirty: false, updatedAt: now, publishedAt: now });
    revalidateTag("cms", "max");
    revalidatePath("/", "layout");
  });
}

export async function getHistory(): Promise<Omit<HistoryEntry, "content">[]> {
  return (await getJSON<HistoryEntry[]>(KEY_HIST, [])).map(({ id, at, label }) => ({ id, at, label }));
}

/** Eski bir sürümü taslağa yükler (yayınlamak için ayrıca onay gerekir). */
export async function restoreToDraft(id: string): Promise<boolean> {
  const hist = await getJSON<HistoryEntry[]>(KEY_HIST, []);
  const hit = hist.find((h) => h.id === id);
  if (!hit) return false;
  await setJSON(KEY_DRAFT, hit.content);
  await setJSON(KEY_META, { ...(await getMeta()), dirty: true, updatedAt: new Date().toISOString() });
  return true;
}

/* ───────────── Seçiciler ───────────── */
type Ctx = Content & { __draft?: boolean };

export const visiblePosts = (c: Ctx) => c.posts.filter((p) => c.__draft || p.status === "yayinda");
export const readingMinutesOf = (p: Pick<Post, "body">) =>
  Math.max(1, Math.round((p.body ?? []).join(" ").split(/\s+/).filter(Boolean).length / 200));
export const postCategories = (c: Ctx) => Array.from(new Set(visiblePosts(c).map((p) => p.category)));
export const postBySlug = (c: Ctx, slug: string) => visiblePosts(c).find((p) => p.slug === slug);
export const specialtyBySlug = (c: Ctx, slug: string) => c.specialties.find((s) => s.slug === slug);
export const therapyBySlug = (c: Ctx, slug: string) => c.therapies.find((t) => t.slug === slug);

/** Kimlik için (varsa) geçersiz kılınmış metni, yoksa varsayılanı döndürür. */
export const textOf = (c: Ctx, id: string, fallback: string) => c.texts[id] ?? fallback;
export const imageOf = (c: Ctx, id: string | undefined, fallback: string) => (id && c.images[id]) || fallback;

/** Panelden düzenlenebilen iletişim bilgilerini, sabit site bilgileriyle birleştirir. */
export function siteOf(c: Ctx) {
  const digits = c.site.phone.replace(/\D/g, "");
  const intl = digits.startsWith("90") ? digits : `90${digits.replace(/^0/, "")}`;
  return {
    ...seedSite,
    phone: c.site.phone,
    phoneHref: `tel:+${intl}`,
    whatsappHref: `https://wa.me/${intl}`,
    email: c.site.email,
    address: { street: c.site.street, district: c.site.district, city: c.site.city },
    instagram: c.site.instagram,
    linkedin: c.site.linkedin,
    appointmentUrl: c.site.appointmentUrl || seedSite.appointmentUrl,
  };
}
export type SiteView = ReturnType<typeof siteOf>;

/** Çalışma alanı kategorisinin başlığı (panelden değiştirilebilir). */
export const catTitleId = (key: string) => `cat.${key}.title`;
export const catLeadId = (key: string) => `cat.${key}.lead`;
export const catTitle = (c: Pick<Content, "texts">, key: string, fallback: string) => c.texts[catTitleId(key)] ?? fallback;
