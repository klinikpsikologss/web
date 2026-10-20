"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Btn, inputCls, useConfirm, useToast } from "./kit";

type Msg = { id: string; name: string; phone: string; email: string; message: string; createdAt: string; read: boolean };

const initials = (n: string) =>
  n
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toLocaleUpperCase("tr"))
    .join("") || "?";

function ago(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return "şimdi";
  if (s < 3600) return `${Math.floor(s / 60)} dk önce`;
  if (s < 86400) return `${Math.floor(s / 3600)} sa önce`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)} gün önce`;
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
}
const full = (iso: string) => new Date(iso).toLocaleString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

/** 0532… → 90532… (WhatsApp bağlantısı için) */
const waNumber = (p: string) => {
  const d = p.replace(/\D/g, "");
  return d.startsWith("90") ? d : d.startsWith("0") ? "90" + d.slice(1) : d.length === 10 ? "90" + d : d;
};

const Ico = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

export function Messages({ initial }: { initial: Msg[] }) {
  const toast = useToast();
  const ask = useConfirm();
  const router = useRouter();
  const [list, setList] = useState(initial);
  const [sel, setSel] = useState<string | null>(initial[0]?.id ?? null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState<"hepsi" | "okunmamis">("hepsi");
  const [q, setQ] = useState("");

  async function act(id: string, action: "read" | "unread" | "delete") {
    const res = await fetch("/api/panel/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, action }) });
    if (!res.ok) return toast("İşlem yapılamadı.", "err");
    setList((l) => (action === "delete" ? l.filter((m) => m.id !== id) : l.map((m) => (m.id === id ? { ...m, read: action === "read" } : m))));
    window.dispatchEvent(new Event("panel:saved"));
    router.refresh();
  }

  const unread = list.filter((m) => !m.read).length;
  const shown = useMemo(() => {
    const t = q.toLocaleLowerCase("tr");
    return list.filter((m) => (filter === "hepsi" || !m.read) && (!t || `${m.name} ${m.message} ${m.email} ${m.phone}`.toLocaleLowerCase("tr").includes(t)));
  }, [list, filter, q]);
  const cur = list.find((m) => m.id === sel) ?? null;

  function pick(m: Msg) {
    setSel(m.id);
    setMobileOpen(true);
    if (!m.read) act(m.id, "read");
  }

  if (list.length === 0) {
    return (
      <div className="grid place-items-center rounded-[1.1rem] bg-paper/90 px-6 py-24 text-center shadow-[0_0_0_1px_rgba(15,39,71,0.07)]">
        <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-gold/30 text-gold-deep">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 5h16v11H8l-4 4V5z" />
          </svg>
        </span>
        <h2 className="text-3xl">Henüz mesaj yok</h2>
        <p className="mt-2 max-w-sm text-muted">İletişim formunu dolduran ziyaretçilerin mesajları burada görünecek.</p>
      </div>
    );
  }

  return (
    <div className="grid overflow-hidden rounded-[1.1rem] bg-paper/90 shadow-[0_0_0_1px_rgba(15,39,71,0.07),0_24px_50px_-36px_rgba(15,39,71,0.35)] lg:h-[calc(100dvh-15rem)] lg:min-h-[32rem] lg:grid-cols-[23rem_1fr]">
      {/* Liste */}
      <div className={`flex min-h-0 flex-col border-navy/10 lg:border-r ${mobileOpen ? "hidden lg:flex" : "flex"}`}>
        <div className="grid gap-3 border-b border-navy/10 p-4">
          <input className={`${inputCls} !py-2.5`} placeholder="Mesajlarda ara…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Mesajlarda ara" />
          <div className="flex gap-2">
            {(["hepsi", "okunmamis"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3.5 py-1.5 text-[0.82rem] transition-colors duration-300 ${filter === f ? "bg-navy text-ivory" : "bg-navy/[0.06] text-navy hover:bg-navy/10"}`}>
                {f === "hepsi" ? `Tümü ${list.length}` : `Okunmamış ${unread}`}
              </button>
            ))}
          </div>
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto max-lg:max-h-[70dvh]">
          {shown.length === 0 && <li className="px-5 py-10 text-center text-sm text-muted">Eşleşen mesaj yok.</li>}
          {shown.map((m) => {
            const active = m.id === sel;
            return (
              <li key={m.id}>
                <button
                  onClick={() => pick(m)}
                  aria-current={active ? "true" : undefined}
                  className={`relative flex w-full gap-3 border-b border-navy/[0.07] px-4 py-4 text-left transition-colors duration-300 ${active ? "bg-gold/20" : "hover:bg-navy/[0.035]"}`}
                >
                  {active && <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gold-deep" />}
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-medium ${m.read ? "bg-navy/[0.08] text-navy" : "bg-navy text-gold"}`}>{initials(m.name)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className={`truncate ${m.read ? "text-navy" : "font-semibold text-navy"}`}>{m.name}</span>
                      <span className="shrink-0 text-xs text-muted">{ago(m.createdAt)}</span>
                    </span>
                    <span className="mt-0.5 flex items-center gap-2">
                      <span className={`line-clamp-2 flex-1 text-[0.85rem] leading-snug ${m.read ? "text-muted" : "text-ink"}`}>{m.message}</span>
                      {!m.read && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold-deep" aria-label="Okunmadı" />}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Ayrıntı */}
      <div className={`min-h-0 flex-col overflow-y-auto ${mobileOpen ? "flex" : "hidden lg:flex"}`}>
        {cur ? (
          <article key={cur.id} className="flex flex-1 flex-col p-5 sm:p-8" style={{ animation: "lb-fade 400ms var(--ease-soft)" }}>
            <button onClick={() => setMobileOpen(false)} className="mb-4 self-start text-sm text-muted hover:text-navy lg:hidden">
              ← Mesajlara dön
            </button>
            <header className="flex flex-wrap items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-lg font-medium text-gold">{initials(cur.name)}</span>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-3xl leading-tight">{cur.name}</h2>
                <p className="mt-1 text-sm text-muted">{full(cur.createdAt)}</p>
              </div>
              <div className="flex gap-2">
                <Btn small variant="ghost" onClick={() => act(cur.id, cur.read ? "unread" : "read")}>
                  {cur.read ? "Okunmadı yap" : "Okundu yap"}
                </Btn>
                <Btn
                  small
                  variant="danger"
                  onClick={async () => {
                    if (!(await ask({ title: "Mesaj silinsin mi?", text: `${cur.name} adlı kişinin mesajı kalıcı olarak silinecek. Bu işlem geri alınamaz.`, confirmLabel: "Evet, sil", danger: true }))) return;
                    const next = shown.find((m) => m.id !== cur.id)?.id ?? null;
                    act(cur.id, "delete");
                    setSel(next);
                    setMobileOpen(false);
                  }}
                >
                  Sil
                </Btn>
              </div>
            </header>

            <dl className="mt-6 grid gap-3 rounded-xl bg-navy/[0.04] p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Telefon</dt>
                <dd className="mt-0.5 break-all text-navy">{cur.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">E-posta</dt>
                <dd className="mt-0.5 break-all text-navy">{cur.email || "—"}</dd>
              </div>
            </dl>

            <div className="mt-6 flex-1">
              <p className="mb-2 text-xs uppercase tracking-wider text-muted">Mesaj</p>
              <p className="whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-ivory px-5 py-4 text-[1.02rem] leading-relaxed text-ink shadow-[inset_0_0_0_1px_rgba(15,39,71,0.08)]">{cur.message}</p>
            </div>

            <footer className="mt-8 flex flex-wrap gap-2.5 border-t border-navy/10 pt-5">
              {cur.phone && (
                <a href={`tel:${cur.phone}`} className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-ivory transition-colors duration-500 hover:bg-navy-soft">
                  <Ico d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /> Ara
                </a>
              )}
              {cur.phone && (
                <a href={`https://wa.me/${waNumber(cur.phone)}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25805a] px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-500 hover:opacity-90">
                  <Ico d="M4 20l1.3-4.2A8 8 0 118 19l-4 1z" /> WhatsApp
                </a>
              )}
              {cur.email && (
                <a href={`mailto:${cur.email}`} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-navy transition-colors duration-500 hover:bg-[#e6d6b6]">
                  <Ico d="M3 6h18v12H3V6zm0 1l9 6 9-6" /> E-posta yaz
                </a>
              )}
            </footer>
          </article>
        ) : (
          <div className="grid flex-1 place-items-center p-10 text-center text-muted">Okumak için soldan bir mesaj seçin.</div>
        )}
      </div>
    </div>
  );
}
