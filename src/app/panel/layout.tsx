import type { Metadata } from "next";
import { ToastProvider } from "@/components/panel/kit";

export const metadata: Metadata = {
  title: { absolute: "Yönetim Paneli" },
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
