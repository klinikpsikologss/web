import { PageTitle, Card } from "@/components/panel/kit";

export const dynamic = "force-dynamic";

const PAGES = [
  { to: "/", title: "Ana sayfa", note: "Bölümlerin sırası, başlıklar, görseller" },
  { to: "/hakkimda", title: "Hakkımda", note: "Tanıtım metni ve fotoğraf" },
  { to: "/egitimler-ve-sertifikalar", title: "Eğitimler ve sertifikalar", note: "Başlıklar ve açıklamalar" },
  { to: "/calisma-alanlari", title: "Çalışma alanları", note: "Giriş metni ve kartlar" },
  { to: "/hizmetler", title: "Hizmetler", note: "Terapi türleri" },
  { to: "/blog", title: "Blog", note: "Yazı listesi ve kapak görselleri" },
  { to: "/iletisim", title: "İletişim", note: "Bilgiler ve form metinleri" },
  { to: "/klinik-gorselleri", title: "Klinik görselleri", note: "Galeri başlıkları" },
];

const STEPS = [
  { title: "Tıklayın", text: "Altın çerçeveli metinlere tıklayıp doğrudan yazın.", icon: "M5 3l14 7-6 2-2 6L5 3z" },
  { title: "Değiştirin", text: "Görsellerin üzerindeki düğmeyle yeni fotoğraf yükleyin.", icon: "M3 5h18v14H3V5zm0 11l5-5 4 4 3-3 6 6M9 9.5h.01" },
  { title: "Önizleyin", text: "Ziyaretçilerin göreceği hali düzenleme araçları olmadan görün.", icon: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z" },
  { title: "Yayınlayın", text: "Hazır olunca tek tuşla herkese açın.", icon: "M5 12.5l4.5 4.5L19 7.5" },
];

export default function Launcher() {
  return (
    <>
      <PageTitle title="Siteyi özelleştir" lead="Bir sayfa seçin; site canlı haliyle açılır. Metne tıklayıp yazabilir, görselleri değiştirebilir, ana sayfadaki bölümleri taşıyabilirsiniz." />
      <Card className="mb-8">
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-3xl">Nasıl çalışır?</h2>
          <p className="text-sm text-muted">Dört adımda: yazın, görseli değiştirin, kontrol edin, yayınlayın.</p>
        </div>
        <ol className="relative grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="absolute left-[2.5rem] right-[2.5rem] top-6 hidden h-px bg-gradient-to-r from-gold-deep/10 via-gold-deep/40 to-gold-deep/10 lg:block" />
          {STEPS.map((st, i) => (
            <li key={st.title} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-gold shadow-[0_0_0_6px_var(--color-paper),0_16px_30px_-14px_rgba(15,39,71,0.6)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={st.icon} />
                </svg>
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-gold text-[0.7rem] font-semibold text-navy">{i + 1}</span>
              </span>
              <span>
                <span className="block font-medium text-navy">{st.title}</span>
                <span className="mt-1 block text-[0.92rem] leading-relaxed text-muted">{st.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </Card>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.map((p) => (
          <li key={p.to}>
            <a
              href={`/api/panel/visit?mode=edit&to=${encodeURIComponent(p.to)}`}
              className="group block h-full rounded-[1.1rem] bg-paper/90 p-6 shadow-[0_0_0_1px_rgba(15,39,71,0.07),0_24px_50px_-36px_rgba(15,39,71,0.35)] transition-[transform,box-shadow] duration-700 [transition-timing-function:var(--ease-soft)] hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(183,155,98,0.6),0_30px_60px_-34px_rgba(15,39,71,0.45)]"
            >
              <h2 className="text-2xl">{p.title}</h2>
              <p className="mt-1.5 text-sm text-muted">{p.note}</p>
              <span className="mt-5 inline-block text-sm font-medium text-gold-deep">
                Düzenle <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
