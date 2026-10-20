import type { Content, EducationGroupLike, FaqRec, PostRec, SpecialtyRec } from "./content";
import type { Therapy } from "@/lib/therapies";
import { slugify } from "@/lib/posts";

/** Panelden gelen değişiklikleri doğrulayıp içeriğe uygular. Hatalıysa Türkçe mesajla Error fırlatır. */
export type Patch = {
  posts?: unknown;
  therapies?: unknown;
  specialties?: unknown;
  faqs?: unknown;
  education?: unknown;
  gallery?: unknown;
  certs?: unknown;
  events?: unknown;
  about?: unknown;
  site?: unknown;
  theme?: unknown;
  seo?: unknown;
  home?: unknown;
  texts?: unknown;
  images?: unknown;
};

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown, max = 5000) => (typeof v === "string" ? v.slice(0, max) : "");
const strArr = (v: unknown, max = 200, each = 20000) => (Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, max).map((x: string) => x.slice(0, each)) : []);
const arr = (v: unknown, name: string): unknown[] => {
  if (!Array.isArray(v)) throw new Error(`${name} listesi geçersiz.`);
  return v;
};
const url = (v: unknown) => {
  const s = str(v, 500);
  return (s.startsWith("/") && !s.startsWith("//")) || s.startsWith("https://res.cloudinary.com/") ? s : "";
};
/** Dış bağlantılar yalnızca https:// ile başlayabilir (javascript: gibi adresler reddedilir). */
const httpsOrEmpty = (v: unknown) => {
  const t = str(v, 300).trim();
  return t.startsWith("https://") && !/\s/.test(t) ? t : "";
};
const hex = (v: unknown, fb: string) => (typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : fb);
const CATS = ["kaygi", "duygu", "iliski", "yeme", "gunluk", "ozel"];

function uniqueSlugs(list: { slug: string }[], what: string) {
  const seen = new Set<string>();
  for (const x of list) {
    if (!x.slug) throw new Error(`${what}: adres (slug) boş olamaz.`);
    if (seen.has(x.slug)) throw new Error(`${what}: "${x.slug}" adresi birden fazla kez kullanılmış.`);
    seen.add(x.slug);
  }
}

