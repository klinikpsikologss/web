// Hakkımda sayfası içeriği: biyografi, üyelikler ve bilimsel/mesleki etkinlikler.
export const bio = [
  "Klinik Psikolog Selin Sak, Psikoloji lisans eğitimini Başkent Üniversitesi’nde onur derecesiyle, Klinik Psikoloji yüksek lisans eğitimini ise Beykoz Üniversitesi’nde birincilikle tamamlamıştır. Yüksek lisans sürecinde Prof. Dr. Ebru Şalcıoğlu’nun süpervizörlüğünde bir akademik yıl boyunca danışanlarla psikoterapi süreçleri yürütmüş ve 108 saatlik İleri Düzey Bilişsel ve Davranışçı Terapiler (BDT) süpervizyon eğitimi almıştır.",
  "Mesleki gelişimi kapsamında Bilişsel ve Davranışçı Terapiler başta olmak üzere çift terapisi, psikoonkoloji ve farkındalık temelli uygulamalar alanlarında çeşitli eğitim ve süpervizyon programlarını tamamlamıştır.",
  "Yüksek lisans eğitiminin ardından DATEM Terapist Ağı bünyesinde Prof. Dr. Ebru Şalcıoğlu’nun konsültasyonuyla psikoterapi süreçleri yürütmüştür. Klinik çalışmaları kapsamında farklı psikolojik sorunlarla 1000 saatin üzerinde seans deneyimi edinmiştir. Bunun yanı sıra konferans, seminer ve vaka ek derslerinde konuşmacı olarak yer alarak mesleki bilgi ve deneyimlerini paylaşmıştır. DATEM ile iş birliği devam etmekte olup, Prof. Dr. Ebru Şalcıoğlu’nun süpervizyonunda meslektaşlarına süpervizyon vermekte ve çeşitli mesleki çalışmalarda aktif olarak yer almaktadır.",
  "Şu anda kendi kliniğinde danışanlarla yüz yüze ve online psikoterapi süreçleri yürütmektedir. Çalışmalarında Bilişsel ve Davranışçı Terapiler yaklaşımı doğrultusunda, bireyin yaşadığı güçlükleri yalnızca belirtiler üzerinden değil, bu güçlükleri ortaya çıkaran ve sürdüren süreçler üzerinden ele alan formülasyon temelli bir yaklaşım benimser. Her danışanın deneyiminin kendine özgü olduğunu gözeterek terapi sürecini bilimsel temeller ve etik ilkeler doğrultusunda, bireysel ihtiyaçlara göre ve danışanla birlikte şekillendirmeyi önemser.",
  "Klinik Psikolog Selin Sak, terapi sürecinde danışanlarıyla güvenli, yargısız ve iş birliğine dayalı bir terapötik ilişki kurmayı temel alır. Danışanların yaşadıkları güçlükleri ve bunlarla ilişkili duygu, düşünce ve davranış örüntülerini daha iyi anlamalarına, farkındalık geliştirmelerine ve değişime yönelik daha işlevsel adımlar atmalarına eşlik etmeyi amaçlar.",
];

export type Membership = { name: string; role: string };
export const memberships: Membership[] = [
  { name: "Davranış Terapileri Derneği", role: "Kurucu Üye" },
  { name: "Türk Psikologlar Derneği", role: "Üye" },
  { name: "Psiko-Onkoloji Derneği", role: "Üye" },
];

export type ActivityItem = { title: string; place: string; date: string };
export type ActivityGroup = { title: string; lead: string; items: ActivityItem[] };

const datem = "DATEM Eğitim – Vaka Formülasyonu Temelli BDT Uygulamaları";
const datemWs = "DATEM Eğitim – Formülasyon Temelli BDT: Uygulama ve Beceri Geliştirme Atölyesi";
const ptsd = "Travma Sonrası Stres Bozukluğu Vaka Sunumu";
const eating = "Yeme Bozuklukları Vaka Sunumu";
const basic = "Temel BDT Yöntemleri Vaka Sunumu";

