export type LegalSite = { phone: string; email: string; address: { street: string; district: string; city: string } };

// Yasal sayfa metinleri. NOT: Bunlar sitedeki gerçek veri akışına göre hazırlanmış TASLAK metinlerdir.
// Müşterinin (veya avukatının) onaylı metni geldiğinde bu dosyadaki ilgili bölümler değiştirilir.
export type LegalSection = { title: string; paragraphs?: string[]; list?: string[] };
export type LegalDoc = { slug: string; title: string; lead: string; description: string; sections: LegalSection[] };

export const LEGAL_UPDATED = "Ekim 2026";

export function legalDocsFor(site: LegalSite): LegalDoc[] {
const address = `${site.address.street}, ${site.address.district}/${site.address.city}`;
const contact = `Adres: ${address}. E-posta: ${site.email}. Telefon: ${site.phone}.`;

return [
  {
    slug: "kvkk",
    title: "KVKK Aydınlatma Metni",
    description: "Klinik Psikolog Selin Sak web sitesi için 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
    lead: "6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10. maddesi uyarınca, kişisel verilerinizin nasıl işlendiğine dair bilgilendirme.",
    sections: [
      {
        title: "1. Veri sorumlusu",
        paragraphs: [`Kişisel verileriniz, veri sorumlusu sıfatıyla Klinik Psikolog Selin Sak (“Veri Sorumlusu”) tarafından işlenmektedir. ${contact}`],
      },
      {
        title: "2. İşlenen kişisel veriler",
        list: [
          "Kimlik bilgisi: ad ve soyad.",
          "İletişim bilgisi: telefon numarası ve e-posta adresi.",
          "Talep bilgisi: iletişim formundaki mesajınızın içeriği.",
          "İşlem güvenliği bilgisi: IP adresi, tarayıcı ve cihaz türü, erişim zamanı gibi sunucu kayıtları.",
        ],
        paragraphs: [
          "İletişim formunda lütfen sağlık durumunuza ilişkin ayrıntılı bilgiler gibi özel nitelikli kişisel verileri paylaşmayınız. Bu tür bilgiler yüz yüze ya da online görüşme sırasında, gizlilik çerçevesinde paylaşılmalıdır.",
        ],
      },
      {
        title: "3. Kişisel verilerin işlenme amaçları",
        list: [
          "İletişim taleplerinizi almak ve yanıtlamak,",
          "Randevu ve görüşme planlaması yapmak, hizmet hakkında bilgi vermek,",
          "Web sitesinin güvenliğini ve düzgün çalışmasını sağlamak,",
          "Hukuki yükümlülüklerin yerine getirilmesi.",
        ],
      },
      {
        title: "4. Toplama yöntemi ve hukuki sebep",
        paragraphs: [
          "Verileriniz web sitesindeki iletişim formu, e-posta ve telefon yoluyla elektronik ortamda toplanır. İletişim formu aracılığıyla paylaştığınız veriler, formdaki onayınıza (açık rıza) dayanılarak; sitenin güvenliğine ilişkin sunucu kayıtları ise Veri Sorumlusunun meşru menfaati ve hukuki yükümlülükleri kapsamında işlenir (KVKK m.5/2-f ve m.5/2-ç).",
        ],
      },
      {
        title: "5. Kişisel verilerin aktarılması",
        paragraphs: [
          "Verileriniz ticari amaçla üçüncü kişilere satılmaz ve paylaşılmaz. Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşlarına aktarılabilir. Ayrıca web sitesinin barındırılması ve iletişim formu mesajlarının e-posta ile iletilmesi için kullanılan hizmet sağlayıcıların sunucuları yurt dışında bulunabilir; bu aktarım KVKK’nın 9. maddesi çerçevesinde ve yalnızca hizmetin sunulması amacıyla yapılır.",
        ],
      },
      {
        title: "6. Saklama süresi",
        paragraphs: [
          "Verileriniz, işlenme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen süreler boyunca saklanır; sürenin sonunda silinir, yok edilir veya anonim hale getirilir.",
        ],
      },
      {
        title: "7. İlgili kişi olarak haklarınız (KVKK m.11)",
        list: [
          "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
          "İşlenmişse buna ilişkin bilgi talep etme,",
          "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
          "Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme,",
          "Eksik veya yanlış işlenmişse düzeltilmesini isteme,",
          "Kanunda öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,",
          "Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
          "İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,",
          "Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme.",
        ],
      },
      {
        title: "8. Başvuru yöntemi",
        paragraphs: [
          `Haklarınıza ilişkin taleplerinizi, kimliğinizi doğrulayacak bilgilerle birlikte ${site.email} adresine e-posta ile ya da ${address} adresine yazılı olarak iletebilirsiniz. Başvurularınız talebin niteliğine göre en geç otuz gün içinde sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi halinde Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir.`,
        ],
      },
    ],
  },
  {
    slug: "gizlilik-politikasi",
    title: "Gizlilik Politikası",
    description: "Klinik Psikolog Selin Sak web sitesinin gizlilik politikası: hangi bilgiler toplanır, nasıl kullanılır ve korunur.",
    lead: "Bu site aracılığıyla paylaştığınız bilgilerin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.",
    sections: [
      {
        title: "1. Kapsam",
        paragraphs: [
          "Bu politika, klinikpsikologselinsak.com web sitesini ziyaret eden ve site üzerinden iletişime geçen kişiler için geçerlidir. Kişisel verilerin işlenmesine ilişkin ayrıntılı bilgi için KVKK Aydınlatma Metni’ne bakabilirsiniz.",
        ],
      },
      {
        title: "2. Topladığımız bilgiler",
        paragraphs: [
          "İletişim formunu doldurduğunuzda ad soyad, telefon, e-posta ve mesajınızı paylaşırsınız. Ayrıca site güvenliği ve düzgün çalışması için IP adresi ve tarayıcı bilgisi gibi standart sunucu kayıtları tutulabilir. Sitemiz kullanıcı hesabı, üyelik ya da ödeme sistemi içermez.",
        ],
      },
      {
        title: "3. Bilgilerinizi nasıl kullanıyoruz",
        list: ["Talebinize yanıt vermek ve randevu planlamak,", "Sitenin güvenliğini sağlamak ve teknik sorunları gidermek,", "Yasal yükümlülükleri yerine getirmek."],
        paragraphs: ["Bilgileriniz reklam amacıyla kullanılmaz ve üçüncü kişilere satılmaz."],
      },
      {
        title: "4. Paylaşım",
        paragraphs: [
          "Bilgileriniz yalnızca hizmetin sunulması için gerekli olan barındırma ve e-posta iletim hizmet sağlayıcılarıyla, ayrıca yasal zorunluluk halinde yetkili kurumlarla paylaşılır.",
        ],
      },
      {
        title: "5. Güvenlik",
        paragraphs: [
          "Site, bağlantı güvenliği (HTTPS) ile sunulur ve iletişim formu mesajlarına erişim yetkili kişilerle sınırlıdır. Ancak internet üzerinden iletilen hiçbir verinin mutlak güvenliği garanti edilemez. Bu nedenle formda hassas sağlık bilgilerinizi paylaşmamanızı öneririz.",
        ],
      },
      {
        title: "6. Saklama",
        paragraphs: ["İletişim talepleriniz, talebiniz sonuçlanana ve ilgili mevzuatın gerektirdiği süre boyunca saklanır, sonrasında silinir ya da anonim hale getirilir."],
      },
      {
        title: "7. Dış bağlantılar",
        paragraphs: [
          "Sitede Instagram ve LinkedIn bağlantıları ile İletişim sayfasında Google Haritalar ile yerleştirilmiş bir harita bulunur. Bu sitelerin gizlilik uygulamalarından Veri Sorumlusu sorumlu değildir; ilgili sitelerin kendi politikalarını incelemenizi öneririz.",
        ],
      },
      {
        title: "8. Acil durumlar",
        paragraphs: [
          "Bu site ve iletişim formu acil müdahale hizmeti değildir. Kendinize ya da başkasına zarar verme riski gibi acil bir durumda lütfen 112 Acil Çağrı Merkezi’ni arayın veya en yakın sağlık kuruluşuna başvurun.",
        ],
      },
      {
        title: "9. Haklarınız ve değişiklikler",
        paragraphs: [
          `Kişisel verilerinizle ilgili haklarınızı kullanmak için ${site.email} adresine yazabilirsiniz. Bu politika zaman zaman güncellenebilir; güncel sürüm bu sayfada yayımlanır.`,
        ],
      },
      { title: "10. İletişim", paragraphs: [contact] },
    ],
  },
  {
    slug: "cerez-politikasi",
    title: "Çerez Politikası",
    description: "Klinik Psikolog Selin Sak web sitesinde çerez kullanımı hakkında bilgi.",
    lead: "Bu sayfada sitemizde çerezlerin ve benzeri teknolojilerin nasıl kullanıldığı açıklanır.",
    sections: [
      {
        title: "1. Çerez nedir?",
        paragraphs: [
          "Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Siteyi hatırlamak, tercihleri saklamak veya ziyaret istatistiği oluşturmak gibi amaçlarla kullanılabilir.",
        ],
      },
      {
        title: "2. Sitemizde çerez kullanımı",
        paragraphs: [
          "Sitemiz reklam veya profil çıkarma amacıyla çerez kullanmamaktadır. Ziyaret sayılarını anlamak için çerezsiz, anonim bir istatistik yöntemi kullanılır: IP adresiniz ve tarayıcı bilgisi günlük değişen bir anahtarla geri döndürülemez biçimde özetlenir, kimliğiniz saklanmaz ve tarayıcınıza bir kayıt yazılmaz. Sitenin güvenli ve düzgün çalışması için zorunlu olan teknik kayıtlar (ör. sunucu erişim kayıtları) tutulabilir; bunlar tarayıcınızda sizi tanımlayan çerezler oluşturmaz.",
        ],
      },
      {
        title: "3. Üçüncü taraf bağlantıları",
        paragraphs: [
          "İletişim sayfasında Google Haritalar ile yerleştirilmiş bir harita bulunur; bu harita yüklendiğinde Google kendi çerezlerini kullanabilir. Ayrıca Instagram ve LinkedIn bağlantılarına tıkladığınızda ilgili platformların çerezleri devreye girebilir. Bu çerezler üzerinde Veri Sorumlusunun kontrolü yoktur; lütfen ilgili platformların çerez politikalarına bakınız.",
        ],
      },
      {
        title: "4. Çerezleri yönetme",
        paragraphs: [
          "Tarayıcı ayarlarınızdan çerezleri silebilir, engelleyebilir ya da her kayıtta uyarı alacak şekilde yapılandırabilirsiniz. Ayarların yeri tarayıcıya göre değişir; çoğunda “Gizlilik ve güvenlik” bölümünde bulunur.",
        ],
      },
      {
        title: "5. Değişiklikler",
        paragraphs: [
          "Sitemize ileride istatistik veya benzeri araçlar eklenirse bu politika güncellenir ve yasal olarak gerekiyorsa çerez tercihiniz için onayınız istenir.",
        ],
      },
      { title: "6. İletişim", paragraphs: [contact] },
    ],
  },
];
}

export const getLegal = (site: LegalSite, slug: string) => legalDocsFor(site).find((d) => d.slug === slug)!;
