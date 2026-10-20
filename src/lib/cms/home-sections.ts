// Ana sayfanın sıralanabilir bölümleri (hero en üstte, iletişim bandı en altta sabittir).
export const HOME_SECTIONS = [
  { id: "hizmetler", label: "Hizmetler" },
  { id: "galeri", label: "Klinik görselleri" },
  { id: "calisma-alanlari", label: "Çalışma alanları" },
  { id: "hakkimda", label: "Hakkımda" },
  { id: "blog", label: "Blog" },
  { id: "sss", label: "Sık sorulan sorular" },
] as const;

export const HOME_ORDER_DEFAULT: string[] = HOME_SECTIONS.map((s) => s.id);

export const sectionLabel = (id: string) => HOME_SECTIONS.find((s) => s.id === id)?.label ?? id;
