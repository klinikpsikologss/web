"use client";

import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

/** Yüzen etiketli alan: etiket, alan boşken içeride durur; odaklanınca ya da doluyken küçülüp yukarı çıkar. */
const box =
  "peer w-full rounded-2xl border-0 bg-ivory/[0.07] px-5 pb-2.5 pt-7 text-[1rem] text-ivory outline-none focus-visible:outline-none shadow-[inset_0_0_0_1px_rgba(248,245,238,0.16)] transition-[box-shadow,background-color] duration-500 [transition-timing-function:var(--ease-soft)] placeholder:text-transparent hover:bg-ivory/[0.1] focus:bg-ivory/[0.1] focus:shadow-[inset_0_0_0_1.5px_var(--color-gold),0_0_0_5px_rgba(217,198,161,0.14)]";
const lab =
  "pointer-events-none absolute left-5 top-2.5 origin-left text-[0.72rem] tracking-wide text-ivory/60 transition-[transform,top,font-size,color] duration-500 [transition-timing-function:var(--ease-soft)] peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-[1rem] peer-focus:top-2.5 peer-focus:text-[0.72rem] peer-focus:text-gold";

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <label htmlFor={id} className={lab}>
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
    </div>
  );
}

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          phone: f.get("phone"),
          email: f.get("email"),
          message: f.get("message"),
          website: f.get("website"),
          consent: f.get("consent") === "on",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Mesaj gönderilemedi.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mesaj gönderilemedi.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="grid place-items-center py-12 text-center" style={{ animation: "lb-fade 600ms var(--ease-soft)" }}>
        <span className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-gold text-navy">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p className="font-display text-3xl text-ivory">Mesajınız alındı</p>
        <p className="mt-3 max-w-xs text-ivory/70">En kısa sürede sizinle iletişime geçeceğim.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field id="name" label="Adınız soyadınız" required>
        <input id="name" name="name" required placeholder="Adınız soyadınız" autoComplete="name" className={box} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="phone" label="Telefon">
          <input id="phone" name="phone" type="tel" placeholder="Telefon" autoComplete="tel" className={box} />
        </Field>
        <Field id="email" label="E-posta">
          <input id="email" name="email" type="email" placeholder="E-posta" autoComplete="email" className={box} />
        </Field>
      </div>
      <p className="-mt-1 px-1 text-xs text-ivory/55">Size dönüş yapabilmem için telefon ya da e-postadan en az birini yazmanız yeterli.</p>
      <Field id="message" label="Mesajınız" required>
        <textarea id="message" name="message" required rows={5} placeholder="Mesajınız" className={`${box} min-h-40 resize-y`} />
      </Field>

      {/* Bot tuzağı */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Web sitesi
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="group flex cursor-pointer items-start gap-3.5 rounded-2xl px-1 py-2 text-sm leading-relaxed text-ivory/70">
        <input type="checkbox" name="consent" required className="peer sr-only" />
        <span
          aria-hidden="true"
          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-ivory/[0.07] text-transparent shadow-[inset_0_0_0_1.5px_rgba(248,245,238,0.35)] transition-[background-color,color,box-shadow] duration-500 peer-checked:bg-gold peer-checked:text-navy peer-checked:shadow-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-gold)]"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <span>
          Kişisel verilerimin iletişim amacıyla işlenmesine ilişkin{" "}
          <a href="/kvkk" target="_blank" className="text-ivory underline decoration-gold underline-offset-4">
            KVKK aydınlatma metnini
          </a>{" "}
          okudum, onaylıyorum.
        </span>
      </label>

      {state === "error" && (
        <p role="alert" className="rounded-xl bg-[#e07a72]/15 px-4 py-3 text-sm text-[#ffc9c4]">
          {error}
        </p>
      )}

      <button type="submit" disabled={state === "sending"} className="btn btn-light mt-2 disabled:opacity-60">
        {state === "sending" ? "Gönderiliyor" : "Mesajı gönder"}
        <span className="btn-dot">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>
    </form>
  );
}
