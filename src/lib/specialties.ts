// Uzmanlık alanları. Her başlığın kendi sayfası var: /calisma-alanlari/[slug]
// İçerik yazıldıkça ilgili kaydın `body` alanına paragraflar eklenir (dizi içinde metin).
// Görsel: sayfalarda başlığa özel vektör çizim (SpecialtyArt) kullanılır; panelden özel görsel eklenirse o gösterilir.

export type CategoryKey = "kaygi" | "duygu" | "iliski" | "yeme" | "gunluk" | "ozel";

export type Specialty = {
  slug: string;
  title: string;
  category: CategoryKey;
  /** Sayfa için kısa özet (ileride doldurulabilir). */
  summary?: string;
  /** Sayfa içeriği paragrafları. Boşsa sayfa "hazırlanıyor" durumunda kalır ve arama motorlarına kapalıdır. */
  body?: string[];
};

export const categories: { key: CategoryKey; title: string; lead: string }[] = [
  { key: "kaygi", title: "Kaygı ve Anksiyete", lead: "Endişenin, korkunun ve zihinsel baskının gündelik hayata yaptığı etkiyi birlikte ele alırız." },
  { key: "duygu", title: "Duygudurum ve Yas", lead: "Ağırlaşan ruh halini ve kayıpların ardından gelen süreci anlamaya odaklanırız." },
  { key: "iliski", title: "İlişkiler ve İletişim", lead: "Çift, aile ve yakın ilişkilerdeki örüntüleri fark etmek için güvenli bir alan." },
  { key: "yeme", title: "Yeme Sorunları", lead: "Yeme ve beden algısıyla kurulan ilişkiyi yargılamadan, bilimsel çerçevede ele alırız." },
  { key: "gunluk", title: "Stres ve Günlük Yaşam", lead: "Tükenmişlikten erteleme alışkanlığına, günlük hayatı zorlaştıran süreçler." },
  { key: "ozel", title: "Özel Alanlar", lead: "Daha özel destek gerektiren yaşam süreçlerinde yanınızda olmak." },
];

export const specialties: Specialty[] = [
  // Kaygı ve Anksiyete
  { slug: "anksiyete-bozukluklari", title: "Kaygı (anksiyete) bozuklukları", category: "kaygi" },
  { slug: "yaygin-kaygi-bozuklugu", title: "Yaygın kaygı bozukluğu", category: "kaygi" },
  { slug: "panik-bozukluk", title: "Panik bozukluk", category: "kaygi" },
  { slug: "ozgul-fobiler", title: "Özgül fobiler", category: "kaygi" },
  { slug: "sosyal-anksiyete", title: "Sosyal anksiyete", category: "kaygi" },
  { slug: "saglik-kaygisi", title: "Sağlık kaygısı", category: "kaygi" },
  { slug: "obsesif-kompulsif-bozukluk", title: "Obsesif kompulsif bozukluk", category: "kaygi" },
  { slug: "travma-sonrasi-stres-bozuklugu", title: "Travma sonrası stres bozukluğu", category: "kaygi" },
  // Duygudurum ve Yas
  { slug: "depresyon", title: "Depresyon", category: "duygu" },
  { slug: "uzamis-yas", title: "Uzamış yas", category: "duygu" },
  { slug: "duygudurum-sorunlari", title: "Duygudurum sorunları", category: "duygu" },
  // İlişkiler ve İletişim
  { slug: "iletisim-sorunlari", title: "İletişim sorunları", category: "iliski" },
  { slug: "iliski-problemleri", title: "İlişki problemleri", category: "iliski" },
  { slug: "aile-ici-iletisim-ve-catismalar", title: "Aile içi iletişim ve çatışmalar", category: "iliski" },
  // Yeme Sorunları
  { slug: "yeme-bozukluklari", title: "Yeme bozuklukları", category: "yeme" },
  { slug: "anoreksiya-nervoza", title: "Anoreksiya nervoza", category: "yeme" },
  { slug: "bulimia-nervoza", title: "Bulimia nervoza", category: "yeme" },
  { slug: "tikinircasina-yeme-bozuklugu", title: "Tıkınırcasına yeme bozukluğu", category: "yeme" },
  { slug: "duygusal-yeme", title: "Duygusal yeme", category: "yeme" },
  // Stres ve Günlük Yaşam
  { slug: "stres-ve-gunluk-yasam-sorunlari", title: "Stres ve günlük yaşam sorunları", category: "gunluk" },
  { slug: "uyum-sorunlari-ve-yasam-degisiklikleri", title: "Uyum sorunları ve yaşam değişiklikleri", category: "gunluk" },
  { slug: "tukenmislik", title: "Tükenmişlik", category: "gunluk" },
  { slug: "ofke-sorunlari", title: "Öfke sorunları", category: "gunluk" },
  { slug: "degersizlik-ve-yetersizlik-algisi", title: "Değersizlik ve yetersizlik algısı", category: "gunluk" },
  { slug: "erteleme-ve-karar-verme-zorluklari", title: "Erteleme ve karar verme zorlukları", category: "gunluk" },
  { slug: "dikkat-eksikligi-ve-hiperaktivite-bozuklugu", title: "Dikkat eksikliği ve hiperaktivite bozukluğu", category: "gunluk" },
  // Özel Alanlar
  { slug: "bagimlilik", title: "Bağımlılık", category: "ozel" },
  { slug: "psikoonkoloji", title: "Psikoonkoloji", category: "ozel" },
  { slug: "hamilelik-ve-dogum-sonrasi-surecler", title: "Çocuk sahibi olma, hamilelik ve doğum sonrası süreçler", category: "ozel" },
  { slug: "infertilite-ve-tup-bebek-sureci", title: "İnfertilite ve tüp bebek süreci", category: "ozel" },
];

import { content } from "./specialty-content";

for (const sp of specialties) Object.assign(sp, content[sp.slug]);

export const getSpecialty = (slug: string) => specialties.find((s) => s.slug === slug);
export const inCategory = (key: CategoryKey) => specialties.filter((s) => s.category === key);
