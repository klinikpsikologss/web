import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getLegal } from "@/lib/legal";
import { getContent, siteOf } from "@/lib/cms/content";

export async function generateMetadata(): Promise<Metadata> {
  const doc = getLegal(siteOf(await getContent()), "kvkk");
  return {
    title: { absolute: `${doc.title} | Klinik Psikolog Selin Sak` },
    description: doc.description,
    alternates: { canonical: "/kvkk" },
    // Metinler müşteri onayından geçene kadar arama sonuçlarında görünmesin.
    robots: { index: false, follow: true },
  };
}

export default function Page() {
  return <LegalPage slug="kvkk" />;
}
