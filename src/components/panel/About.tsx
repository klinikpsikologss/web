"use client";

import { useState } from "react";
import type { AboutContent } from "@/lib/cms/content";
import type { ActivityGroup } from "@/lib/about";
import { Btn, Card, Field, inputCls, move, useSave } from "./kit";

/** Hakkımda sayfası: mesleki üyelikler ve bilimsel/mesleki etkinlik listeleri. */
export function AboutEditor({ initial }: { initial: AboutContent }) {
  const save = useSave();
  const [about, setAbout] = useState(initial);
  const { memberships, activities } = about;

  const setM = (m: AboutContent["memberships"]) => setAbout({ ...about, memberships: m });
  const setA = (a: ActivityGroup[]) => setAbout({ ...about, activities: a });
  const updGroup = (gi: number, patch: Partial<ActivityGroup>) => setA(activities.map((g, i) => (i === gi ? { ...g, ...patch } : g)));

  return (
    <div className="grid gap-6">
      <Card>
        <h2 className="mb-1 text-2xl">Mesleki üyelikler</h2>
        <p className="mb-5 text-sm text-muted">Hakkımda sayfasındaki lacivert üyelik bandında görünür.</p>
        <div className="grid gap-3">
          {memberships.map((m, i) => (
            <div key={i} className="flex flex-wrap gap-2 sm:flex-nowrap">
              <input className={inputCls} placeholder="Kurum adı" value={m.name} onChange={(e) => setM(memberships.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
              <input className={`${inputCls} sm:max-w-48`} placeholder="Görev (ör. Üye)" value={m.role} onChange={(e) => setM(memberships.map((x, j) => (j === i ? { ...x, role: e.target.value } : x)))} />
              <Btn small variant="ghost" disabled={i === 0} onClick={() => setM(move(memberships, i, -1))}>▲</Btn>
              <Btn small variant="ghost" disabled={i === memberships.length - 1} onClick={() => setM(move(memberships, i, 1))}>▼</Btn>
              <Btn small variant="danger" onClick={() => setM(memberships.filter((_, j) => j !== i))}>Sil</Btn>
            </div>
          ))}
        </div>
        <Btn small variant="ghost" className="mt-3" onClick={() => setM([...memberships, { name: "", role: "Üye" }])}>+ Üyelik ekle</Btn>
      </Card>

      <Card>
        <h2 className="mb-1 text-2xl">Bilimsel ve mesleki etkinlikler</h2>
        <p className="mb-5 text-sm text-muted">Her başlık sayfada bir açılır bölümdür. Sayfada ilk 5 kayıt görünür, kalanı “Tüm etkinlikleri gör” ile açılır. Yeni kayıtları listenin başına eklemek en yeni etkinliği üstte gösterir.</p>
        <div className="grid gap-4">
          {activities.map((g, gi) => (
            <details key={gi} className="rounded-xl bg-navy/[0.03] p-4" open={gi === 0}>
              <summary className="cursor-pointer font-display text-xl text-navy">
                {g.title || "Başlıksız bölüm"} <span className="text-sm text-muted">· {g.items.length} kayıt</span>
              </summary>
              <div className="mt-4 grid gap-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Bölüm başlığı"><input className={inputCls} value={g.title} onChange={(e) => updGroup(gi, { title: e.target.value })} /></Field>
                  <Field label="Kısa açıklama"><input className={inputCls} value={g.lead} onChange={(e) => updGroup(gi, { lead: e.target.value })} /></Field>
                </div>
                <div className="grid gap-3">
                  {g.items.map((it, ii) => {
                    const upd = (patch: Partial<ActivityGroup["items"][number]>) => updGroup(gi, { items: g.items.map((x, j) => (j === ii ? { ...x, ...patch } : x)) });
                    return (
                      <div key={ii} className="grid gap-2 rounded-lg bg-paper p-3">
                        <div className="flex gap-2">
                          <input className={inputCls} placeholder="Başlık" value={it.title} onChange={(e) => upd({ title: e.target.value })} />
                          <Btn small variant="ghost" disabled={ii === 0} onClick={() => updGroup(gi, { items: move(g.items, ii, -1) })}>▲</Btn>
                          <Btn small variant="ghost" disabled={ii === g.items.length - 1} onClick={() => updGroup(gi, { items: move(g.items, ii, 1) })}>▼</Btn>
                          <Btn small variant="danger" onClick={() => updGroup(gi, { items: g.items.filter((_, j) => j !== ii) })}>Sil</Btn>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-[1fr_12rem]">
                          <textarea className={`${inputCls} min-h-16`} placeholder="Kurum / etkinlik adı" value={it.place} onChange={(e) => upd({ place: e.target.value })} />
                          <input className={inputCls} placeholder="Tarih (ör. 9 Mart 2026)" value={it.date} onChange={(e) => upd({ date: e.target.value })} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Btn small variant="ghost" onClick={() => updGroup(gi, { items: [{ title: "", place: "", date: "" }, ...g.items] })}>+ Başa kayıt ekle</Btn>
                  <Btn small variant="danger" onClick={() => setA(activities.filter((_, i) => i !== gi))}>Bu bölümü sil</Btn>
                  <Btn small variant="ghost" disabled={gi === 0} onClick={() => setA(move(activities, gi, -1))}>Bölümü yukarı</Btn>
                  <Btn small variant="ghost" disabled={gi === activities.length - 1} onClick={() => setA(move(activities, gi, 1))}>Bölümü aşağı</Btn>
                </div>
              </div>
            </details>
          ))}
        </div>
        <Btn small variant="ghost" className="mt-3" onClick={() => setA([...activities, { title: "", lead: "", items: [] }])}>+ Yeni bölüm</Btn>
      </Card>

      <div>
        <Btn onClick={() => save({ about })}>Taslağa kaydet</Btn>
        <p className="mt-2 text-xs text-muted">Hakkımda yazısı ve fotoğrafı için “Siteyi özelleştir” modunda sayfa üzerinde doğrudan düzenleyebilirsiniz.</p>
      </div>
    </div>
  );
}
