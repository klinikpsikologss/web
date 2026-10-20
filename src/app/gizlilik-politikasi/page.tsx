import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getLegal } from "@/lib/legal";
import { getContent, siteOf } from "@/lib/cms/content";

export async function generateMetadata(): Promise<Metadata> {
  const doc = getLegal(siteOf(await getContent()), "gizlilik-politikasi");
  return {
    title: { absolute: `${doc.title} | Klinik Psikolog Selin Sak` },
    description: doc.description,
    alternates: { canonical: "/gizlilik-politikasi" },
    // Metinler müşteri onayından geçene kadar arama sonuçlarında görünmesin.
    robots: { index: false, follow: true },
  };
}

export default function Page() {
  return <LegalPage slug="gizlilik-politikasi" />;
}
