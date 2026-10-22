// Tüm sabit site bilgileri tek yerde. Telefon, e-posta, adres vb. değişirse burası güncellenir.
export const site = {
  name: "Klinik Psikolog Selin Sak",
  shortName: "Selin Sak",
  role: "Klinik Psikolog",
  url: "https://www.klinikpsikologselinsak.com",
  description:
    "Klinik Psikolog Selin Sak | Bilişsel ve Davranışçı Terapiler (BDT) yaklaşımıyla yüz yüze ve online yetişkinlerle bireysel psikoterapi ve çift terapisi hizmeti sunmaktadır.",
  phone: "0532 272 36 14",
  phoneHref: "tel:+905322723614",
  whatsappHref: "https://wa.me/905322723614",
  email: "klinikpsikolog@selinsak.com",
  // "Randevu Al" butonları doğrudan WhatsApp sohbetini açar (ön tanımlı mesajla).
  appointmentUrl: "https://wa.me/905322723614?text=Merhaba%2C%20randevu%20almak%20istiyorum.",
  address: {
    street: "Borazanlar Mah. 406. Sk. Ata Konutları B Blok No: 1 Kat: 4 Daire: 11",
    district: "Merkez",
    city: "Bolu",
  },
  instagram: "https://www.instagram.com/klinikpsikologselinsak/",
  linkedin: "https://tr.linkedin.com/in/selin-sak-36a268185",
} as const;

export const nav = [
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/egitimler-ve-sertifikalar", label: "Eğitimler ve Sertifikalar" },
  { href: "/calisma-alanlari", label: "Çalışma Alanları" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
] as const;
