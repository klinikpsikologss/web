"use client";

import { slugify } from "@/lib/posts";
import { categories } from "@/lib/specialties";
import type { Therapy } from "@/lib/therapies";
import type { FaqRec, SpecialtyRec } from "@/lib/cms/content";
import type { EducationGroup } from "@/lib/education";
import { Btn, Field, ImagePicker, fromParas, inputCls, move, toLines, toParas, useSave } from "./kit";
import { Collection } from "./Collection";

const CATEGORIES: { key: string; title: string }[] = categories.map((c) => ({ key: c.key, title: c.title }));

/* ───────── Hizmetler ───────── */
export function Therapies({ initial }: { initial: Therapy[] }) {
  return (
    <Collection<Therapy>
      field="therapies"
      initial={initial}
      addLabel="+ Yeni hizmet"
      blank={() => ({ slug: "", title: "", short: "", intro: "", points: [], sections: [] })}
      title={(t) => t.title}
      subtitle={(t) => t.short}
      previewPath={(t) => (t.slug ? `/terapi/${t.slug}` : null)}
      form={(t, set) => (
        <>
          <Field label="Hizmet adı">
            <input className={inputCls} value={t.title} onChange={(e) => set({ title: e.target.value, ...(t.slug === "" || t.slug === slugify(t.title) ? { slug: slugify(e.target.value) } : {}) })} />
          </Field>
          <Field label="Kısa tanıtım" hint="Ana sayfadaki ve hizmetler sayfasındaki kartta görünür.">
            <textarea className={`${inputCls} min-h-24`} value={t.short} onChange={(e) => set({ short: e.target.value })} />
          </Field>
          <Field label="Sayfa giriş metni">
            <textarea className={`${inputCls} min-h-28`} value={t.intro} onChange={(e) => set({ intro: e.target.value })} />
          </Field>
          <Field label="Giriş altı maddeler (isteğe bağlı)" hint="Her satır bir madde olur. Boş bırakılabilir.">
            <textarea className={`${inputCls} min-h-32`} value={t.points.join("\n")} onChange={(e) => set({ points: toLines(e.target.value) })} />
          </Field>
          <Sections value={t.sections} onChange={(sections) => set({ sections })} />
          <Field label="Adres" hint={`/terapi/${t.slug || "..."}`}>
            <input className={inputCls} value={t.slug} onChange={(e) => set({ slug: slugify(e.target.value) })} />
          </Field>
        </>
      )}
    />
  );
}

function Sections({ value, onChange }: { value: Therapy["sections"]; onChange: (v: Therapy["sections"]) => void }) {
  const upd = (i: number, patch: Partial<Therapy["sections"][number]>) => onChange(value.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-navy">Bölümler</span>
      <div className="grid gap-4">
        {value.map((s, i) => (
          <div key={i} className="rounded-xl bg-navy/[0.03] p-4">
            <div className="mb-3 flex gap-2">
              <input className={inputCls} value={s.title} placeholder="Bölüm başlığı" onChange={(e) => upd(i, { title: e.target.value })} />
              <Btn small variant="ghost" disabled={i === 0} onClick={() => onChange(move(value, i, -1))}>▲</Btn>
              <Btn small variant="ghost" disabled={i === value.length - 1} onClick={() => onChange(move(value, i, 1))}>▼</Btn>
              <Btn small variant="danger" onClick={() => onChange(value.filter((_, j) => j !== i))}>Sil</Btn>
            </div>
            <textarea className={`${inputCls} min-h-32`} placeholder="Paragraflar (aralarında boş satır bırakın)" value={fromParas(s.paragraphs)} onChange={(e) => upd(i, { paragraphs: toParas(e.target.value) })} />
            <textarea className={`${inputCls} mt-3 min-h-24`} placeholder="Madde listesi (isteğe bağlı, her satır bir madde)" value={(s.list ?? []).join("\n")} onChange={(e) => upd(i, { list: toLines(e.target.value) })} />
            <textarea className={`${inputCls} mt-3 min-h-20`} placeholder="Listeden sonra gelen kapanış metni (isteğe bağlı, paragraflar arasında boş satır)" value={fromParas(s.closing ?? [])} onChange={(e) => upd(i, { closing: toParas(e.target.value) })} />
          </div>
        ))}
      </div>
      <Btn small variant="ghost" className="mt-3" onClick={() => onChange([...value, { title: "", paragraphs: [] }])}>+ Bölüm ekle</Btn>
    </div>
  );
}