export function applyPatch(c: Content, p: Patch): Content {
  const next: Content = { ...c };

  if (p.posts !== undefined) {
    const list: PostRec[] = arr(p.posts, "Yazı").map((raw) => {
      if (!isObj(raw)) throw new Error("Yazı kaydı geçersiz.");
      const title = str(raw.title, 200).trim();
      if (!title) throw new Error("Yazının başlığı boş olamaz.");
      return {
        id: str(raw.id, 60) || crypto.randomUUID(),
        slug: slugify(str(raw.slug, 120) || title),
        title,
        category: str(raw.category, 60).trim() || "Genel",
        excerpt: str(raw.excerpt, 400),
        body: strArr(raw.body),
        status: raw.status === "taslak" ? "taslak" : "yayinda",
        cover: url(raw.cover) || undefined,
        updatedAt: str(raw.updatedAt, 40) || new Date().toISOString(),
      };
    });
    uniqueSlugs(list, "Yazılar");
    next.posts = list;
  }

  if (p.therapies !== undefined) {
    const list: Therapy[] = arr(p.therapies, "Hizmet").map((raw) => {
      if (!isObj(raw)) throw new Error("Hizmet kaydı geçersiz.");
      const title = str(raw.title, 120).trim();
      if (!title) throw new Error("Hizmet başlığı boş olamaz.");
      return {
        slug: slugify(str(raw.slug, 100) || title),
        title,
        short: str(raw.short, 1500),
        intro: str(raw.intro, 2000),
        points: strArr(raw.points, 12, 300),
        sections: (Array.isArray(raw.sections) ? raw.sections : []).filter(isObj).slice(0, 12).map((s) => ({
          title: str(s.title, 160),
          paragraphs: strArr(s.paragraphs, 20, 4000),
          ...(Array.isArray(s.list) && s.list.length ? { list: strArr(s.list, 30, 300) } : {}),
          ...(Array.isArray(s.closing) && s.closing.length ? { closing: strArr(s.closing, 10, 4000) } : {}),
        })),
      };
    });
    uniqueSlugs(list, "Hizmetler");
    next.therapies = list;
  }

  if (p.specialties !== undefined) {
    const list: SpecialtyRec[] = arr(p.specialties, "Çalışma alanı").map((raw) => {
      if (!isObj(raw)) throw new Error("Çalışma alanı kaydı geçersiz.");
      const title = str(raw.title, 160).trim();
      if (!title) throw new Error("Çalışma alanı başlığı boş olamaz.");
      const category = CATS.includes(str(raw.category, 20)) ? (str(raw.category, 20) as SpecialtyRec["category"]) : "gunluk";
      return { slug: slugify(str(raw.slug, 120) || title), title, category, summary: str(raw.summary, 400) || undefined, body: strArr(raw.body), image: url(raw.image) || undefined };
    });
    uniqueSlugs(list, "Çalışma alanları");
    next.specialties = list;
  }

  if (p.faqs !== undefined) {
    next.faqs = arr(p.faqs, "Soru").map((raw): FaqRec => {
      if (!isObj(raw)) throw new Error("Soru kaydı geçersiz.");
      const q = str(raw.q, 300).trim();
      if (!q) throw new Error("Sorunun metni boş olamaz.");
      return { id: str(raw.id, 60) || crypto.randomUUID(), q, a: str(raw.a, 3000), home: raw.home === true };
    });
  }

  if (p.education !== undefined) {
    next.education = arr(p.education, "Eğitim grubu").map((raw): EducationGroupLike => {
      if (!isObj(raw)) throw new Error("Eğitim kaydı geçersiz.");
      const icon = ["egitim", "sertifika", "klinik", "gonullu"].includes(str(raw.icon, 20)) ? (str(raw.icon, 20) as EducationGroupLike["icon"]) : "egitim";
      return {
        title: str(raw.title, 120),
        icon,
        items: (Array.isArray(raw.items) ? raw.items : []).filter(isObj).slice(0, 40).map((i) => ({ title: str(i.title, 200), detail: str(i.detail, 400) || undefined, text: str(i.text, 2000) || undefined, image: url(i.image) || undefined })),
      };
    });
  }

  if (p.gallery !== undefined) {
    next.gallery = p.gallery === null ? null : strArr(p.gallery, 60, 500).map(url).filter(Boolean);
  }
  if (p.certs !== undefined) next.certs = p.certs === null ? null : strArr(p.certs, 60, 500).map(url).filter(Boolean);
  if (p.events !== undefined) next.events = p.events === null ? null : strArr(p.events, 60, 500).map(url).filter(Boolean);

  if (p.about !== undefined) {
    if (!isObj(p.about)) throw new Error("Hakkımda içeriği geçersiz.");
    next.about = {
      memberships: (Array.isArray(p.about.memberships) ? p.about.memberships : []).filter(isObj).slice(0, 12).map((m) => ({ name: str(m.name, 160).trim(), role: str(m.role, 80).trim() })).filter((m) => m.name),
      activities: (Array.isArray(p.about.activities) ? p.about.activities : []).filter(isObj).slice(0, 12).map((g) => ({
        title: str(g.title, 160).trim(),
        lead: str(g.lead, 300),
        items: (Array.isArray(g.items) ? g.items : []).filter(isObj).slice(0, 200).map((i) => ({ title: str(i.title, 300).trim(), place: str(i.place, 500), date: str(i.date, 80) })).filter((i) => i.title),
      })).filter((g) => g.title),
    };
  }

  if (p.site !== undefined) {
    if (!isObj(p.site)) throw new Error("İletişim bilgileri geçersiz.");
    const s = p.site;
    next.site = {
      phone: str(s.phone, 40) || c.site.phone,
      email: str(s.email, 160) || c.site.email,
      street: str(s.street, 240) || c.site.street,
      district: str(s.district, 80) || c.site.district,
      city: str(s.city, 80) || c.site.city,
      instagram: httpsOrEmpty(s.instagram),
      linkedin: httpsOrEmpty(s.linkedin),
      appointmentUrl: str(s.appointmentUrl, 500).trim().startsWith("https://") && !/\s/.test(str(s.appointmentUrl, 500).trim()) ? str(s.appointmentUrl, 500).trim() : c.site.appointmentUrl,
    };
  }

  if (p.theme !== undefined) {
    if (!isObj(p.theme)) throw new Error("Tema geçersiz.");
    next.theme = { navy: hex(p.theme.navy, c.theme.navy), gold: hex(p.theme.gold, c.theme.gold) };
  }

  if (p.seo !== undefined) {
    if (!isObj(p.seo)) throw new Error("SEO ayarları geçersiz.");
    next.seo = { title: str(p.seo.title, 120) || c.seo.title, description: str(p.seo.description, 320) || c.seo.description };
  }

  if (p.home !== undefined) {
    if (!isObj(p.home)) throw new Error("Ana sayfa düzeni geçersiz.");
    next.home = { order: strArr(p.home.order, 30, 60), hidden: strArr(p.home.hidden, 30, 60) };
  }

  if (p.texts !== undefined) {
    if (!isObj(p.texts)) throw new Error("Metinler geçersiz.");
    const t = { ...c.texts };
    for (const [k, v] of Object.entries(p.texts)) {
      if (k.length > 80) continue;
      if (v === null) delete t[k];
      else if (typeof v === "string") t[k] = v.slice(0, 6000);
    }
    next.texts = t;
  }

  if (p.images !== undefined) {
    if (!isObj(p.images)) throw new Error("Görseller geçersiz.");
    const im = { ...c.images };
    for (const [k, v] of Object.entries(p.images)) {
      if (k.length > 120) continue;
      const val = v === null ? undefined : typeof v === "string" && url(v) ? v : null;
      if (val === null) continue;
      // Kayda bağlı görseller: post:<id>, spec:<slug>, gal:<sıra>, edu:<grup>:<kayıt>
      const [kind, a, b] = k.split(":");
      if (kind === "post") next.posts = (next.posts ?? c.posts).map((x) => (x.id === a ? { ...x, cover: val, updatedAt: new Date().toISOString() } : x));
      else if (kind === "spec") next.specialties = (next.specialties ?? c.specialties).map((x) => (x.slug === a ? { ...x, image: val } : x));
      else if (kind === "gal") {
        const g = [...(next.gallery ?? c.gallery ?? [])];
        if (a === "+") {
          if (val) g.push(val);
        } else {
          const i = Number(a);
          if (Number.isInteger(i) && i >= 0 && i < g.length) {
            if (val) g[i] = val;
            else g.splice(i, 1);
          }
        }
        next.gallery = g;
      } else if (kind === "cert" || kind === "evt") {
        const f = kind === "cert" ? "certs" : "events";
        const g = [...((next[f] ?? c[f]) as string[] | null ?? [])];
        if (a === "+") {
          if (val) g.push(val);
        } else {
          const i = Number(a);
          if (Number.isInteger(i) && i >= 0 && i < g.length) {
            if (val) g[i] = val;
            else g.splice(i, 1);
          }
        }
        next[f] = g;
      } else if (kind === "edu")
        next.education = (next.education ?? c.education).map((grp, gi) => (gi === Number(a) ? { ...grp, items: grp.items.map((it, ii) => (ii === Number(b) ? { ...it, image: val } : it)) } : grp));
      else if (val === undefined) delete im[k];
      else im[k] = val;
    }
    next.images = im;
  }

  return next;
}
