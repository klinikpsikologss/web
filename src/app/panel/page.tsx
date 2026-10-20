import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/cms/auth";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function PanelLogin() {
  if (await isAuthed()) redirect("/panel/ozet");
  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-navy px-5 py-12">
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-52 -right-32 h-[38rem] w-[38rem] rounded-full bg-navy-soft/70 blur-3xl" />
      <div className="relative w-full max-w-[26rem] rounded-[1.5rem] bg-paper/95 p-8 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7)] backdrop-blur sm:p-10" style={{ animation: "lb-fade 700ms var(--ease-soft)" }}>
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-center text-3xl">Yönetim paneli</h1>
        <p className="mb-7 mt-2 text-center text-sm text-muted">Devam etmek için giriş yapın.</p>
        <LoginForm />
      </div>
    </div>
  );
}
