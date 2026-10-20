"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Btn, Card, Empty, RowMenu, dragProps, inputCls, reorder, useConfirm, useSave } from "./kit";

/**
 * Sıralanabilir kayıt listesi + tek kayıt düzenleme formu.
 * `field` içerik anahtarıdır (örn. "therapies"); tüm liste taslağa yazılır.
 */
export function Collection<T extends object>({
  field,
  initial,
  blank,
  title,
  subtitle,
  form,
  addLabel,
  previewPath,
  reorder: canReorder = true,
  searchable = false,
  groups,
  groupOf,
  withGroup,
  onRenameGroup,
}: {
  field: string;
  initial: T[];
  blank: () => T;
  title: (item: T) => string;
  subtitle?: (item: T) => string;
  form: (item: T, set: (patch: Partial<T>) => void) => ReactNode;
  addLabel: string;
  previewPath?: (item: T) => string | null;
  reorder?: boolean;
  searchable?: boolean;
  /** Gruplu liste: satırlar gruplara ayrılır; gruplar arası sürükleme grubu değiştirir. */
  groups?: { key: string; title: string; lead?: string }[];
  groupOf?: (item: T) => string;
  withGroup?: (item: T, key: string) => T;
  /** Grup başlığını değiştirir (verilirse başlığın yanında düzenle düğmesi çıkar). */
  onRenameGroup?: (key: string, title: string, lead: string) => Promise<boolean>;
}) {
  const save = useSave();
  const ask = useConfirm();
  const router = useRouter();
  const [list, setList] = useState(initial);
  const [editing, setEditing] = useState<{ item: T; index: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");
  const [renaming, setRenaming] = useState<{ key: string; value: string; lead: string } | null>(null);
  const [titles, setTitles] = useState<Record<string, { title: string; lead: string }>>({});
  const [drag, setDrag] = useState<{ from: number | null; over: number | null }>({ from: null, over: null });

  async function commit(next: T[], msg?: string) {
    setBusy(true);
    const ok = await save({ [field]: next }, msg);
    setBusy(false);
    if (ok) {
      setList(next);
      router.refresh();
    }
    return ok;
  }

  if (editing) {
    const set = (patch: Partial<T>) => setEditing({ ...editing, item: { ...editing.item, ...patch } });
    const isNew = editing.index === -1;
    const prev = previewPath?.(editing.item);
    return (
      <Card>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setEditing(null)} className="text-sm text-muted hover:text-navy">← Listeye dön</button>
          <div className="flex gap-2">
            {!isNew && prev && (
              <a href={`/api/panel/visit?mode=preview&to=${encodeURIComponent(prev)}`} target="_blank" rel="noopener" className="inline-flex items-center rounded-full px-4 py-2 text-sm text-navy shadow-[inset_0_0_0_1px_rgba(15,39,71,0.2)] hover:bg-navy/[0.05]">
                Önizle
              </a>
            )}
            {!isNew && (
              <Btn
                variant="danger"
                small
                onClick={async () => {
                  if (!(await ask({ title: "Silinsin mi?", text: `“${title(editing.item)}” silinecek. Değişiklik taslağa yazılır, Yayınla’ya basana kadar sitede kalır.`, confirmLabel: "Evet, sil", danger: true }))) return;
                  if (await commit(list.filter((_, i) => i !== editing.index), "Silindi (taslakta).")) setEditing(null);
                }}
              >
                Sil
              </Btn>
            )}
          </div>
        </div>
        <div className="grid gap-5">{form(editing.item, set)}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Btn
            disabled={busy || !title(editing.item).trim()}
            onClick={async () => {
              const next = isNew ? [...list, editing.item] : list.map((x, i) => (i === editing.index ? editing.item : x));
              if (await commit(next)) setEditing(null);
            }}
          >
            {busy ? "Kaydediliyor…" : "Taslağa kaydet"}
          </Btn>
          <Btn variant="ghost" onClick={() => setEditing(null)}>Vazgeç</Btn>
        </div>
      </Card>
    );
  }

  const rows = list.map((item, index) => ({ item, index })).filter(({ item }) => !q || title(item).toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")));
  const dragOn = canReorder && !q;

  /** from sırasındaki kaydı to konumuna taşır; gruplu listede hedef grubun anahtarını alır. */
  function moveTo(from: number, to: number, groupKey?: string) {
    const item = list[from];
    const moved = groups && groupOf && withGroup && groupKey ? withGroup(item, groupKey) : item;
    const rest = list.filter((_, i) => i !== from);
    const at = to > from ? to - 1 : to;
    rest.splice(Math.max(0, Math.min(rest.length, at)), 0, moved);
    return commit(rest, "Sıra kaydedildi.");
  }

  const renderRow = ({ item, index }: { item: T; index: number }) => (
    <Card
      as="li"
      key={index}
      className={`!p-0 transition-opacity ${drag.from === index ? "opacity-40" : ""} ${drag.over === index && drag.from !== null && drag.from !== index ? "!shadow-[0_0_0_2px_rgba(183,155,98,0.9)]" : ""}`}
      {...(dragOn
        ? dragProps(index, drag, setDrag, (f, t) => {
            if (groups && groupOf) return moveTo(f, t, groupOf(list[t]));
            return commit(reorder(list, f, t), "Sıra kaydedildi.");
          })
        : {})}
    >
      <div className="flex items-center gap-2 p-3 sm:p-4">
        {dragOn && <span className="cursor-grab select-none px-2 text-xl leading-none text-muted active:cursor-grabbing" title="Sıralamak için sürükleyin" aria-hidden>⠿</span>}
        <button onClick={() => setEditing({ item: structuredClone(item), index })} className="flex min-w-0 flex-1 items-center gap-3 px-2 py-1 text-left">
          <span className="min-w-0 flex-1">
            <span className="block truncate font-display text-xl text-navy">{title(item)}</span>
            {subtitle && <span className="block truncate text-sm text-muted">{subtitle(item)}</span>}
          </span>
        </button>
        <RowMenu
          onEdit={() => setEditing({ item: structuredClone(item), index })}
          onDelete={async () => {
            if (await ask({ title: "Silinsin mi?", text: `“${title(item)}” silinecek. Değişiklik taslağa yazılır, Yayınla’ya basana kadar sitede kalır.`, confirmLabel: "Evet, sil", danger: true })) commit(list.filter((_, i) => i !== index), "Silindi (taslakta).");
          }}
        />
      </div>
    </Card>
  );

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        {searchable && <input className={`${inputCls} max-w-xs`} placeholder="Ara…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Ara" />}
        <Btn variant="gold" className="ml-auto" onClick={() => setEditing({ item: blank(), index: -1 })}>{addLabel}</Btn>
      </div>
      {rows.length === 0 ? (
        <Empty>Kayıt bulunamadı.</Empty>
      ) : groups && groupOf ? (
        <div className="grid gap-8">
          {groups.map((g) => {
            const inGroup = rows.filter((r) => groupOf(r.item) === g.key);
            if (!inGroup.length && q) return null;
            const lastIndex = list.reduce((acc, it, i) => (groupOf(it) === g.key ? i : acc), -1);
            return (
              <section key={g.key} aria-label={g.title}>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  {renaming?.key === g.key ? (
                    <form
                      className="grid w-full max-w-xl gap-3"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const v = renaming.value.trim();
                        if (v && onRenameGroup && (await onRenameGroup(g.key, v, renaming.lead.trim()))) setTitles((t) => ({ ...t, [g.key]: { title: v, lead: renaming.lead.trim() } }));
                        setRenaming(null);
                      }}
                    >
                      <input autoFocus className={`${inputCls} !py-2`} value={renaming.value} onChange={(e) => setRenaming({ ...renaming, value: e.target.value })} aria-label="Kategori adı" placeholder="Kategori adı" />
                      <textarea className={`${inputCls} min-h-20`} value={renaming.lead} onChange={(e) => setRenaming({ ...renaming, lead: e.target.value })} aria-label="Kategori açıklaması" placeholder="Kategori açıklaması" />
                      <span className="flex gap-2">
                        <Btn small type="submit" onClick={undefined}>Kaydet</Btn>
                        <Btn small variant="ghost" onClick={() => setRenaming(null)}>Vazgeç</Btn>
                      </span>
                    </form>
                  ) : (
                    <>
                      <h2 className="text-2xl">{titles[g.key]?.title ?? g.title}</h2>
                      <span className="rounded-full bg-navy/[0.07] px-2.5 py-0.5 font-sans text-xs font-medium text-muted">{inGroup.length}</span>
                      {onRenameGroup && (
                        <button type="button" onClick={() => setRenaming({ key: g.key, value: titles[g.key]?.title ?? g.title, lead: titles[g.key]?.lead ?? g.lead ?? "" })} className="rounded-full px-3 py-1 text-xs text-gold-deep underline underline-offset-4 hover:text-navy">
                          Kategoriyi düzenle
                        </button>
                      )}
                    </>
                  )}
                </div>
                <ul className="grid gap-3">{inGroup.map(renderRow)}</ul>
                {dragOn && (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (drag.from !== null) moveTo(drag.from, lastIndex + 1, g.key);
                      setDrag({ from: null, over: null });
                    }}
                    className={`mt-3 rounded-xl border border-dashed border-navy/20 px-4 py-3 text-center text-xs text-muted ${drag.from !== null ? "bg-gold/15" : ""}`}
                  >
                    {inGroup.length ? "Buraya bırakırsanız grubun sonuna eklenir" : "Bu grupta konu yok. Buraya sürükleyip bırakabilirsiniz"}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <ul className="grid gap-3">{rows.map(renderRow)}</ul>
      )}
    </>
  );
}
