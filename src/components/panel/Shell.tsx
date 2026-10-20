"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Btn, Modal, fmtDate, useToast } from "./kit";

type Meta = { dirty: boolean; updatedAt: string | null; publishedAt: string | null };

const NAV: { href: string; label: string; icon: string; group?: string }[] = [
  { href: "/panel/ozet", label: "Özet", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z", group: "Genel" },
  { href: "/panel/duzenle", label: "Siteyi özelleştir", icon: "M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" },
  { href: "/panel/mesajlar", label: "Mesajlar", icon: "M4 4h16v12H5.2L4 17.2V4zM8 9h8M8 12h5", group: "İçerik" },
  { href: "/panel/yazilar", label: "Blog yazıları", icon: "M6 3h9l4 4v14H6V3zM14 3v5h5M9 12h7M9 16h7" },
  { href: "/panel/hizmetler", label: "Hizmetler", icon: "M12 21s-7-4.6-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.4-7 10-7 10z" },
  { href: "/panel/calisma-alanlari", label: "Çalışma alanları", icon: "M4 6h16M4 12h16M4 18h10" },
  { href: "/panel/sss", label: "Sık sorulan sorular", icon: "M9.5 9a2.5 2.5 0 115 0c0 1.7-2.5 2-2.5 4M12 17h.01M12 3a9 9 0 100 18 9 9 0 000-18z" },
  { href: "/panel/egitimler", label: "Eğitimler", icon: "M2 9l10-5 10 5-10 5L2 9zm5 3v5c0 1 2.2 2 5 2s5-1 5-2v-5" },
  { href: "/panel/hakkimda", label: "Hakkımda", icon: "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0" },
  { href: "/panel/sertifikalar", label: "Sertifika görselleri", icon: "M5 4h14v12H5V4zm4 12l-1 5 4-2 4 2-1-5M9 9h6" },
  { href: "/panel/etkinlikler", label: "Etkinlik fotoğrafları", icon: "M3 5h18v14H3V5zm0 11l5-5 4 4 3-3 6 6M9 9.5h.01" },
  { href: "/panel/galeri", label: "Klinik galerisi", icon: "M3 5h18v14H3V5zm0 11l5-5 4 4 3-3 6 6M9 9.5h.01" },
  { href: "/panel/medya", label: "Medya", icon: "M4 7h4l2-2h4l2 2h4v12H4V7zm8 9.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" },
  { href: "/panel/ayarlar", label: "Ayarlar", icon: "M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1M15 4v4M9 10v4M17 16v4", group: "Sistem" },
];

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export function Shell({ initialMeta, initialUnread, logo, children }: { initialMeta: Meta; initialUnread: number; logo: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const [meta, setMeta] = useState(initialMeta);
  const [unread, setUnread] = useState(initialUnread);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState<null | "publish" | "discard">(null);
  const [busy, setBusy] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("panel_nav") === "1");
    } catch {}
  }, []);
  const toggle = () => {
    setAnim(true);
    setCollapsed((c) => {
      try {
        localStorage.setItem("panel_nav", c ? "0" : "1");
      } catch {}
      return !c;
    });
  };

  const refresh = useCallback(async () => {
    const r = await fetch("/api/panel/status").then((x) => x.json()).catch(() => null);
    if (r?.meta) {
      setMeta(r.meta);
      setUnread(r.unread ?? 0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("panel:saved", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("panel:saved", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);
  useEffect(() => setOpen(false), [pathname]);

  async function act(kind: "publish" | "discard") {
    setBusy(true);
    const res = await fetch("/api/panel/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kind === "discard" ? { action: "discard" } : { label: "Panelden yayınlandı" }),
    }).catch(() => null);
    setBusy(false);
    setConfirm(null);
    if (!res?.ok) return toast("İşlem tamamlanamadı.", "err");
    toast(kind === "publish" ? "Değişiklikler yayında." : "Taslak silindi, yayındaki sürüme dönüldü.");
    await refresh();
    router.refresh();
  }

  async function logout() {
    await fetch("/api/panel/logout", { method: "POST" });
    router.replace("/panel");
    router.refresh();
  }

  let lastGroup = "";
  return (
    <div className={`min-h-dvh bg-ivory ${anim ? "lg:transition-[grid-template-columns] lg:duration-500 [transition-timing-function:var(--ease-soft)]" : ""} lg:grid ${collapsed ? "lg:grid-cols-[4.75rem_1fr]" : "lg:grid-cols-[17rem_1fr]"}`}>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[17rem] flex-col lg:w-full overflow-x-hidden overflow-y-auto bg-navy px-4 pb-6 pt-6 text-ivory transition-transform duration-500 [transition-timing-function:var(--ease-soft)] lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className={`mb-6 flex items-center justify-between`}>
          <Link href="/panel/ozet" className={`block overflow-hidden whitespace-nowrap px-2 ${anim ? "lg:transition-[opacity,max-width,max-height,margin] lg:duration-500 [transition-timing-function:var(--ease-soft)]" : ""} ${collapsed ? "lg:max-w-0 lg:px-0 lg:opacity-0" : "lg:max-w-[14rem]"}`}>
            {logo}
          </Link>
          <button onClick={toggle} aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"} title={collapsed ? "Menüyü genişlet" : "Menüyü daralt"} className="hidden h-9 w-9 shrink-0 place-items-center rounded-full text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-gold lg:grid">
            <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
        </div>
        <nav aria-label="Panel" className="flex-1">
          {NAV.map((n) => {
            const head = n.group && n.group !== lastGroup ? n.group : null;
            if (n.group) lastGroup = n.group;
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <div key={n.href}>
                {head && (
                  <div className="relative mb-1 mt-4 h-6">
                    <p className={`absolute inset-x-0 top-1 overflow-hidden whitespace-nowrap px-3 text-[0.68rem] uppercase tracking-[0.2em] text-gold/70 ${anim ? "lg:transition-opacity lg:duration-500 [transition-timing-function:var(--ease-soft)]" : ""} ${collapsed ? "lg:opacity-0" : ""}`}>{head}</p>
                    <span aria-hidden className={`absolute inset-x-3 top-1/2 hidden h-px bg-ivory/15 lg:block ${anim ? "lg:transition-opacity lg:duration-500 [transition-timing-function:var(--ease-soft)]" : ""} ${collapsed ? "opacity-100" : "opacity-0"}`} />
                  </div>
                )}
                <Link
                  href={n.href}
                  title={collapsed ? n.label : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.92rem] transition-colors duration-300 ${active ? "bg-ivory/12 text-gold" : "text-ivory/80 hover:bg-ivory/[0.07] hover:text-ivory"}`}
                >
                  <Icon d={n.icon} />
                  <span className={`flex-1 overflow-hidden whitespace-nowrap ${anim ? "lg:transition-[opacity,max-width,max-height,margin] lg:duration-500 [transition-timing-function:var(--ease-soft)]" : ""} ${collapsed ? "lg:max-w-0 lg:flex-none lg:opacity-0" : "lg:max-w-[14rem]"}`}>{n.label}</span>
                  {n.href === "/panel/mesajlar" && unread > 0 && <span className={`rounded-full bg-gold px-2 py-0.5 text-xs font-medium text-navy ${collapsed ? "lg:absolute lg:right-1.5 lg:top-1 lg:px-1.5 lg:text-[0.65rem]" : ""}`}>{unread}</span>}
                </Link>
              </div>
            );
          })}
        </nav>
        <a href="/" target="_blank" rel="noopener" title="Siteyi aç" className={`mt-6 rounded-xl px-3 py-2.5 text-sm text-ivory/70 hover:text-gold`}>
          <span className={`inline-block overflow-hidden whitespace-nowrap align-bottom ${anim ? "lg:transition-[opacity,max-width,max-height,margin] lg:duration-500 [transition-timing-function:var(--ease-soft)]" : ""} ${collapsed ? "lg:max-w-0 lg:opacity-0" : "lg:max-w-[8rem]"}`}>Siteyi aç&nbsp;</span>↗
        </a>
      </aside>
      {open && <button aria-label="Menüyü kapat" className="fixed inset-0 z-30 bg-navy-deep/50 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />}

      <div className="min-w-0">
        <div className="sticky top-0 z-20 flex flex-wrap items-center gap-3 bg-ivory/85 px-4 py-3 shadow-[0_1px_0_rgba(15,39,71,0.08)] backdrop-blur-xl sm:px-8">
          <button className="grid h-10 w-10 place-items-center rounded-full text-navy shadow-[inset_0_0_0_1px_rgba(15,39,71,0.2)] lg:hidden" aria-label="Menüyü aç" onClick={() => setOpen(true)}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-2.5 text-sm">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${meta.dirty ? "bg-[#d49a2a]" : "bg-[#2f8f5b]"}`} />
            <span className="truncate text-muted">
              {meta.dirty ? "Yayınlanmamış değişiklikler var" : meta.publishedAt ? `Her şey yayında · ${fmtDate(meta.publishedAt)}` : "Site varsayılan içerikle yayında"}
            </span>
          </div>
          <a href="/api/panel/visit?mode=preview&to=/" target="_blank" rel="noopener" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-navy shadow-[inset_0_0_0_1px_rgba(15,39,71,0.2)] transition-colors duration-500 hover:bg-navy/[0.05]">
            Önizle
          </a>
          {meta.dirty && (
            <Btn variant="ghost" small onClick={() => setConfirm("discard")}>
              Taslağı sil
            </Btn>
          )}
          <Btn variant={meta.dirty ? "gold" : "primary"} disabled={!meta.dirty} onClick={() => setConfirm("publish")}>
            Yayınla
          </Btn>
          <button onClick={logout} className="rounded-full px-3 py-2 text-sm text-muted hover:text-navy">
            Çıkış
          </button>
        </div>

        <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-8 sm:pt-10">{children}</main>
      </div>

      {confirm && (
        <Modal title={confirm === "publish" ? "Değişiklikleri yayınla" : "Taslağı sil"} onClose={() => setConfirm(null)}>
          <p className="text-muted">
            {confirm === "publish"
              ? "Yaptığınız tüm değişiklikler sitede herkese görünür olacak. Yayınlamadan önce Önizle ile kontrol edebilirsiniz. Önceki sürüm Ayarlar sayfasındaki sürüm geçmişinde saklanır."
              : "Yayınlanmamış tüm değişiklikler silinir ve site yayındaki sürüme döner. Bu işlem geri alınamaz."}
          </p>
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <Btn variant="ghost" onClick={() => setConfirm(null)}>
              Vazgeç
            </Btn>
            <Btn variant={confirm === "publish" ? "primary" : "danger"} disabled={busy} onClick={() => act(confirm)}>
              {busy ? "Lütfen bekleyin…" : confirm === "publish" ? "Evet, yayınla" : "Evet, sil"}
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
