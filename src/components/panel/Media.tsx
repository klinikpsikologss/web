"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Btn, Card, Empty, ImagePicker, dragProps, reorder, useConfirm, useSave, useToast } from "./kit";

type Item = { url: string; name: string; width: number; height: number; size: number; createdAt: string };

export function MediaLibrary({ initial }: { initial: Item[] }) {
  const toast = useToast();
  const ask = useConfirm();
  const [list, setList] = useState(initial);
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("file", f));
    const r = await fetch("/api/panel/upload", { method: "POST", body: fd }).then((x) => x.json()).catch(() => ({ error: "Yüklenemedi." }));
    setBusy(false);
    if (r.error) return toast(r.error, "err");
    setList((l) => [...r.items, ...l]);
    toast(`${r.items.length} görsel yüklendi.`);
  }

  async function remove(m: Item) {
    if (!(await ask({ title: "Görsel silinsin mi?", text: "Görsel kalıcı olarak silinir. Sitede kullanılıyorsa görünmez olur.", confirmLabel: "Evet, sil", danger: true }))) return;
    const r = await fetch(`/api/panel/upload?url=${encodeURIComponent(m.url)}`, { method: "DELETE" });
    if (!r.ok) return toast("Silinemedi.", "err");
    setList((l) => l.filter((x) => x.url !== m.url));
  }

  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-muted">{list.length} görsel · Yüklenenler otomatik olarak optimize edilir (WebP, en fazla 2600 px).</p>
        <Btn variant="gold" disabled={busy} onClick={() => input.current?.click()}>{busy ? "Yükleniyor…" : "+ Görsel yükle"}</Btn>
        <input ref={input} type="file" multiple hidden accept="image/jpeg,image/png,image/webp,image/avif" onChange={(e) => (upload(e.target.files), (e.target.value = ""))} />
      </div>
      {list.length === 0 ? (
        <Empty>Henüz görsel yüklenmedi.</Empty>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((m) => (
            <Card as="li" key={m.url} className="!p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" loading="lazy" />
              <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-2">
                <span className="min-w-0 text-xs text-muted">
                  <span className="block truncate text-ink">{m.name}</span>
                  {m.width}×{m.height} · {Math.round(m.size / 1024)} KB
                </span>
                <span className="flex shrink-0 gap-1">
                  <button className="rounded-full px-2 py-1 text-xs text-navy hover:bg-navy/10" onClick={() => (navigator.clipboard?.writeText(location.origin + m.url), toast("Adres kopyalandı."))}>Kopyala</button>
                  <button className="rounded-full px-2 py-1 text-xs text-[#a2332e] hover:bg-[#a2332e]/10" onClick={() => remove(m)}>Sil</button>
                </span>
              </div>
            </Card>
          ))}
        </ul>
      )}
    </>
  );
}

export function GalleryEditor({ initial, isDefault, field = "gallery", addLabel = "Galeriye görsel ekle", note }: { initial: string[]; isDefault: boolean; field?: "gallery" | "certs" | "events"; addLabel?: string; note?: string }) {
  const save = useSave();
  const ask = useConfirm();
  const router = useRouter();
  const [list, setList] = useState(initial);
  const [custom, setCustom] = useState(!isDefault);
  const [adder, setAdder] = useState(0);
  const [drag, setDrag] = useState<{ from: number | null; over: number | null }>({ from: null, over: null });

  async function commit(next: string[] | null, msg?: string) {
    if (await save({ [field]: next }, msg)) {
      if (next) setList(next);
      setCustom(next !== null);
      router.refresh();
    }
  }

  const edit = (next: string[]) => {
    setList(next);
    setCustom(true);
  };

  return (
    <>
      {!custom && <p className="mb-5 rounded-xl bg-gold/25 px-5 py-3 text-sm text-[#5a4521]">{note ?? "Mevcut klinik fotoğraflarınız aşağıda listeleniyor. Yeni görsel eklediğinizde bunlar silinmez, yenisi listenin sonuna eklenir; istediğiniz fotoğrafı kaldırabilir, sürükleyerek sıralayabilirsiniz."}</p>}
      <ul className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((u, i) => (
          <Card as="li" key={u + i} className={`!p-2 cursor-grab ${drag.from === i ? "opacity-40" : ""} ${drag.over === i && drag.from !== null && drag.from !== i ? "!shadow-[0_0_0_2px_rgba(183,155,98,0.9)]" : ""}`} {...dragProps(i, drag, setDrag, (f, t) => edit(reorder(list, f, t)))}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u} alt="" draggable={false} className="aspect-[4/3] w-full rounded-xl object-cover" />
            <div className="flex items-center justify-between gap-1 px-1 pt-2">
              <span className="text-xs text-muted">⠿ Sürükleyerek sıralayın</span>
              <Btn small variant="danger" onClick={() => edit(list.filter((_, j) => j !== i))}>Kaldır</Btn>
            </div>
          </Card>
        ))}
      </ul>
      <Card className="mb-6">
        <ImagePicker key={adder} label={addLabel} aspect="aspect-[4/3]" onChange={(u) => u && (edit([...list, u]), setAdder((n) => n + 1))} />
      </Card>
      <div className="flex flex-wrap gap-3">
        <Btn onClick={() => commit(list)}>Taslağa kaydet</Btn>
        {custom && <Btn variant="ghost" onClick={async () => {
          if (await ask({ title: "Varsayılana dönülsün mü?", text: "Eklediğiniz görseller listeden çıkar ve klasördeki varsayılan görseller kullanılır.", confirmLabel: "Evet, dön" })) await commit(null, "Varsayılan galeriye dönüldü.");
        }}>Varsayılana dön</Btn>}
      </div>
    </>
  );
}
