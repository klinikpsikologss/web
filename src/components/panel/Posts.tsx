"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/posts";
import type { PostRec } from "@/lib/cms/content";
import { Badge, Btn, Card, Empty, Field, ImagePicker, RowMenu, fmtDate, fromParas, inputCls, toParas, useConfirm, useSave } from "./kit";

const blank = (): PostRec => ({ id: crypto.randomUUID(), slug: "", title: "", category: "", excerpt: "", body: [], status: "taslak", updatedAt: new Date().toISOString() });

export function Posts({ initial }: { initial: PostRec[] }) {
  const save = useSave();
  const ask = useConfirm();
  const router = useRouter();
  const [list, setList] = useState(initial);
  const [editing, setEditing] = useState<PostRec | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [text, setText] = useState("");
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);

  const categories = Array.from(new Set(list.map((p) => p.category).filter(Boolean)));

  function open(p: PostRec, fresh = false) {
    setEditing({ ...p });
    setText(fromParas(p.body));
    setIsNew(fresh);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function commit(next: PostRec[], msg?: string) {
    setBusy(true);
    const ok = await save({ posts: next }, msg);
    setBusy(false);
    if (ok) {
      setList(next);
      router.refresh();
    }
    return ok;
  }

  async function submit() {
    if (!editing) return;
    const rec: PostRec = { ...editing, body: toParas(text), slug: slugify(editing.slug || editing.title), updatedAt: new Date().toISOString() };
    const next = isNew ? [rec, ...list] : list.map((p) => (p.id === rec.id ? rec : p));
    if (await commit(next)) {
      setEditing(null);
    }
  }

  async function remove(p: PostRec) {
    if (!(await ask({ title: "Yazı silinsin mi?", text: `“${p.title}” silinecek. Değişiklik taslağa yazılır, Yayınla’ya basana kadar sitede kalır.`, confirmLabel: "Evet, sil", danger: true }))) return;
    await commit(list.filter((x) => x.id !== p.id), "Yazı silindi (taslakta).");
    setEditing(null);
  }

  if (editing) {
    const set = <K extends keyof PostRec>(k: K, v: PostRec[K]) => setEditing({ ...editing, [k]: v });
    return (
      <Card>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setEditing(null)} className="text-sm text-muted hover:text-navy">← Yazılara dön</button>
          <div className="flex gap-2">
            {!isNew && editing.slug && (
              <a href={`/api/panel/visit?mode=preview&to=${encodeURIComponent("/blog/" + editing.slug)}`} target="_blank" rel="noopener" className="inline-flex items-center rounded-full px-4 py-2 text-sm text-navy shadow-[inset_0_0_0_1px_rgba(15,39,71,0.2)] hover:bg-navy/[0.05]">
                Önizle
              </a>
            )}
            {!isNew && <Btn variant="danger" small onClick={() => remove(editing)}>Sil</Btn>}
          </div>
        </div>
        <div className="grid gap-5">
          <Field label="Başlık">
            <input className={inputCls} value={editing.title} onChange={(e) => set("title", e.target.value)} placeholder="Yazının başlığı" />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Kategori" hint="Mevcut bir kategoriyi seçebilir ya da yenisini yazabilirsiniz.">
              <input className={inputCls} list="cats" value={editing.category} onChange={(e) => set("category", e.target.value)} placeholder="Örn. Terapi süreci" />
              <datalist id="cats">{categories.map((c) => <option key={c} value={c} />)}</datalist>
            </Field>
            <Field label="Durum" hint="Taslaklar sitede görünmez.">
              <select className={inputCls} value={editing.status} onChange={(e) => set("status", e.target.value as PostRec["status"])}>
                <option value="yayinda">Yayında</option>
                <option value="taslak">Taslak</option>
              </select>
            </Field>
          </div>
          <Field label="Kısa özet" hint="Blog listesinde ve arama sonuçlarında görünür.">
            <textarea className={`${inputCls} min-h-24`} value={editing.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} />
          </Field>
          <ImagePicker label="Kapak görseli" value={editing.cover} onChange={(u) => set("cover", u)} />
          <Field label="Yazı metni" hint="Paragrafları boş satırla ayırın. Ara başlık için satırın başına ## koyun (örn. ## İlk seans nasıl geçer?).">
            <textarea className={`${inputCls} min-h-[22rem] font-[inherit] leading-relaxed`} value={text} onChange={(e) => setText(e.target.value)} />
          </Field>
          <Field label="Adres (isteğe bağlı)" hint={`Boş bırakırsanız başlıktan üretilir: /blog/${slugify(editing.slug || editing.title) || "..."}`}>
            <input className={inputCls} value={editing.slug} onChange={(e) => set("slug", e.target.value)} />
          </Field>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Btn onClick={submit} disabled={busy || !editing.title.trim()}>{busy ? "Kaydediliyor…" : "Taslağa kaydet"}</Btn>
          <Btn variant="ghost" onClick={() => setEditing(null)}>Vazgeç</Btn>
        </div>
      </Card>
    );
  }

  const shown = list.filter((p) => !q || p.title.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")));
  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input className={`${inputCls} max-w-xs`} placeholder="Yazılarda ara…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Yazılarda ara" />
        <Btn variant="gold" className="ml-auto" onClick={() => open(blank(), true)}>+ Yeni yazı</Btn>
      </div>
      {shown.length === 0 ? (
        <Empty>Yazı bulunamadı.</Empty>
      ) : (
        <ul className="grid gap-3">
          {shown.map((p) => (
            <Card as="li" key={p.id} className="!p-0">
              <div className="flex items-center gap-2 pr-3">
              <button onClick={() => open(p)} className="flex min-w-0 flex-1 items-center gap-4 p-4 text-left sm:p-5">
                {p.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover} alt="" className="hidden h-16 w-24 shrink-0 rounded-lg object-cover sm:block" />
                ) : (
                  <span className="hidden h-16 w-24 shrink-0 rounded-lg bg-navy/[0.06] sm:block" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-xl text-navy">{p.title}</span>
                  <span className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <Badge tone={p.status === "yayinda" ? "green" : "gray"}>{p.status === "yayinda" ? "Yayında" : "Taslak"}</Badge>
                    <span>{p.category}</span>
                    <span>·</span>
                    <span>{fmtDate(p.updatedAt)}</span>
                  </span>
                </span>
              </button>
              <RowMenu onEdit={() => open(p)} onDelete={() => remove(p)} />
              </div>
            </Card>
          ))}
        </ul>
      )}
    </>
  );
}