export const activities: ActivityGroup[] = [
  {
    title: "Konferanslar, paneller ve seminerler",
    lead: "Üniversitelerde, derneklerde ve diğer kurumlarda konuşmacı olarak yer aldığı etkinlikler.",
    items: [
      { title: "Kadının Toplumsal Rolleri ve Psikososyal Boyutu", place: "Bolu Abant İzzet Baysal Üniversitesi, KATUM ve BAİBÜ Psikoloji Topluluğu – Kadın ve Toplum Paneli", date: "9 Mart 2026" },
      { title: ptsd, place: "Bolu Abant İzzet Baysal Üniversitesi, BAİBÜ Psikoloji Topluluğu – BDT Zirvesi: Kuramdan Kliniğe Bilişsel ve Davranışçı Terapiler", date: "3 Kasım 2025" },
      { title: "Etik İlkeler ve Bilimin Işığında Psikoterapistlik Yolculuğu", place: "Girişimci Psikologlar Derneği (GİPDER) – Online Yaz Zirvesi", date: "31 Ağustos 2025" },
      { title: "Vaka Formülasyonu ve Terapi Planlama", place: "İstanbul Aydın Üniversitesi – İstanbul PDR Günleri", date: "22 Mayıs 2025" },
      { title: ptsd, place: "İstanbul Arel Üniversitesi – Psikoloji Günü", date: "28 Nisan 2025" },
      { title: "Duyguların İşlevini Anlamak: Klinik Bir Perspektif", place: "Girişimci Psikologlar Derneği (GİPDER) – Online Psikoloji Haftası", date: "6 Nisan 2025" },
      { title: "Vaka Formülasyonu ve Terapi Planlama: BDT’den Bir Perspektif", place: "Boğaziçi Üniversitesi, BÜDAV (Davranış Bilimleri Kulübü) – 10. Psikolojik Danışma Sempozyumu", date: "23 Şubat 2025" },
      { title: "Kanser Sürecinde Psikolojik Destek ve İyi Oluş", place: "Bahçeşehir Üniversitesi, Rotaract Kulübü – Meme Kanseri Bilinçlendirme Toplantısı", date: "9 Ekim 2024" },
      { title: "Beslenme Bozukluklarına Psikolojik Perspektiften Bakış", place: "İstanbul Kent Üniversitesi – 3. Kariyer Günleri", date: "16 Mayıs 2024" },
      { title: ptsd, place: "Ankara Sosyal Bilimler Üniversitesi Kuzey Kıbrıs Yerleşkesi, Psikoloji Kulübü – 1. Psikoloji Günleri", date: "9 Mayıs 2024" },
      { title: "Deprem Kaygısı ve Baş Etme Yöntemleri", place: "İzzet Baysal Anadolu Lisesi", date: "11 Ocak 2023" },
      { title: "Ergenlikte Akran İlişkileri ve Risk Alma Davranışlarının İncelenmesi: Aile İlişkilerinin Aracı Rolü", place: "Koç Üniversitesi – 3. Gelişim Psikolojisi Sempozyumu (Sözlü Bildiri)", date: "8 Eylül 2022" },
    ],
  },
  {
    title: "Atölyeler ve vaka sunumları",
    lead: "DATEM bünyesinde gerçekleştirdiği vaka ek dersleri ve formülasyon temelli BDT atölyelerindeki sunumlar.",
    items: [
      { title: ptsd, place: datem, date: "3 Haziran 2026" },
      { title: eating, place: datem, date: "20 Mayıs 2026" },
      { title: "Değeri Annelik Rolüne Sıkışmış Bir Vaka", place: datemWs, date: "11–12 Nisan 2026" },
      { title: basic, place: datem, date: "3 Mart 2026" },
      { title: ptsd, place: datem, date: "17 Şubat 2026" },
      { title: basic, place: datem, date: "18 Kasım 2025" },
      { title: eating, place: datem, date: "14 Ekim 2025" },
      { title: "Kanserle Bedenine Yabancılaşan Bir Vaka", place: datemWs, date: "4–5 Ekim 2025" },
      { title: ptsd, place: datem, date: "3 Haziran 2025" },
      { title: eating, place: datem, date: "28 Mayıs 2025" },
      { title: basic, place: datem, date: "5 Mart 2025" },
      { title: ptsd, place: datem, date: "18 Şubat 2025" },
      { title: basic, place: datem, date: "19 Kasım 2024" },
      { title: ptsd, place: datem, date: "15 Mayıs 2024" },
      { title: eating, place: datem, date: "8 Mayıs 2024" },
      { title: ptsd, place: datem, date: "7 Şubat 2023" },
    ],
  },
  {
    title: "Akademik görevler",
    lead: "Üniversite bünyesinde yürüttüğü akademik görevler.",
    items: [
      { title: "Başkent Üniversitesi – Akademik Danışma Kurulu Üyeliği", place: "Başkent Üniversitesi Akademik Danışma Kurulu üyesi olarak görev aldı.", date: "Mayıs 2022" },
      { title: "Etik İlkeler Ders Asistanlığı", place: "Lisans eğitimi sürecinde Dr. Öğr. Üyesi Esra Güven’in yürüttüğü Etik İlkeler dersinde asistanlık yaptı.", date: "Nisan 2020" },
    ],
  },
  {
    title: "Gönüllü çalışmalar",
    lead: "Toplumsal katkıya yönelik yürüttüğü gönüllü çalışmalar.",
    items: [
      { title: "DATEM – 6 Şubat Depremleri Psikolojik Destek Çalışmaları", place: "DATEM tarafından yürütülen proje kapsamında, 6 Şubat depremlerinden etkilenen bireylere gönüllü psikolojik destek verdi.", date: "Ekim 2023" },
      { title: "Kanser Savaşçıları Derneği", place: "Kanser Savaşçıları Derneği tarafından yürütülen proje kapsamında kanser hastalarına psikoterapi desteği verdi.", date: "Mart 2023" },
      { title: "Türk Psikologlar Derneği – Travma, Afet ve Kriz Birimi", place: "Türk Psikologlar Derneği Travma, Afet ve Kriz Birimi’nde gönüllü psikolog olarak yer aldı.", date: "Ekim 2019" },
    ],
  },
];
