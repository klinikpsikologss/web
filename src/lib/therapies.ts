// Çalışma şekli: 3 terapi biçimi. Her biri /terapi/[slug] sayfasına bağlanır.
export type TherapySection = {
  title: string;
  paragraphs: string[];
  /** Paragraflardan sonra gösterilen madde listesi */
  list?: string[];
  /** Listeden sonra gelen metin (listeyi tamamlayan cümle dahil) */
  closing?: string[];
};

export type Therapy = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  /** Giriş altında kısa madde listesi (boş bırakılabilir). */
  points: string[];
  sections: TherapySection[];
};

export const therapies: Therapy[] = [
  {
    slug: "bireysel-psikoterapi",
    title: "Bireysel Terapi",
    short:
      "Bireysel psikoterapi, kişinin yaşadığı psikolojik zorlanmayı anlamlandırmasına; duygu, düşünce, fiziksel belirti ve davranışları arasındaki ilişkileri fark etmesine ve ihtiyaç duyduğu alanlarda değişim sağlamasına yardımcı olmayı amaçlayan profesyonel bir süreçtir.",
    intro:
      "Terapi sürecinde kişinin yaşadığı sorunlara odaklanılmakla birlikte, bu sorunların nasıl ortaya çıktığı ve hangi etkenlerle sürdüğü de ele alınır. Her bireyin yaşam öyküsü, ihtiyaçları ve terapiye başvurma nedeni farklı olduğu için süreç kişiye özgü olarak planlanır ve danışanla terapistin iş birliği içinde yürütülür.",
    points: [],
    sections: [
      {
        title: "Bireysel terapi kimler için uygundur?",
        paragraphs: [
          "Psikoterapinin çeşitli psikolojik sorunların ele alınmasındaki etkililiği bilimsel araştırmalarla desteklenmektedir. Yaşadığı yoğun duygularla baş etmekte zorlanan, yaşamının belirli alanlarında güçlük yaşayan, hayatında benzer problemlerin tekrar ettiğini fark eden kişiler psikoterapi desteğine başvurabilir. Bunun yanı sıra psikolojik iyi oluşunu desteklemek, farkındalığını artırmak ve baş etme becerilerini güçlendirmek isteyen kişiler de psikoterapi sürecinden fayda sağlayabilir.",
          "Terapi sürecinde kişinin yaşadığı belirti ve sorunları; içinde bulunduğu koşullar, geçmiş deneyimleri, ilişkileri, güçlü yönleri ve ihtiyaçlarıyla birlikte değerlendirmeyi ve süreci danışana özgü planlamayı önemsiyorum.",
        ],
      },
      {
        title: "Bireysel psikoterapide hangi konular ele alınabilir?",
        paragraphs: [
          "Bireysel psikoterapide kişinin terapiye başvurma nedeni ve ihtiyaçları doğrultusunda farklı konular ele alınabilir. Çalıştığım başlıca alanlar arasında:",
        ],
        list: [
          "Kaygı (anksiyete) sorunları,",
          "Panik ataklar ve panik bozukluk,",
          "Obsesif kompulsif bozukluk (OKB),",
          "Sosyal kaygı,",
          "Depresyon ve duygu durum sorunları,",
          "Stres ve stresle ilişkili güçlükler,",
          "Travmatik yaşantılar,",
          "Yas ve kayıp süreçleri,",
          "İlişkisel problemler,",
          "Yemeyle ilişkili sorunlar,",
          "Öz güven ve değer algısıyla ilişkili güçlükler,",
          "Erteleme ve mükemmeliyetçilik,",
          "Yaşam değişiklikleri ve uyum süreçleri",
        ],
        closing: [
          "yer almaktadır.",
          "Terapi sürecinde yalnızca yaşanan belirtilerin azalması değil, bu belirtilerin ortaya çıkmasına ve sürmesine neden olan etkenlerin anlaşılmasına da önem veriyorum. Böylece kişinin yaşadığı güçlüklerle baş etmesinin yanı sıra kendi duygu, düşünce ve davranışlarına yönelik farkındalığının artması ve terapide geliştirdiği becerileri yaşamının farklı alanlarına taşıyabilmesi amaçlanır.",
        ],
      },
      {
        title: "Terapi süreci nasıl ilerler?",
        paragraphs: [
          "Terapi süreci, ilk görüşmeyle birlikte kişinin terapiye başvurma nedenini, yaşadığı güçlükleri, beklentilerini ve ihtiyaçlarını anlamaya yönelik kapsamlı bir değerlendirmeyle başlar. Bu değerlendirme doğrultusunda süreçte çalışılacak konular ve terapi hedefleri danışanla birlikte belirlenir.",
          "Terapi sürecini bilimsel kanıt temelli Bilişsel ve Davranışçı Terapiler (BDT) yaklaşımı çerçevesinde yürütüyorum. BDT'de kişinin yaşadığı psikolojik zorlanma; duygu, düşünce, fiziksel belirtiler ve davranışlar arasındaki ilişkiler ile bu zorlanmanın ortaya çıkmasına ve sürdürmesine sebep olan faktörler bağlamsal olarak ele alınır.",
          "Klinik değerlendirmenin ardından danışanla birlikte, yaşadığı sorunun sürmesine neden olan döngüyü anlamaya yönelik bireye özgü bir formülasyon oluşturulur. Her bireyin ihtiyaçları, öğrenme geçmişi ve yaşadığı zorlanma farklı olduğundan, terapi süreci formülasyon doğrultusunda kişiye özgü olarak planlanır.",
          "Terapi planı doğrultusunda danışana uygun yöntemler belirlenir ve seanslarda çeşitli yöntem ve uygulamalardan yararlanılabilir. Seanslarda ele alınan konuların günlük yaşamda uygulanmasını desteklemek ve kazanımların kalıcı hale gelmesini sağlamak amacıyla, danışanla birlikte seanslar arasında atabileceği adımlara yönelik egzersizler planlanabilir.",
          "Psikoterapiyi, terapistin yönlendirdiği tek yönlü bir süreç olarak değil; terapistin mesleki bilgi ve deneyimiyle eşlik ettiği, danışanın ise kendi deneyimiyle sürecin aktif bir parçası olduğu, iş birliğine dayalı bir süreç olarak görüyorum. Bu doğrultuda terapi hedefleri, kullanılan yöntemler ve süreçteki ilerleme terapi boyunca danışanla birlikte değerlendirilir.",
        ],
      },
      {
        title: "Seans süresi ve görüşme sıklığı",
        paragraphs: [
          "Bireysel psikoterapi seansları yaklaşık 50 dakika sürmektedir. Görüşmeler, özellikle terapinin başlangıç döneminde, genellikle haftada bir olacak şekilde planlanır.",
          "Terapi süresi ve görüşme sıklığı; yaşanan psikolojik zorlanmaya, sürece uyuma ve terapi hedeflerine göre değişiklik gösterebilir. Terapi süreci boyunca belirli aralıklarla terapi hedefleri, danışanın işlevsellik düzeyi ve süreçte kaydedilen ilerleme birlikte değerlendirilir. Bu değerlendirmeler doğrultusunda terapi planı gözden geçirilir ve seans sıklığı yeniden düzenlenebilir.",
          "Terapi hedeflerine ulaşılması ve elde edilen kazanımların sürdürülebilir hâle gelmesiyle birlikte sonlandırma süreci danışanla iş birliği içinde planlanır.",
        ],
      },
    ],
  },
  {
    slug: "cift-terapisi",
    title: "Çift Terapisi",
    short:
      "Çift terapisi, partnerlerin ilişkilerinde yaşadıkları güçlükleri anlamalarına, aralarındaki etkileşim ve iletişim örüntülerini fark etmelerine ve ilişkilerinde ihtiyaç duydukları alanlarda değişim sağlamalarına yardımcı olmayı amaçlayan profesyonel bir süreçtir.",
    intro:
      "Çiftlerin ilişki dinamikleri, yaşam öyküleri, ihtiyaçları ve terapiye başvurma nedenleri birbirinden farklıdır. Bu nedenle terapi sürecinde yalnızca yaşanan sorunlara değil, bu sorunların ortaya çıkmasına ve sürmesine katkıda bulunan etkenlere ve çiftin ilişki içerisinde geliştirdiği davranış örüntülerine de odaklanılır. Süreç, çiftin ihtiyaçları ve terapi hedefleri doğrultusunda planlanır ve terapistle çiftin iş birliği içinde yürütülür.",
    points: [],
    sections: [
      {
        title: "Çift terapisine hangi durumlarda başvurulabilir?",
        paragraphs: [
          "Çift terapisine yalnızca ilişkinin ciddi bir kriz yaşadığı dönemlerde değil, ilişkide tekrarlayan güçlüklerin fark edildiği veya çiftlerin ilişkilerini daha sağlıklı bir şekilde sürdürmek istedikleri durumlarda da başvurulabilir.",
          "Çift terapisinde ele alınabilecek başlıca konular arasında:",
        ],
        list: [
          "İletişim sorunları,",
          "Sık veya tekrarlayan çatışmalar,",
          "Duygusal uzaklaşma ve ilişkide yakınlığın azalması,",
          "Güven sorunları,",
          "Kıskançlık,",
          "Aldatma sonrası yaşanan güçlükler,",
          "İhtiyaç ve beklentilerin ifade edilmesinde yaşanan sorunlar,",
          "Problem çözme ve ortak karar alma güçlükleri,",
          "Ailelerle ilişkiler ve sınırlarla ilgili sorunlar,",
          "Evlilik, ebeveynlik veya diğer önemli yaşam değişikliklerine uyum,",
          "Ayrılık veya boşanma konusunda yaşanan kararsızlıklar",
        ],
        closing: [
          "yer alabilir. Her çiftin yaşadığı güçlük ve ilişki dinamiği farklı olduğu için, terapi sürecinde ele alınacak konular çiftin ihtiyaçları ve terapi hedefleri doğrultusunda belirlenir.",
        ],
      },
      {
        title: "Çift terapisinin amacı nedir?",
        paragraphs: [
          "Çift terapisinin amacı, çiftin yaşadığı sorunların nasıl bir bağlamda ortaya çıktığını ve sürdüğünü anlaması; birbirlerinin duygu, düşünce ve ihtiyaçlarını daha iyi fark edebilmesi ve ilişkide yaşanan güçlüklerle daha işlevsel biçimde baş edebilmesidir.",
          "Bu süreçte çiftlerin iletişim ve problem çözme becerilerini geliştirmeleri, çatışmaları daha sağlıklı biçimde ele alabilmeleri, ihtiyaç ve beklentilerini açık bir şekilde ifade edebilmeleri ve birbirlerinin deneyimlerini daha iyi anlayabilmeleri üzerinde çalışılabilir.",
          "Çift terapisi, her koşulda ilişkinin devam sürmesini hedeflemez. Terapi, çiftlerin ilişkilerini ve ihtiyaçlarını daha açık bir şekilde değerlendirebilmelerine ve ilişkileriyle ilgili kararlarını daha sağlıklı bir zeminde ele alabilmelerine de yardımcı olabilir.",
        ],
      },
      {
        title: "Çift terapisi süreci nasıl ilerler?",
        paragraphs: [
          "Çift terapisi, partnerlerin terapiye başvurma nedenlerini, ilişkide yaşadıkları güçlükleri, ilişkinin öyküsünü, beklentilerini ve terapi hedeflerini anlamaya yönelik kapsamlı bir değerlendirmeyle başlar. Süreçte her iki partnerin deneyimine ve ilişkiye dair bakış açısına yer verilir.",
          "Değerlendirme sürecinde yalnızca yaşanan çatışmaların içeriğine değil, çiftin bu çatışmalar sırasında nasıl bir etkileşim içinde olduğuna da odaklanılır. Tekrarlayan davranış örüntüleri, bu örüntüleri ortaya çıkaran ve sürdüren etkenler ve bunların ilişki üzerindeki etkileri birlikte değerlendirilir. Bu değerlendirme doğrultusunda terapi hedefleri çiftle birlikte belirlenir ve süreç çiftin ihtiyaçlarına özgü olarak planlanır.",
          "Çift terapisinde terapistin rolü partnerlerden birinin yanında yer almak veya kimin haklı olduğunu belirlemek değildir. Terapist, her iki partnerin deneyiminin anlaşılabileceği ve ilişki içerisinde yaşanan güçlüklerin birlikte ele alınabileceği güvenli ve tarafsız bir terapi ortamı oluşturmayı amaçlar.",
          "Terapi planı doğrultusunda seanslarda çiftin ihtiyaçlarına uygun çeşitli terapötik yöntem ve uygulamalardan yararlanılabilir. Seanslarda ele alınan konuların günlük yaşama aktarılmasını desteklemek amacıyla çiftle birlikte, seanslar arasında uygulayabilecekleri egzersizler veya atabilecekleri adımlar planlanabilir.",
          "Terapi hedefleri, kullanılan yöntemler ve süreçte kaydedilen ilerleme terapi boyunca birlikte değerlendirilir. İhtiyaçlar veya terapi hedefleri değiştiğinde terapi planı da bu doğrultuda yeniden gözden geçirilebilir.",
        ],
      },
      {
        title: "Seans süresi ve görüşme sıklığı",
        paragraphs: [
          "Çift terapisi seanslarının süresi, uygulanan çalışma biçimine ve çiftin ihtiyaçlarına göre planlanır. Özellikle terapinin başlangıç döneminde görüşmelerin düzenli aralıklarla gerçekleştirilmesi sürecin verimliliği açısından önem taşır.",
          "Terapi süresi ve görüşme sıklığı; çiftin terapiye başvurma nedenine, yaşanan güçlüklerin niteliğine, çiftin ihtiyaçlarına ve terapi hedeflerine göre değişiklik gösterebilir. Süreç boyunca terapi hedefleri ve kaydedilen ilerleme belirli aralıklarla değerlendirilir. Bu değerlendirmeler doğrultusunda terapi planı ve görüşme sıklığı yeniden düzenlenebilir.",
          "Terapi hedeflerine ulaşılması ve elde edilen kazanımların sürdürülebilir hâle gelmesiyle birlikte sonlandırma süreci çiftle iş birliği içinde planlanır.",
        ],
      },
    ],
  },
  {
    slug: "online-psikoterapi",
    title: "Online Terapi",
    short:
      "Online psikoterapi, terapist ve danışanın aynı fiziksel ortamda bulunmadan, güvenli bir dijital platform üzerinden görüntülü görüşmeler aracılığıyla bir araya geldiği profesyonel bir psikolojik destek sürecidir. Yüz yüze psikoterapide olduğu gibi kişinin yaşadığı psikolojik zorlanmaları anlamlandırmasına, duygu, düşünce ve davranışları arasındaki ilişkileri fark etmesine ve ihtiyaç duyduğu alanlarda değişim sağlamasına yardımcı olmayı amaçlar.",
    intro:
      "Online terapi, yüz yüze terapide olduğu gibi bilimsel ve etik ilkeler doğrultusunda yürütülür. Terapi süreci, danışanın ihtiyaçları, yaşadığı güçlükler ve terapi hedefleri doğrultusunda kişiye özgü olarak planlanır ve terapistle danışanın iş birliği içinde ilerler.",
    points: [],
    sections: [
      {
        title: "Online terapi nasıl uygulanmaktadır?",
        paragraphs: [
          "Online terapi seansları, terapist ve danışanın önceden belirlenen gün ve saatte, görüntülü görüşmeye olanak sağlayan güvenli bir dijital platform üzerinden bir araya gelmesiyle gerçekleştirilir.",
          "Terapi süreci, danışanın terapiye başvurma nedenini, yaşadığı güçlükleri, beklentilerini ve ihtiyaçlarını anlamaya yönelik kapsamlı bir değerlendirmeyle başlar. Bu değerlendirme doğrultusunda terapi hedefleri danışanla birlikte belirlenir ve süreç kişiye özgü olarak planlanır.",
          "Online terapi sürecinde, yüz yüze psikoterapide olduğu gibi gizlilik, mahremiyet ve mesleki etik ilkeler esas alınır. Görüşmelerin gizliliğinin korunabilmesi için uygun güvenlik önlemlerine sahip alt yapısı olan dijital platformlar tercih edilir. Danışanın da seans boyunca kendisini rahat ifade edebileceği, sessiz ve görüşmenin bölünmeyeceği bir ortamda bulunması önemlidir.",
          "Görüşmelerin sağlıklı bir şekilde yürütülebilmesi için yeterli internet bağlantısı ve görüntülü görüşmeye uygun bir cihaz gereklidir. Terapi sürecine başlamadan önce teknik koşullar, gizlilikle ilgili bilgilendirmeler ve olası bağlantı sorunlarında izlenecek yol danışanla birlikte ele alınır.",
        ],
      },
      {
        title: "Online terapi kimler için uygundur?",
        paragraphs: [
          "Online terapi, bulunduğu konum, yaşam koşulları veya kişisel tercihleri nedeniyle çevrimiçi görüşmeyi uygun bulan kişiler için psikoterapiye erişimi kolaylaştıran bir seçenektir.",
          "Özellikle farklı şehirlerde yaşayan, yoğun çalışma temposu nedeniyle terapiye başlamakta zorlanan, sık seyahat eden ya da bulunduğu bölgede ihtiyaçlarına uygun psikoterapi hizmetine erişemeyen kişiler online terapiden yararlanabilir.",
          "Bununla birlikte online terapi yalnızca yüz yüze görüşmelere katılma imkânı bulunmayan kişiler için değil, terapi sürecini kendi yaşam koşulları içerisinde sürdürmeyi tercih eden kişiler için de uygun olabilir.",
          "Online terapinin uygunluğu, kişinin yaşadığı psikolojik güçlüklerin niteliğine, ihtiyaçlarına, görüşme ortamının koşullarına ve terapi hedeflerine göre değerlendirilir. Bazı durumlarda yüz yüze psikoterapi veya farklı ruh sağlığı hizmetleri daha uygun olabilir. Bu nedenle terapi biçiminin belirlenmesinde bireysel değerlendirme önem taşır.",
        ],
      },
      {
        title: "Online terapi ile yüz yüze terapi arasındaki benzerlikler ve farklılıklar nelerdir?",
        paragraphs: [
          "Online terapi ile yüz yüze terapi arasındaki temel farklılık, terapist ve danışanın görüşmeleri gerçekleştirdiği ortamdır. Yüz yüze terapide görüşmeler seans odasında yapılırken, online terapide görüşmeler dijital bir platform aracılığıyla gerçekleştirilir.",
          "Her iki terapi biçiminde de danışanın yaşadığı güçlüklerin değerlendirilmesi, terapi hedeflerinin belirlenmesi, bilimsel temellere dayanan terapötik yöntemlerin uygulanması ve süreçte kaydedilen ilerlemenin değerlendirilmesi aynı ilkeler doğrultusunda yürütülür.",
          "Bilimsel araştırmalar, online ortamda uygulanan psikoterapinin, özellikle Bilişsel ve Davranışçı Terapiler kapsamında çeşitli psikolojik sorunların ele alınmasında etkili olabildiğini ve birçok durumda yüz yüze uygulamalarla benzer sonuçlar sağlayabildiğini göstermektedir.",
          "Online terapi, mekândan bağımsız olarak görüşmelere katılabilme ve terapi sürecini farklı yaşam koşullarında sürdürebilme açısından kolaylık sağlayabilir. Bununla birlikte teknik bağlantı sorunları, görüşme ortamının mahremiyeti ve yüz yüze iletişimdeki bazı sözel olmayan ipuçlarının sınırlanması gibi farklılıklar da söz konusudur.",
          "Terapi sürecinin etkililiği yalnızca görüşmelerin online veya yüz yüze gerçekleştirilmesine bağlı değildir. Danışanın yaşadığı psikolojik zorlanmaya uygun bir terapi planının oluşturulması, terapötik ilişki ve sürecin düzenli biçimde değerlendirilmesi her iki terapi biçiminde de önem taşır.",
        ],
      },
      {
        title: "Seans süresi ve görüşme sıklığı",
        paragraphs: [
          "Online bireysel psikoterapi seansları yaklaşık 50 dakika sürmektedir. Görüşmeler, özellikle terapinin başlangıç döneminde sürecin verimliliği açısından, genellikle haftada bir olacak şekilde planlanır.",
          "Terapi süresi ve görüşme sıklığı; danışanın yaşadığı psikolojik zorlanmaya, ihtiyaçlarına ve terapi hedeflerine göre değişiklik gösterebilir. Süreç boyunca terapi hedefleri ve kaydedilen ilerleme belirli aralıklarla birlikte değerlendirilir. Bu değerlendirmeler doğrultusunda terapi planı ve görüşme sıklığı yeniden düzenlenebilir.",
          "Terapi hedeflerine ulaşılması ve elde edilen kazanımların sürdürülebilir hâle gelmesiyle birlikte sonlandırma süreci danışanla iş birliği içinde planlanır.",
        ],
      },
    ],
  },
];

export const getTherapy = (slug: string) => therapies.find((t) => t.slug === slug);
