"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Seo, SiteInfo, Theme } from "@/lib/cms/content";
import { Btn, Card, Field, fmtDate, inputCls, LinkBtn, useConfirm, useSave, useToast } from "./kit";

type Hist = { id: string; at: string; label: string };

export function Settings({ site: s0, seo: seo0, theme: th0, username, history }: { site: SiteInfo; seo: Seo; theme: Theme; username: string; history: Hist[] }) {
  const save = useSave();
  const toast = useToast();
  const ask = useConfirm();
  const router = useRouter();
  const [site, setSite] = useState(s0);
  const [seo, setSeo] = useState(seo0);
  const [theme, setTheme] = useState(th0);
  const [acc, setAcc] = useState({ current: "", username: "", password: "", again: "" });
  const [busy, setBusy] = useState(false);

  const s = (k: keyof SiteInfo) => ({ value: site[k], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSite({ ...site, [k]: e.target.value }), className: inputCls });

  async function changeAccount() {
    if (acc.password && acc.password !== acc.again) return toast("Yeni şifreler eşleşmiyor.", "err");
    setBusy(true);
    const r = await fetch("/api/panel/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: acc.current, username: acc.username, password: acc.password }),
    }).then((x) => x.json()).catch(() => ({ error: "Bağlantı hatası." }));
    setBusy(false);
    if (r.error) return toast(r.error, "err");
    toast("Giriş bilgileriniz güncellendi.");
    setAcc({ current: "", username: "", password: "", again: "" });
  }

  async function restore(h: Hist) {
    if (!(await ask({ title: "Sürüm taslağa yüklensin mi?", text: `${fmtDate(h.at)} tarihli sürüm taslağa yüklenir. Şu anki taslağınızın yerini alır; yayınlamadan sitede görünmez.`, confirmLabel: "Evet, yükle" }))) return;
    const r = await fetch("/api/panel/publish", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "restore", id: h.id }) });
    if (!r.ok) return toast("Sürüm yüklenemedi.", "err");
    toast("Sürüm taslağa yüklendi. Önizleyip yayınlayabilirsiniz.");
    window.dispatchEvent(new Event("panel:saved"));
    router.refresh();
  }

  return (
    <div className="grid gap-6">
      <Card>
        <h2 className="mb-1 text-2xl">İletişim bilgileri</h2>
        <p className="mb-5 text-sm text-muted">Sitenin her yerinde (üst bölüm, alt bölüm, iletişim sayfası, arama motoru bilgileri) kullanılır.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Telefon"><input {...s("phone")} /></Field>
          <Field label="E-posta"><input type="email" {...s("email")} /></Field>
          <Field label="Adres (sokak, bina)" className="sm:col-span-2"><input {...s("street")} /></Field>
          <Field label="İlçe"><input {...s("district")} /></Field>
          <Field label="Şehir"><input {...s("city")} /></Field>
          <Field label="Instagram adresi"><input {...s("instagram")} /></Field>
          <Field label="LinkedIn adresi"><input {...s("linkedin")} /></Field>
          <Field label="Randevu bağlantısı" hint="Sitedeki tüm “Randevu Al” butonları bu adrese gider (https:// ile başlamalı)." className="sm:col-span-2"><input {...s("appointmentUrl")} placeholder="https://wa.me/905322723614?text=..." /></Field>
        </div>
        <Btn className="mt-6" onClick={() => save({ site })}>Taslağa kaydet</Btn>
      </Card>

      <Card>
        <h2 className="mb-1 text-2xl">Arama motoru (SEO)</h2>
        <p className="mb-5 text-sm text-muted">Google sonuçlarında ve sekme başlığında görünen ana sayfa bilgileri.</p>
        <div className="grid gap-4">
          <Field label="Sayfa başlığı" hint={`${seo.title.length}/70 · ideal olarak 60 karakteri geçmesin`}>
            <input className={inputCls} value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} />
          </Field>
          <Field label="Açıklama" hint={`${seo.description.length}/160 · ideal uzunluk 120–160 karakter`}>
            <textarea className={`${inputCls} min-h-24`} value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })} />
          </Field>
          <div className="rounded-xl bg-ivory p-4 shadow-[inset_0_0_0_1px_rgba(15,39,71,0.1)]">
            <p className="truncate text-lg text-[#1a0dab]">{seo.title}</p>
            <p className="text-sm text-[#006621]">klinikpsikologselinsak.com</p>
            <p className="line-clamp-2 text-sm text-[#545454]">{seo.description}</p>
          </div>
        </div>
        <Btn className="mt-6" onClick={() => save({ seo })}>Taslağa kaydet</Btn>
      </Card>

      <Card>
        <h2 className="mb-1 text-2xl">Renkler</h2>
        <p className="mb-5 text-sm text-muted">Sitenin ana lacivert ve altın tonları. Önizleyerek denemeden yayınlamayın.</p>
        <div className="flex flex-wrap items-end gap-6">
          {(["navy", "gold"] as const).map((k) => (
            <label key={k} className="block">
              <span className="mb-1.5 block text-sm font-medium text-navy">{k === "navy" ? "Ana renk (lacivert)" : "Vurgu rengi (altın)"}</span>
              <span className="flex items-center gap-3">
                <input type="color" value={theme[k]} onChange={(e) => setTheme({ ...theme, [k]: e.target.value })} className="h-12 w-16 cursor-pointer rounded-lg border-0 bg-transparent p-0" />
                <code className="text-sm text-muted">{theme[k]}</code>
              </span>
            </label>
          ))}
          <Btn variant="ghost" onClick={() => setTheme({ navy: "#0f2747", gold: "#d9c6a1" })}>Varsayılana sıfırla</Btn>
        </div>
        <Btn className="mt-6" onClick={() => save({ theme })}>Taslağa kaydet</Btn>
      </Card>

      <Card>
        <h2 className="mb-1 text-2xl">Giriş bilgileri</h2>
        <p className="mb-5 text-sm text-muted">Şu anki kullanıcı adı: <b className="text-navy">{username}</b>. Güvenliğiniz için ilk girişten sonra şifrenizi değiştirmenizi öneririz.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Mevcut şifre" className="sm:col-span-2"><input type="password" autoComplete="current-password" className={inputCls} value={acc.current} onChange={(e) => setAcc({ ...acc, current: e.target.value })} /></Field>
          <Field label="Yeni kullanıcı adı (isteğe bağlı)"><input autoComplete="off" className={inputCls} value={acc.username} onChange={(e) => setAcc({ ...acc, username: e.target.value })} /></Field>
          <span className="hidden sm:block" />
          <Field label="Yeni şifre" hint="En az 8 karakter"><input type="password" autoComplete="new-password" className={inputCls} value={acc.password} onChange={(e) => setAcc({ ...acc, password: e.target.value })} /></Field>
          <Field label="Yeni şifre (tekrar)"><input type="password" autoComplete="new-password" className={inputCls} value={acc.again} onChange={(e) => setAcc({ ...acc, again: e.target.value })} /></Field>
        </div>
        <Btn className="mt-6" disabled={busy || !acc.current} onClick={changeAccount}>{busy ? "Kaydediliyor…" : "Giriş bilgilerini güncelle"}</Btn>
      </Card>

      <Card>
        <h2 className="mb-1 text-2xl">Sürüm geçmişi</h2>
        <p className="mb-5 text-sm text-muted">Her yayında bir önceki sürüm saklanır. Eski bir sürümü taslağa yükleyip önizleyebilirsiniz.</p>
        {history.length === 0 ? (
          <p className="text-sm text-muted">Henüz kayıtlı sürüm yok.</p>
        ) : (
          <ul className="grid gap-2">
            {history.map((h) => (
              <li key={h.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-navy/[0.04] px-4 py-3 text-sm">
                <span><b className="text-navy">{fmtDate(h.at)}</b> <span className="text-muted">· {h.label}</span></span>
                <Btn small variant="ghost" onClick={() => restore(h)}>Taslağa yükle</Btn>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h2 className="mb-1 text-2xl">Yedek</h2>
        <p className="mb-5 text-sm text-muted">Sitedeki tüm içeriği ve mesajları tek bir dosya olarak indirin.</p>
        <LinkBtn href="/api/panel/export">Yedeği indir (JSON)</LinkBtn>
      </Card>
    </div>
  );
}
