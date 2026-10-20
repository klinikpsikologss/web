import { CategoryIcon } from "./Icons";

/** Her çalışma alanı başlığı için konuya özgü çizgi simge (24×24 ızgarada). */
const glyphs: Record<string, React.ReactNode> = {
  // Kaygı ve anksiyete
  "anksiyete-bozukluklari": <path d="M12 12a1.5 1.5 0 0 1 3 0 3.5 3.5 0 0 1-7 0 5.5 5.5 0 0 1 11 0 7.5 7.5 0 0 1-15 0" />,
  "yaygin-kaygi-bozuklugu": (
    <>
      <path d="M2 7c2-3 3 3 5 0s3 3 5 0 3 3 5 0 3 3 5 0" />
      <path d="M2 12c2-3 3 3 5 0s3 3 5 0 3 3 5 0 3 3 5 0" opacity=".7" />
      <path d="M2 17c2-3 3 3 5 0s3 3 5 0 3 3 5 0 3 3 5 0" opacity=".45" />
    </>
  ),
  "panik-bozukluk": <path d="M2 12h5l2-7 4 14 2-7h7" />,
  "ozgul-fobiler": (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
  "sosyal-anksiyete": (
    <>
      <circle cx="6" cy="8" r="2" />
      <circle cx="12" cy="8" r="2" />
      <path d="M2.5 17a3.5 3.5 0 0 1 7 0M8.5 17a3.5 3.5 0 0 1 7 0" />
      <circle cx="19.5" cy="12" r="1.5" opacity=".5" />
      <path d="M17 19a2.5 2.5 0 0 1 5 0" opacity=".5" />
    </>
  ),
  "saglik-kaygisi": (
    <>
      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.7-7 10-7 10z" />
      <path d="M12 9v5M9.5 11.5h5" />
    </>
  ),
  "obsesif-kompulsif-bozukluk": (
    <>
      <path d="M20 12a8 8 0 1 1-2.5-5.8M20 4v4h-4" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  "travma-sonrasi-stres-bozuklugu": <path d="M13 2L5 14h6l-1 8 8-12h-6z" />,

  // Duygudurum ve yas
  depresyon: (
    <>
      <path d="M7 15a4 4 0 0 1 .5-8 5 5 0 0 1 9.5 1.5A3.5 3.5 0 0 1 17 15z" />
      <path d="M8 18v2.5M12 18v2.5M16 18v2.5" opacity=".6" />
    </>
  ),
  "uzamis-yas": (
    <>
      <path d="M9.5 12h5v9h-5z" />
      <path d="M12 8c-1.8-1.6-1.2-3.2 0-4.5 1.2 1.3 1.8 2.9 0 4.5z" />
      <path d="M7 21h10" opacity=".6" />
    </>
  ),
  "duygudurum-sorunlari": (
    <>
      <path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z" />
      <path d="M17 3v4M15 5h4" />
    </>
  ),

  // İlişkiler ve iletişim
  "iletisim-sorunlari": (
    <>
      <path d="M3 4h12v8H8l-3 3v-3H3z" />
      <path d="M13 12h8v7h-2v3l-3-3h-3z" />
    </>
  ),
  "iliski-problemleri": (
    <>
      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.7-7 10-7 10z" />
      <path d="M12.5 7.5L10.5 11l3 2-1.5 3.5" />
    </>
  ),
  "aile-ici-iletisim-ve-catismalar": (
    <>
      <path d="M3 11l9-7 9 7v9H3z" />
      <circle cx="9" cy="13" r="1.5" />
      <circle cx="15" cy="13" r="1.5" />
      <circle cx="12" cy="16.5" r="1" />
    </>
  ),

  // Yeme sorunları
  "yeme-bozukluklari": (
    <>
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="2.5" opacity=".5" />
      <path d="M2.5 4v5a1.5 1.5 0 0 0 3 0V4M4 9v11M21 4c-2 1-2.5 4-2.5 7H21v9" />
    </>
  ),
  "anoreksiya-nervoza": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 10a4 4 0 0 1 8 0M12 10l1.8-2.8" />
      <path d="M8 16h8" opacity=".5" />
    </>
  ),
  "bulimia-nervoza": (
    <>
      <path d="M20 12a8 8 0 0 0-14-5.3M6 3v4h4" />
      <path d="M4 12a8 8 0 0 0 14 5.3M18 21v-4h-4" />
    </>
  ),
  "tikinircasina-yeme-bozuklugu": (
    <>
      <path d="M4 13h16a8 8 0 0 1-16 0z" />
      <circle cx="8.5" cy="10" r="1.8" />
      <circle cx="12.5" cy="8.5" r="1.8" />
      <circle cx="16" cy="10.5" r="1.8" />
      <circle cx="11" cy="5" r="1.5" opacity=".6" />
    </>
  ),
  "duygusal-yeme": (
    <>
      <path d="M12 12s-4.5-2.8-4.5-6.3A2.6 2.6 0 0 1 12 4a2.6 2.6 0 0 1 4.5 1.7C16.5 9.2 12 12 12 12z" />
      <path d="M5 15h14a7 7 0 0 1-14 0z" />
    </>
  ),

  // Stres ve günlük yaşam
  "stres-ve-gunluk-yasam-sorunlari": (
    <>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 9v4l3 2M9.5 3h5M3.5 6l2 2M20.5 6l-2 2" />
    </>
  ),
  "uyum-sorunlari-ve-yasam-degisiklikleri": <path d="M12 21v-9M12 12L6 6M12 12l6-6M6 10V6h4M18 10V6h-4" />,
  tukenmislik: (
    <>
      <rect x="2.5" y="8" width="17" height="8" rx="2" />
      <path d="M22 10.5v3M5 10.5h3v3H5z" />
    </>
  ),
  "ofke-sorunlari": <path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 2.5 1.5 2C11 8 11 5.5 12 3z" />,
  "degersizlik-ve-yetersizlik-algisi": (
    <>
      <ellipse cx="12" cy="10" rx="6" ry="7" />
      <path d="M12 3l-1.5 5 3 2-2 4M12 17v5M9 22h6" />
    </>
  ),
  "erteleme-ve-karar-verme-zorluklari": <path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />,
  "dikkat-eksikligi-ve-hiperaktivite-bozuklugu": (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="12" cy="12" r="0.8" />
      <circle cx="3.5" cy="4.5" r="0.8" />
      <circle cx="21" cy="5" r="0.8" />
      <circle cx="20.5" cy="20.5" r="0.8" />
      <circle cx="3" cy="19" r="0.8" />
    </>
  ),

  // Özel alanlar
  bagimlilik: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  psikoonkoloji: (
    <>
      <path d="M12 3c3 0 4.5 2.5 4.5 4.5S14 13 12 14c-2-1-4.5-4.5-4.5-6.5S9 3 12 3z" />
      <path d="M12 14l-3.5 7M12 14l3.5 7" />
    </>
  ),
  "hamilelik-ve-dogum-sonrasi-surecler": (
    <>
      <path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z" />
      <path d="M12 16s-3-1.8-3-4.2a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8C15 14.2 12 16 12 16z" />
    </>
  ),
  "infertilite-ve-tup-bebek-sureci": (
    <>
      <path d="M12 21v-9" />
      <path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6z" />
      <path d="M12 17c0-3-2-5-6-5 0 3 2 5 6 5z" />
    </>
  ),
};

/** Çalışma alanı sayfası için konuya özgü vektörel görsel: lacivert zemin, ince altın halkalar ve başlığa özel çizgi simge. */
export function SpecialtyArt({ slug, category, label }: { slug: string; category: string; label: string }) {
  const glyph = glyphs[slug];
  return (
    <div role="img" aria-label={label} className="relative isolate grid aspect-[4/5] place-items-center overflow-hidden rounded-[0.5rem] bg-gradient-to-br from-navy-soft via-navy to-navy-deep">
      <div className="absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-gold/20 max-sm:hidden blur-3xl" aria-hidden="true" />
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full text-gold" fill="none" stroke="currentColor" aria-hidden="true">
        <circle cx="200" cy="250" r="64" strokeWidth="1" opacity=".55" />
        <circle cx="200" cy="250" r="110" strokeWidth="1" opacity=".38" />
        <circle cx="200" cy="250" r="160" strokeWidth="1" opacity=".24" />
        <circle cx="200" cy="250" r="214" strokeWidth="1" opacity=".14" />
        <circle cx="305" cy="145" r="4" fill="currentColor" stroke="none" opacity=".7" />
        <circle cx="96" cy="372" r="3" fill="currentColor" stroke="none" opacity=".5" />
        <circle cx="330" cy="362" r="2.5" fill="currentColor" stroke="none" opacity=".4" />
      </svg>
      {glyph ? (
        <svg viewBox="0 0 24 24" width="140" height="140" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
          {glyph}
        </svg>
      ) : (
        <CategoryIcon name={category} width={132} height={132} strokeWidth={0.7} className="text-gold" />
      )}
    </div>
  );
}
