"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/* ───────── Bildirimler ───────── */
type ToastKind = "ok" | "err";
const ToastCtx = createContext<(text: string, kind?: ToastKind) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export type AskOpts = { title: string; text?: string; confirmLabel?: string; danger?: boolean };
const ConfirmCtx = createContext<(o: AskOpts) => Promise<boolean>>(async () => false);
/** alert/confirm yerine modal onay: `if (!(await ask({ title: "…" }))) return;` */
export const useConfirm = () => useContext(ConfirmCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [dlg, setDlg] = useState<(AskOpts & { resolve: (v: boolean) => void }) | null>(null);
  const ask = useCallback((o: AskOpts) => new Promise<boolean>((resolve) => setDlg({ ...o, resolve })), []);
  const close = (v: boolean) => {
    dlg?.resolve(v);
    setDlg(null);
  };
  const [items, setItems] = useState<{ id: number; text: string; kind: ToastKind }[]>([]);
  const push = useCallback((text: string, kind: ToastKind = "ok") => {
    const id = Date.now() + Math.random();
    setItems((l) => [...l, { id, text, kind }]);
    setTimeout(() => setItems((l) => l.filter((t) => t.id !== id)), 3600);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      <ConfirmCtx.Provider value={ask}>{children}</ConfirmCtx.Provider>
      {dlg && (
        <Modal title={dlg.title} onClose={() => close(false)}>
          {dlg.text && <p className="text-muted">{dlg.text}</p>}
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <Btn variant="ghost" onClick={() => close(false)}>Vazgeç</Btn>
            <Btn variant={dlg.danger ? "danger" : "primary"} onClick={() => close(true)} autoFocus>
              {dlg.confirmLabel ?? "Onayla"}
            </Btn>
          </div>
        </Modal>
      )}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[80] flex flex-col items-center gap-2 px-4" role="status" aria-live="polite">
        {items.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto rounded-full px-5 py-3 text-sm text-ivory shadow-[0_20px_40px_-16px_rgba(9,27,52,0.6)] ${t.kind === "err" ? "bg-[#8f2f2b]" : "bg-navy"}`}
            style={{ animation: "lb-fade 400ms var(--ease-soft)" }}
          >
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ───────── Taslağa kaydetme ───────── */
export type SaveFn = (patch: Record<string, unknown>, ok?: string) => Promise<boolean>;

export function useSave(): SaveFn {
  const toast = useToast();
  return useCallback(
    async (patch, ok = "Taslağa kaydedildi. Yayınlamak için üstteki “Yayınla”ya basın.") => {
      try {
        const res = await fetch("/api/panel/draft", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.error) {
          toast(json.error || "Kaydedilemedi.", "err");
          return false;
        }
        toast(ok);
        window.dispatchEvent(new Event("panel:saved"));
        return true;
      } catch {
        toast("Bağlantı hatası.", "err");
        return false;
      }
    },
    [toast],
  );
}

/* ───────── Temel parçalar ───────── */
export function Card({ children, className = "", as: Tag = "section", ...rest }: { children: ReactNode; className?: string; as?: "section" | "div" | "li" } & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag {...rest} className={`rounded-[1.1rem] bg-paper/90 p-5 shadow-[0_0_0_1px_rgba(15,39,71,0.07),0_24px_50px_-36px_rgba(15,39,71,0.35)] sm:p-7 ${className}`}>
      {children}
    </Tag>
  );
}

export function PageTitle({ title, lead, actions }: { title: string; lead?: string; actions?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-4xl leading-tight sm:text-[2.6rem]">{title}</h1>
        {lead && <p className="mt-2 max-w-2xl text-muted">{lead}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

const btnBase = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-[background-color,transform,opacity] duration-500 [transition-timing-function:var(--ease-soft)] active:scale-[0.98] disabled:cursor-default disabled:opacity-45";
const variants = {
  primary: "bg-navy text-ivory hover:bg-navy-soft",
  gold: "bg-gold text-navy hover:bg-[#e6d6b6]",
  ghost: "text-navy shadow-[inset_0_0_0_1px_rgba(15,39,71,0.2)] hover:bg-navy/[0.05]",
  danger: "text-[#a2332e] shadow-[inset_0_0_0_1px_rgba(162,51,46,0.35)] hover:bg-[#a2332e]/10",
} as const;

export function Btn({
  variant = "primary",
  small = false,
  className = "",
  ...props
}: { variant?: keyof typeof variants; small?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} className={`${btnBase} ${variants[variant]} ${small ? "!px-3.5 !py-1.5 !text-[0.8rem]" : ""} ${className}`} />;
}

export function LinkBtn({
  href,
  variant = "ghost",
  small = false,
  newTab = false,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  small?: boolean;
  newTab?: boolean;
  children: ReactNode;
}) {
  return (
    <a href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener" : undefined} className={`${btnBase} ${variants[variant]} ${small ? "!px-3.5 !py-1.5 !text-[0.8rem]" : ""}`}>
      {children}
    </a>
  );
}

export const inputCls =
  "w-full rounded-xl border-0 bg-ivory px-4 py-3 text-[0.95rem] text-ink shadow-[inset_0_0_0_1px_rgba(15,39,71,0.14)] outline-none transition-shadow duration-300 placeholder:text-muted/60 focus:shadow-[inset_0_0_0_1.5px_var(--color-gold-deep)]";

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Badge({ children, tone = "navy" }: { children: ReactNode; tone?: "navy" | "gold" | "green" | "gray" }) {
  const tones = { navy: "bg-navy/10 text-navy", gold: "bg-gold/40 text-[#5a4521]", green: "bg-[#2f8f5b]/15 text-[#206c43]", gray: "bg-navy/[0.06] text-muted" };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-xl bg-navy/[0.03] px-5 py-8 text-center text-sm text-muted">{children}</p>;
}

export function Modal({ title, children, onClose, wide = false }: { title: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className={`max-h-[88vh] w-full overflow-auto rounded-[1.1rem] bg-paper p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-8 ${wide ? "max-w-4xl" : "max-w-lg"}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-3xl">{title}</h2>
        {children}
      </div>
    </div>
  );
}

/* ───────── Görsel seçici (yükle / medyadan seç) ───────── */
type Media = { url: string; name: string; width: number; height: number };

export function ImagePicker({ value, onChange, label = "Görsel", aspect = "aspect-[3/2]" }: { value?: string; onChange: (url: string | undefined) => void; label?: string; aspect?: string }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [lib, setLib] = useState<Media[] | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("file", files[0]);
    const r = await fetch("/api/panel/upload", { method: "POST", body: fd }).then((x) => x.json()).catch(() => ({ error: "Yüklenemedi." }));
    setBusy(false);
    if (r.error) return toast(r.error, "err");
    onChange(r.url);
  };
  const openLib = async () => {
    const r = await fetch("/api/panel/upload").then((x) => x.json()).catch(() => ({ items: [] }));
    setLib(r.items ?? []);
  };

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      <div className="flex flex-wrap items-start gap-4">
        <div className={`${aspect} w-48 shrink-0 overflow-hidden rounded-xl bg-navy/[0.05] shadow-[inset_0_0_0_1px_rgba(15,39,71,0.1)]`}>
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-xs text-muted">Görsel yok</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Btn small variant="ghost" onClick={() => input.current?.click()} disabled={busy}>
            {busy ? "Yükleniyor…" : "Yeni görsel yükle"}
          </Btn>
          <Btn small variant="ghost" onClick={openLib}>
            Medyadan seç
          </Btn>
          {value && (
            <Btn small variant="danger" onClick={() => onChange(undefined)}>
              Kaldır
            </Btn>
          )}
        </div>
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={(e) => (upload(e.target.files), (e.target.value = ""))} />
      {lib && (
        <Modal title="Medya kütüphanesi" onClose={() => setLib(null)} wide>
          {lib.length === 0 ? (
            <Empty>Henüz yüklenmiş görsel yok.</Empty>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {lib.map((m) => (
                <li key={m.url}>
                  <button type="button" className="group block w-full overflow-hidden rounded-xl text-left shadow-[inset_0_0_0_1px_rgba(15,39,71,0.1)]" onClick={() => (onChange(m.url), setLib(null))}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.url} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="block truncate px-2 py-1.5 text-xs text-muted">{m.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}
    </div>
  );
}

export { fmtDate, move, toParas, fromParas, toLines, dragProps, reorder } from "./util";

/* ───────── Satır menüsü (⋮ → Düzenle / Sil) ───────── */
export function RowMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  const item = "block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-navy/[0.06]";
  return (
    <div ref={ref} className="relative shrink-0">
      <button type="button" aria-label="Seçenekler" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center rounded-full text-navy transition-colors hover:bg-navy/[0.07]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <circle cx="12" cy="5" r="1.7" />
          <circle cx="12" cy="12" r="1.7" />
          <circle cx="12" cy="19" r="1.7" />
        </svg>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-11 z-20 w-40 overflow-hidden rounded-xl bg-paper py-1 shadow-[0_0_0_1px_rgba(15,39,71,0.1),0_24px_50px_-20px_rgba(15,39,71,0.5)]" style={{ animation: "lb-fade 250ms var(--ease-soft)" }}>
          <button role="menuitem" className={`${item} text-navy`} onClick={() => (setOpen(false), onEdit())}>Düzenle</button>
          <button role="menuitem" className={`${item} text-[#a2332e]`} onClick={() => (setOpen(false), onDelete())}>Sil</button>
        </div>
      )}
    </div>
  );
}
