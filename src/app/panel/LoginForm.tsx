"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, inputCls } from "@/components/panel/kit";

export function LoginForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const res = await fetch("/api/panel/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: f.get("username"), password: f.get("password") }),
    }).catch(() => null);
    const json = await res?.json().catch(() => ({}));
    if (res?.ok) {
      router.replace("/panel/ozet");
      router.refresh();
      return;
    }
    setBusy(false);
    setError(json?.error || "Giriş yapılamadı.");
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Kullanıcı adı">
        <input name="username" autoComplete="username" required autoFocus className={inputCls} />
      </Field>
      <Field label="Şifre">
        <span className="relative block">
          <input name="password" type={show ? "text" : "password"} autoComplete="current-password" required className={`${inputCls} pr-20`} />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs text-muted hover:text-navy">
            {show ? "Gizle" : "Göster"}
          </button>
        </span>
      </Field>
      {error && (
        <p role="alert" className="rounded-xl bg-[#a2332e]/10 px-4 py-3 text-sm text-[#8f2f2b]">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className="mt-1 inline-flex items-center justify-center rounded-full bg-navy px-6 py-3.5 text-sm font-medium text-ivory transition-[background-color,opacity] duration-500 hover:bg-navy-soft disabled:opacity-60">
        {busy ? "Giriş yapılıyor…" : "Giriş yap"}
      </button>
      <a href="/" className="text-center text-sm text-muted hover:text-navy">
        ← Siteye dön
      </a>
    </form>
  );
}
