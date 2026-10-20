// Eğitimler ve sertifikalar sayfasındaki gruplar. Her kayıt: başlık + (isteğe bağlı) alt başlık + açıklama.
export type EducationItem = {
  title: string;
  /** Başlığın altında altın renkte görünen kısa satır (ör. program adı) */
  detail?: string;
  /** Sağ sütundaki açıklama metni */
  text?: string;
  /** Sertifika / belge görseli */
  image?: string;
};
export type EducationGroup = { title: string; icon: "egitim" | "sertifika" | "klinik" | "gonullu"; items: EducationItem[] };

export const groups: EducationGroup[] = [
  {
    title: "Akademik eğitim",
    icon: "egitim",
    items: [
      {
        title: "Beykoz Üniversitesi",
        detail: "Klinik Psikoloji Tezli Yüksek Lisans Programı",
        text: "Klinik Psikoloji alanındaki yüksek lisans eğitimini, Prof. Dr. Ebru Şalcıoğlu danışmanlığında yürüttüğü “Kanser Hastalarında Kontrol Odağı ve Travma Sonrası Büyümenin İlişkisinde Öz Yeterliliğin Aracı Rolü” başlıklı tez çalışmasıyla programı birincilikle tamamlamıştır.",
      },
      {
        title: "Başkent Üniversitesi",
        detail: "Psikoloji Bölümü",
        text: "Başkent Üniversitesi Psikoloji Bölümü’nden onur derecesiyle mezun olmuştur. Lisans eğitimi süresince üniversite bünyesinde düzenlenen bilimsel etkinliklerde ve çeşitli akademik projelerde görev almıştır.",
      },
    ],
  },
  {
    title: "Mesleki eğitimler ve sertifikalar",
    icon: "sertifika",
    items: [
      {
        title: "Bilişsel ve Davranışçı Terapiler Eğitimi",
        text: "DATEM bünyesinde Prof. Dr. Ebru Şalcıoğlu tarafından yürütülen 120 saatlik ileri düzey Bilişsel ve Davranışçı Terapiler Eğitimi vaka formülasyonu ve temel BDT yöntemlerinin yanı sıra kaygı bozuklukları, travmatik stres sorunları, obsesif-kompulsif bozukluk, depresyon ve yeme bozukluklarının BDT çerçevesinde ele alınmasına yönelik eğitim almıştır.",
      },
      {
        title: "Bilişsel ve Davranışçı Terapiler Süpervizyonu",
        text: "Klinik Psikoloji yüksek lisans eğitimi kapsamında, Prof. Dr. Ebru Şalcıoğlu’nun süpervizyonunda bir akademik yıl boyunca danışanlarla psikoterapi süreçleri yürütmüş ve 108 saatlik BDT süpervizyon eğitimi tamamlamıştır.",
      },
      {
        title: "Bilişsel ve Davranışçı Terapiler Süpervizörlük Eğitmenliği",
        text: "Prof. Dr. Ebru Şalcıoğlu tarafından DATEM bünyesinde verilen 96 saatlik süpervizörlük eğitimi kapsamında, ruh sağlığı uzmanlarının klinik becerilerini geliştirmeye yönelik süpervizyon süreçlerinin yürütülmesi, klinik uygulamaların değerlendirilmesi ve etkili geri bildirim verilmesi üzerine bilgi ve beceri edinmiştir.",
      },
      {
        title: "Bilişsel ve Davranışçı Terapilerde Mindfulness Uygulamaları",
        text: "DATEM bünyesinde Prof. Dr. Ebru Şalcıoğlu tarafından gerçekleştirilen 12 saatlik eğitim programında, farkındalık temelli uygulamaların Bilişsel ve Davranışçı Terapiler yaklaşımıyla psikoterapi süreçlerinde kullanımına yönelik eğitim almıştır.",
      },
      {
        title: "Psikoonkoloji Eğitimi ve Süpervizyon Uygulaması",
        text: "Psiko-Onkoloji Derneği tarafından düzenlenen ve Dünya Psiko-Onkoloji Birliği (IPOS) Federasyonu tarafından onaylanan 36 saatlik Psikoonkoloji Eğitimi ve Süpervizyon Uygulaması programını tamamlamıştır.",
      },
      {
        title: "Gottman Çift Terapisi I. Düzey ve II. Düzey Eğitimi",
        text: "Gottman Enstitüsü onaylı, toplam 63 saatlik I. ve II. Düzey eğitim programlarını tamamlamıştır. Eğitimler kapsamında Gottman Çift Terapisi yaklaşımının kuramsal temelleri ve uygulama yöntemlerine ilişkin bilgi ve beceri edinmiştir.",
      },
    ],
  },
];
