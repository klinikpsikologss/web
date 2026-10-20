"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import { HOME_SECTIONS, sectionLabel } from "@/lib/cms/home-sections";

type Mode = "edit" | "preview";
type Meta = { dirty: boolean; updatedAt: string | null; publishedAt: string | null };

const imageLabel = (id: string) => {
  if (IMAGE_LABELS[id]) return IMAGE_LABELS[id];
  if (id.endsWith(":+")) return "Yeni görsel ekle";
  const k = id.split(":")[0];
  return ({ post: "Yazı kapak görseli", spec: "Çalışma alanı görseli", gal: "Klinik fotoğrafı", edu: "Sertifika görseli", cert: "Sertifika görseli", evt: "Etkinlik fotoğrafı" } as Record<string, string>)[k] ?? id;
};

const IMAGE_LABELS: Record<string, string> = {
  "hero.desktop": "Hero görseli (masaüstü)",
  "hero.mobile": "Hero görseli (mobil)",
  "about.photo": "Hakkımda fotoğrafı",
};

const PENCIL = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 013 3L8 19l-4 1z"/></svg>`;

const MODE_KEY = "panel_mode";
const hhmm = () => new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

async function api<T = { ok?: boolean; error?: string }>(url: string, body?: unknown, method = "POST"): Promise<T & { error?: string }> {
  try {
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) });
    return (await res.json().catch(() => ({}))) as T & { error?: string };
  } catch {
    return { error: "Bağlantı hatası." } as T & { error?: string };
  }
}

/**
 * Canlı site üzerinde düzenleme katmanı. Yalnızca taslak modu açıkken (panelden "Siteyi özelleştir") yüklenir.
 * - Metinler: tıklayıp doğrudan yazılır (taslağa otomatik kaydedilir)
 * - Görseller: değiştir / sıfırla
 * - Ana sayfa bölümleri: yukarı/aşağı taşı, gizle/göster
 * - Önizle, Yayınla, Değişiklikleri at
 */
