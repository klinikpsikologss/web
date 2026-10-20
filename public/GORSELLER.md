# public/ klasörüne eklenecek dosyalar

Dosya yoksa site yer tutucu gösterir; eklenince otomatik kullanılır (build/dev yeniden başlatılabilir).

| Dosya | Nerede kullanılır |
|---|---|
| `logo.svg` | Üst menü, açık zemin için yatay logo (Ψ + SELİN SAK / Klinik Psikolog) |
| `logo-light.svg` | Footer, lacivert zemin için açık renkli yatay logo |
| `favicon.ico` | Tarayıcı sekmesi ikonu (Ψ) |
| `apple-touch-icon.png` | 180x180, iOS ana ekran ikonu |
| `og-image.jpg` | 1200x630, paylaşım ve arama önizleme görseli |
| `selin-hero.jpg` | Ana sayfa hero, YATAY 2560x1440 (16:9). Kişi sağ %40da, sol yarı sakin olmalı 
| `selin-hakkimda.jpg` | Hakkımda sayfası ve ana sayfa tanıtım fotoğrafı (dikey 4:5) |
| `klinik-1.jpg`, `klinik-2.jpg` ... (eski adı ofis-N.jpg de çalışır) | Ana sayfa galerisi, yatay 1800x1200 (3:2) |
| `uzmanliklar/<slug>.jpg` | Her uzmanlık başlığı için görsel (4:5). Slug listesi: `src/lib/specialties.ts` |

## Sertifikalar
`public/sertifikalar/` klasörüne sertifika görsellerini (jpg/png/webp) at; `/egitimler-ve-sertifikalar` sayfasında otomatik listelenir.
Sıra dosya adına göredir: `01-...`, `02-...`. Başlık yazmak için `src/lib/certificates.ts` içindeki `captions` listesine dosya adıyla ekle.
Önerilen boyut: uzun kenar 1600 px. Klasör boşsa sertifikalar bölümü görünmez.

## Logo ve yazar fotoğrafları
| Dosya | Açıklama |
|---|---|
| `logo.svg` | Menüde kullanılan yatay logo (Ψ + yazı), açık zemin için koyu renkli. SVG önerilir, yoksa `logo.png` değil `.svg` adıyla konmalı |
| `logo-light.svg` | Footer (lacivert zemin) için açık/altın renkli aynı logo |
| `favicon.ico` | Tarayıcı sekmesi ikonu (32x32 / 48x48) |
| `apple-touch-icon.png` | 180x180, iPhone ana ekran ikonu |
| `og-image.jpg` | 1200x630, paylaşım önizlemesi |
| `selin-hakkimda.jpg` | Hakkımda sayfası, ana sayfadaki tanıtım bölümü (dikey 4:5, 1600x2000). Blog yazar yuvarlağında da kullanılır |
| `selin-avatar.jpg` | (isteğe bağlı) Blog yazar yuvarlağı için kare yüz fotoğrafı, 600x600. Yoksa selin-hakkimda.jpg kullanılır |