/* ───────── Çalışma alanları ───────── */
export function Specialties({ initial, texts }: { initial: SpecialtyRec[]; texts: Record<string, string> }) {
  const save = useSave();
  const groups = CATEGORIES.map((c) => ({ ...c, title: texts[`cat.${c.key}.title`] ?? c.title, lead: texts[`cat.${c.key}.lead`] ?? categories.find((x) => x.key === c.key)?.lead ?? "" }));
  return (
    <Collection<SpecialtyRec>
      field="specialties"
      initial={initial}
      addLabel="+ Yeni çalışma alanı"
      searchable
      groups={groups}
      onRenameGroup={(key, title, lead) => save({ texts: { [`cat.${key}.title`]: title, [`cat.${key}.lead`]: lead } })}
      groupOf={(s) => s.category}
      withGroup={(s, key) => ({ ...s, category: key as SpecialtyRec["category"] })}
      blank={() => ({ slug: "", title: "", category: "gunluk", summary: "", body: [], image: undefined })}
      title={(s) => s.title}
      previewPath={(s) => (s.slug ? `/calisma-alanlari/${s.slug}` : null)}
      form={(s, set) => (
        <>
          <Field label="Başlık">
            <input className={inputCls} value={s.title} onChange={(e) => set({ title: e.target.value, ...(s.slug === "" || s.slug === slugify(s.title) ? { slug: slugify(e.target.value) } : {}) })} />
          </Field>
          <Field label="Kategori">
            <select className={inputCls} value={s.category} onChange={(e) => set({ category: e.target.value as SpecialtyRec["category"] })}>
              {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.title}</option>)}
            </select>
          </Field>
          <Field label="Kısa özet" hint="Kartta ve arama sonuçlarında görünür.">
            <textarea className={`${inputCls} min-h-20`} value={s.summary ?? ""} onChange={(e) => set({ summary: e.target.value })} />
          </Field>
          <ImagePicker label="Görsel" value={s.image} onChange={(u) => set({ image: u })} />
          <Field label="Sayfa metni" hint="Paragrafları boş satırla ayırın. Ara başlık için ## kullanın. Metin boşsa sayfa “hazırlanıyor” görünür.">
            <textarea className={`${inputCls} min-h-[18rem]`} value={fromParas(s.body)} onChange={(e) => set({ body: toParas(e.target.value) })} />
          </Field>
          <Field label="Adres" hint={`/calisma-alanlari/${s.slug || "..."}`}>
            <input className={inputCls} value={s.slug} onChange={(e) => set({ slug: slugify(e.target.value) })} />
          </Field>
        </>
      )}
    />
  );
}

/* ───────── SSS ───────── */
export function Faqs({ initial }: { initial: FaqRec[] }) {
  return (
    <Collection<FaqRec>
      field="faqs"
      initial={initial}
      addLabel="+ Yeni soru"
      blank={() => ({ id: crypto.randomUUID(), q: "", a: "", home: false })}
      title={(f) => f.q}
      subtitle={(f) => (f.home ? "Ana sayfada da gösterilir" : "")}
      previewPath={() => "/sss"}
      form={(f, set) => (
        <>
          <Field label="Soru">
            <input className={inputCls} value={f.q} onChange={(e) => set({ q: e.target.value })} />
          </Field>
          <Field label="Cevap">
            <textarea className={`${inputCls} min-h-40`} value={f.a} onChange={(e) => set({ a: e.target.value })} />
          </Field>
          <label className="flex items-center gap-3 text-sm text-navy">
            <input type="checkbox" className="h-4 w-4 accent-[#7a5f30]" checked={!!f.home} onChange={(e) => set({ home: e.target.checked })} />
            Ana sayfadaki “Sık sorulan sorular” bölümünde de göster
          </label>
        </>
      )}
    />
  );
}

/* ───────── Eğitimler ───────── */
const ICONS: { key: EducationGroup["icon"]; title: string }[] = [
  { key: "egitim", title: "Eğitim" },
  { key: "sertifika", title: "Sertifika" },
  { key: "klinik", title: "Klinik deneyim" },
  { key: "gonullu", title: "Gönüllülük" },
];

export function Education({ initial }: { initial: EducationGroup[] }) {
  return (
    <Collection<EducationGroup>
      field="education"
      initial={initial}
      addLabel="+ Yeni grup"
      blank={() => ({ title: "", icon: "egitim", items: [] })}
      title={(g) => g.title}
      subtitle={(g) => `${g.items.length} kayıt`}
      previewPath={() => "/egitimler-ve-sertifikalar"}
      form={(g, set) => (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Grup başlığı">
              <input className={inputCls} value={g.title} onChange={(e) => set({ title: e.target.value })} />
            </Field>
            <Field label="Simge">
              <select className={inputCls} value={g.icon} onChange={(e) => set({ icon: e.target.value as EducationGroup["icon"] })}>
                {ICONS.map((i) => <option key={i.key} value={i.key}>{i.title}</option>)}
              </select>
            </Field>
          </div>
          <div>
            <span className="mb-1.5 block text-sm font-medium text-navy">Kayıtlar</span>
            <div className="grid gap-3">
              {g.items.map((it, i) => (
                <div key={i} className="grid gap-3 rounded-xl bg-navy/[0.03] p-3 sm:p-4">
                  <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                    <input className={inputCls} placeholder="Başlık" value={it.title} onChange={(e) => set({ items: g.items.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) })} />
                    <input className={inputCls} placeholder="Alt başlık (isteğe bağlı)" value={it.detail ?? ""} onChange={(e) => set({ items: g.items.map((x, j) => (j === i ? { ...x, detail: e.target.value } : x)) })} />
                    <Btn small variant="ghost" disabled={i === 0} onClick={() => set({ items: move(g.items, i, -1) })}>▲</Btn>
                    <Btn small variant="ghost" disabled={i === g.items.length - 1} onClick={() => set({ items: move(g.items, i, 1) })}>▼</Btn>
                    <Btn small variant="danger" onClick={() => set({ items: g.items.filter((_, j) => j !== i) })}>Sil</Btn>
                  </div>
                  <textarea className={`${inputCls} min-h-24`} placeholder="Açıklama (sağ sütundaki metin)" value={it.text ?? ""} onChange={(e) => set({ items: g.items.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)) })} />
                  <ImagePicker label="Sertifika görseli (isteğe bağlı)" aspect="aspect-[4/3]" value={it.image} onChange={(u) => set({ items: g.items.map((x, j) => (j === i ? { ...x, image: u } : x)) })} />
                </div>
              ))}
            </div>
            <Btn small variant="ghost" className="mt-3" onClick={() => set({ items: [...g.items, { title: "" }] })}>+ Kayıt ekle</Btn>
          </div>
        </>
      )}
    />
  );
}