export function EditorLayer() {
  const router = useRouter();
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>("edit");
  const [meta, setMeta] = useState<Meta>({ dirty: false, updatedAt: null, publishedAt: null });
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [savedAt, setSavedAt] = useState("");
  const [panel, setPanel] = useState<null | "images" | "sections">(null);
  const [images, setImages] = useState<{ id: string; src: string }[]>([]);
  const [sections, setSections] = useState<{ id: string; hidden: boolean }[]>([]);
  const [confirm, setConfirm] = useState<null | "publish" | "discard">(null);
  const [toast, setToast] = useState<{ text: string; kind: "ok" | "err" } | null>(null);
  const pending = useRef<Record<string, string | null>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const uploadTarget = useRef<string | null>(null);
  const [imgModal, setImgModal] = useState<string | null>(null);
  const [lib, setLib] = useState<{ url: string; name: string }[] | null>(null);
  const [busy, setBusy] = useState(false);

  const say = useCallback((text: string, kind: "ok" | "err" = "ok") => {
    setToast({ text, kind });
    setTimeout(() => setToast(null), 3200);
  }, []);

  /* Başlangıç: mod (URL > oturum), durum */
  useEffect(() => {
    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get("__pm");
    let m: Mode = (sessionStorage.getItem(MODE_KEY) as Mode) || "edit";
    if (fromUrl === "edit" || fromUrl === "preview") {
      m = fromUrl;
      sessionStorage.setItem(MODE_KEY, m);
      url.searchParams.delete("__pm");
      window.history.replaceState(null, "", url.pathname + (url.search || "") + url.hash);
    }
    setMode(m);
    api<{ meta: Meta }>("/api/panel/status", undefined, "GET").then((r) => r.meta && setMeta(r.meta));
    document.documentElement.setAttribute("data-editor", "1");
    return () => document.documentElement.removeAttribute("data-editor");
  }, []);

  const switchMode = (m: Mode) => {
    sessionStorage.setItem(MODE_KEY, m);
    setMode(m);
    setPanel(null);
  };

  /* Taslağa kaydet (birleştirilmiş, gecikmeli) */
  const flush = useCallback(async () => {
    const texts = pending.current;
    pending.current = {};
    if (!Object.keys(texts).length) return;
    setSaving("saving");
    const r = await api<{ meta: Meta }>("/api/panel/draft", { texts });
    if (r.error) {
      setSaving("error");
      say(r.error, "err");
      return;
    }
    if (r.meta) setMeta(r.meta);
    setSaving("saved");
    setSavedAt(hhmm());
  }, [say]);

  const queueText = useCallback(
    (id: string, value: string | null) => {
      pending.current[id] = value;
      setSaving("saving");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(flush, 700);
    },
    [flush],
  );

  /* Sayfadaki görselleri ve bölümleri tara */
  const scan = useCallback(() => {
    const seen = new Map<string, string>();
    document.querySelectorAll<HTMLElement>("[data-edit-img]").forEach((el) => {
      const id = el.dataset.editImg!;
      if (!seen.has(id)) seen.set(id, el.querySelector("img")?.currentSrc || el.querySelector("img")?.src || "");
    });
    setImages([...seen].map(([id, src]) => ({ id, src })));
    const secs: { id: string; hidden: boolean }[] = [];
    document.querySelectorAll<HTMLElement>("[data-section-id]").forEach((el) => secs.push({ id: el.dataset.sectionId!, hidden: el.dataset.sectionHidden === "true" }));
    setSections(secs);
  }, []);

  /* Düzenleme modu davranışları */
  useEffect(() => {
    const editing = mode === "edit";
    document.documentElement.setAttribute("data-editing", editing ? "1" : "0");
    scan();
    if (!editing) return;

    const texts = Array.from(document.querySelectorAll<HTMLElement>("[data-edit-id]"));
    const probe = document.createElement("div");
    probe.contentEditable = "plaintext-only";
    const editableValue = probe.contentEditable === "plaintext-only" ? "plaintext-only" : "true";

    const cleanups: (() => void)[] = [];
    texts.forEach((el) => {
      el.classList.add("cms-editable");
      el.setAttribute("contenteditable", editableValue);
      el.setAttribute("spellcheck", "false");
      const multi = el.dataset.editMultiline === "true";
      const onInput = () => {
        const value = (el.innerText ?? "").replace(/ /g, " ").replace(/\n+$/g, "");
        const def = el.dataset.editDefault ?? "";
        queueText(el.dataset.editId!, value.trim() === def.trim() ? null : value);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !multi) {
          e.preventDefault();
          el.blur();
        }
        if (e.key === "Escape") el.blur();
      };
      const onPaste = (e: ClipboardEvent) => {
        e.preventDefault();
        const t = e.clipboardData?.getData("text/plain") ?? "";
        document.execCommand("insertText", false, multi ? t : t.replace(/\s*\n+\s*/g, " "));
      };
      el.addEventListener("input", onInput);
      el.addEventListener("keydown", onKey);
      el.addEventListener("paste", onPaste);
      cleanups.push(() => {
        el.removeEventListener("input", onInput);
        el.removeEventListener("keydown", onKey);
        el.removeEventListener("paste", onPaste);
        el.removeAttribute("contenteditable");
        el.classList.remove("cms-editable");
      });
    });

    // Bağlantılar düzenleme sırasında gezinmesin
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-editor-ui]")) return;
      const a = t?.closest("a");
      if (a) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("click", onClick, true);
    cleanups.push(() => document.removeEventListener("click", onClick, true));

    // Görsel üzerindeki "Değiştir" düğmeleri (görünür olanlar)
    const btns: HTMLElement[] = [];
    const hosts: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("[data-edit-img]").forEach((wrap) => {
      if (wrap.className.includes("absolute") && wrap.className.includes("-z-10")) return; // arkadaki hero görselleri "Görseller" panelinden
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-editor-ui", "1");
      b.className = "cms-img-btn";
      b.title = "Görseli değiştir";
      b.setAttribute("aria-label", "Görseli değiştir");
      b.innerHTML = PENCIL;
      b.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openImageModal(wrap.dataset.editImg!);
      };
      wrap.appendChild(b);
      wrap.classList.add("cms-img");
      // Üstünde örtü katmanı olan kartlarda (ör. çalışma alanı) hover, kartın tamamından algılanır
      const sibs = Array.from(wrap.parentElement?.children ?? []);
      const host = sibs.some((x) => x !== wrap && (x as HTMLElement).className?.toString().includes("inset-0")) ? (wrap.parentElement as HTMLElement) : wrap;
      host.classList.add("cms-img-host");
      btns.push(b);
      hosts.push(host);
    });
    cleanups.push(() => {
      btns.forEach((b) => (b.parentElement?.classList.remove("cms-img"), b.remove()));
      hosts.forEach((h) => h.classList.remove("cms-img-host"));
    });

    // Görsel listeleri (sertifika, etkinlik...): "Görsel ekle" düğmeleri
    const adds: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("[data-edit-add]").forEach((box) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-editor-ui", "1");
      b.className = "cms-add-btn";
      b.textContent = "+ " + (box.dataset.editLabel ?? "Görsel ekle");
      b.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openImageModal(`${box.dataset.editAdd}:+`);
      };
      box.appendChild(b);
      adds.push(b);
    });
    cleanups.push(() => adds.forEach((b) => b.remove()));

    // Ana sayfa bölümleri: üstte küçük araç çubuğu
    const bars: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("[data-section-id]").forEach((sec) => {
      sec.classList.add("cms-section");
      const bar = document.createElement("div");
      bar.setAttribute("data-editor-ui", "1");
      bar.className = "cms-section-bar";
      const id = sec.dataset.sectionId!;
      const mk = (label: string, title: string, act: () => void) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = label;
        b.title = title;
        b.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          act();
        };
        return b;
      };
      const span = document.createElement("span");
      span.textContent = sectionLabel(id);
      bar.append(span, mk("↑", "Yukarı taşı", () => moveSection(id, -1)), mk("↓", "Aşağı taşı", () => moveSection(id, 1)), mk(sec.dataset.sectionHidden === "true" ? "Göster" : "Gizle", "Yayında göster/gizle", () => toggleSection(id)));
      sec.prepend(bar);
      bars.push(bar);
    });
    cleanups.push(() => bars.forEach((b) => (b.parentElement?.classList.remove("cms-section"), b.remove())));

    return () => cleanups.forEach((f) => f());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, pathname, queueText, scan]);

  /* Bölüm sıralama / gizleme */
  const saveSections = async (list: { id: string; hidden: boolean }[]) => {
    setSaving("saving");
    const r = await api<{ meta: Meta }>("/api/panel/draft", { home: { order: list.map((s) => s.id), hidden: list.filter((s) => s.hidden).map((s) => s.id) } });
    if (r.error) {
      setSaving("error");
      say(r.error, "err");
      return;
    }
    if (r.meta) setMeta(r.meta);
    setSaving("saved");
    setSavedAt(hhmm());
    router.refresh();
    setTimeout(scan, 600);
  };
  const currentSections = () => {
    const list: { id: string; hidden: boolean }[] = [];
    document.querySelectorAll<HTMLElement>("[data-section-id]").forEach((el) => list.push({ id: el.dataset.sectionId!, hidden: el.dataset.sectionHidden === "true" }));
    return list;
  };
  function moveSection(id: string, dir: -1 | 1) {
    const list = currentSections();
    const i = list.findIndex((s) => s.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    saveSections(list);
  }
  function toggleSection(id: string) {
    saveSections(currentSections().map((s) => (s.id === id ? { ...s, hidden: !s.hidden } : s)));
  }

  /* Görsel değiştirme (modal) */
  const openImageModal = (id: string) => {
    setImgModal(id);
    setLib(null);
    fetch("/api/panel/upload")
      .then((r) => r.json())
      .then((r) => setLib(r.items ?? []))
      .catch(() => setLib([]));
  };
  const applyImage = async (id: string, url: string) => {
    setSaving("saving");
    const r = await api<{ meta: Meta }>("/api/panel/draft", { images: { [id]: url } });
    if (r.error) {
      setSaving("error");
      say(r.error, "err");
      return false;
    }
    if (r.meta) setMeta(r.meta);
    document.querySelectorAll<HTMLElement>(`[data-edit-img="${CSS.escape(id)}"] img`).forEach((img) => {
      const el = img as HTMLImageElement;
      el.removeAttribute("srcset");
      el.src = url;
    });
    setSaving("saved");
    setSavedAt(hhmm());
    router.refresh();
    setTimeout(scan, 800);
    say("Görsel taslağa kaydedildi.");
    return true;
  };
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const id = imgModal;
    e.target.value = "";
    if (!file || !id) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    const up = await fetch("/api/panel/upload", { method: "POST", body: fd }).then((r) => r.json()).catch(() => ({ error: "Yüklenemedi." }));
    setBusy(false);
    if (up.error) return say(up.error, "err");
    if (await applyImage(id, up.url)) setImgModal(null);
  };
  const resetImage = async (id: string) => {
    const r = await api<{ meta: Meta }>("/api/panel/draft", { images: { [id]: null } });
    if (r.error) return say(r.error, "err");
    if (r.meta) setMeta(r.meta);
    say("Varsayılan görsel geri yüklendi.");
    router.refresh();
    setTimeout(scan, 800);
  };

  /* Yayınla / At */
  const publish = async () => {
    if (timer.current) clearTimeout(timer.current);
    await flush();
    const r = await api<{ meta: Meta }>("/api/panel/publish", { label: "Siteyi özelleştir" });
    setConfirm(null);
    if (r.error) return say(r.error, "err");
    if (r.meta) setMeta(r.meta);
    say("Yayınlandı. Değişiklikler canlı sitede görünüyor.");
    router.refresh();
  };
  const discard = async () => {
    const r = await api<{ meta: Meta }>("/api/panel/publish", { action: "discard" });
    setConfirm(null);
    if (r.error) return say(r.error, "err");
    if (r.meta) setMeta(r.meta);
    say("Taslak değişiklikleri atıldı.");
    router.refresh();
    setTimeout(() => window.location.reload(), 400);
  };

  const status =
    saving === "saving" ? "Kaydediliyor…" : saving === "error" ? "Kaydedilemedi" : saving === "saved" ? `Taslağa kaydedildi ${savedAt}` : meta.dirty ? "Yayınlanmamış değişiklikler var" : "Tüm değişiklikler yayında";

  return (
    <div data-editor-ui className="cms-bar">
      <div className="cms-bar-left">
        <a href="/panel/ozet" className="cms-btn cms-btn-ghost" title="Panele dön">
          ← Panel
        </a>
        <div className="cms-seg" role="group" aria-label="Mod">
          <button type="button" className={mode === "edit" ? "on" : ""} onClick={() => switchMode("edit")}>
            Düzenle
          </button>
          <button type="button" className={mode === "preview" ? "on" : ""} onClick={() => switchMode("preview")}>
            Önizle
          </button>
        </div>
        {mode === "edit" && (
          <>
            <button type="button" className="cms-btn cms-btn-ghost" onClick={() => (scan(), setPanel(panel === "images" ? null : "images"))}>
              Görseller
            </button>
            {pathname === "/" && (
              <button type="button" className="cms-btn cms-btn-ghost" onClick={() => (scan(), setPanel(panel === "sections" ? null : "sections"))}>
                Bölümler
              </button>
            )}
          </>
        )}
      </div>

      <div className={`cms-status ${saving}`} aria-live="polite">
        <span className="dot" />
        {status}
      </div>

      <div className="cms-bar-right">
        <a href="/api/panel/visit?mode=off" className="cms-btn cms-btn-ghost">
          Çık
        </a>
        <button type="button" className="cms-btn cms-btn-ghost" disabled={!meta.dirty} onClick={() => setConfirm("discard")}>
          Değişiklikleri at
        </button>
        <button type="button" className="cms-btn cms-btn-gold" disabled={!meta.dirty && saving !== "saving"} onClick={() => setConfirm("publish")}>
          Yayınla
        </button>
      </div>

      <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={onFile} />

      {panel === "images" && (
        <div className="cms-pop" data-editor-ui>
          <p className="cms-pop-title">Bu sayfadaki görseller</p>
          {images.length === 0 && <p className="cms-pop-empty">Bu sayfada değiştirilebilir görsel yok.</p>}
          {images.map((im) => (
            <div key={im.id} className="cms-pop-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {im.src ? <img src={im.src} alt="" /> : <span className="ph" />}
              <span className="name">{imageLabel(im.id)}</span>
              <button type="button" className="cms-btn cms-btn-small" onClick={() => openImageModal(im.id)}>
                Değiştir
              </button>
              <button type="button" className="cms-btn cms-btn-small cms-btn-ghost" onClick={() => resetImage(im.id)}>
                {im.id.includes(":") ? "Kaldır" : "Sıfırla"}
              </button>
            </div>
          ))}
        </div>
      )}

      {panel === "sections" && (
        <div className="cms-pop" data-editor-ui>
          <p className="cms-pop-title">Ana sayfa bölümleri</p>
          {sections.map((s, i) => (
            <div key={s.id} className={`cms-pop-row ${s.hidden ? "hidden-sec" : ""}`}>
              <span className="name">{HOME_SECTIONS.find((x) => x.id === s.id)?.label ?? s.id}</span>
              <button type="button" className="cms-btn cms-btn-small cms-btn-ghost" disabled={i === 0} onClick={() => moveSection(s.id, -1)}>
                ↑
              </button>
              <button type="button" className="cms-btn cms-btn-small cms-btn-ghost" disabled={i === sections.length - 1} onClick={() => moveSection(s.id, 1)}>
                ↓
              </button>
              <button type="button" className="cms-btn cms-btn-small" onClick={() => toggleSection(s.id)}>
                {s.hidden ? "Göster" : "Gizle"}
              </button>
            </div>
          ))}
          <p className="cms-pop-hint">Hero (en üst) ve iletişim bandı (en alt) sabittir.</p>
        </div>
      )}

      {typeof document !== "undefined" &&
        createPortal(
          <>
      {imgModal && (
        <div className="cms-modal" data-editor-ui role="dialog" aria-modal="true" aria-label="Görseli değiştir" onClick={() => setImgModal(null)}>
          <div className="cms-modal-card cms-img-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{imgModal.endsWith(":+") ? "Görsel ekle" : "Görseli değiştir"}</h3>
            <p>{imageLabel(imgModal)}</p>
            <div className="cms-img-actions">
              <button type="button" className="cms-btn cms-btn-gold" disabled={busy} onClick={() => fileInput.current?.click()}>
                {busy ? "Yükleniyor…" : "Bilgisayardan yükle"}
              </button>
              {!imgModal.endsWith(":+") && <button
                type="button"
                className="cms-btn cms-btn-ghost"
                onClick={async () => {
                  await resetImage(imgModal);
                  setImgModal(null);
                }}
              >
                {imgModal.includes(":") ? "Görseli kaldır" : "Varsayılana dön"}
              </button>}
            </div>
            <p className="cms-pop-title">Ya da yüklediklerinizden seçin</p>
            {lib === null ? (
              <p className="cms-pop-empty">Yükleniyor…</p>
            ) : lib.length === 0 ? (
              <p className="cms-pop-empty">Henüz yüklenmiş görsel yok.</p>
            ) : (
              <ul className="cms-img-grid">
                {lib.map((m) => (
                  <li key={m.url}>
                    <button
                      type="button"
                      onClick={async () => {
                        if (await applyImage(imgModal, m.url)) setImgModal(null);
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.url} alt={m.name} loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="row">
              <button type="button" className="cms-btn cms-btn-ghost" onClick={() => setImgModal(null)}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {confirm && (
        <div className="cms-modal" data-editor-ui role="dialog" aria-modal="true">
          <div className="cms-modal-card">
            <h3>{confirm === "publish" ? "Değişiklikler yayınlansın mı?" : "Değişiklikler atılsın mı?"}</h3>
            <p>
              {confirm === "publish"
                ? "Taslaktaki tüm düzenlemeler canlı sitede görünür olacak. Önceki sürüm geçmişe kaydedilir ve gerekirse geri alınabilir."
                : "Yayınlanmamış tüm düzenlemeler silinir ve site yayındaki haline döner. Bu işlem geri alınamaz."}
            </p>
            <div className="row">
              <button type="button" className="cms-btn cms-btn-ghost" onClick={() => setConfirm(null)}>
                Vazgeç
              </button>
              <button type="button" className={confirm === "publish" ? "cms-btn cms-btn-gold" : "cms-btn cms-btn-danger"} onClick={confirm === "publish" ? publish : discard}>
                {confirm === "publish" ? "Yayınla" : "Evet, at"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`cms-toast ${toast.kind}`} role="status">
          {toast.text}
        </div>
      )}
          </>,
          document.body,
        )}
    </div>
  );
}
