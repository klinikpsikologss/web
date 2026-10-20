// Blog yazıları. Yeni yazı eklemek için diziye bir kayıt eklemek yeterli; blog sayfası, site haritası ve ana sayfa otomatik güncellenir.
// Dizideki ilk yazı blog sayfasında öne çıkarılır; ana sayfada ilk 3 yazı gösterilir.
// `body` içinde "## " ile başlayan satır ara başlık olur. Görsel: public/blog/<slug>.jpg (yoksa yer tutucu çıkar).
export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  body?: string[];
};

export const posts: Post[] = [
  {
    "slug": "terapiye-baslamak-ilk-seans-nasil-gecer",
    "title": "Terapiye Başlamak: İlk Seans Nasıl Geçer?",
    "category": "Terapi süreci",
    "excerpt": "İlk seansta neler olur, nelere hazırlanabilirsiniz ve terapiye başlarken sık duyulan çekinceler.",
    "body": [
      "Terapiye başlamaya karar vermek, çoğu zaman uzun bir düşünme sürecinin sonunda gelir. “Ne anlatacağım?”, “Ağlarsam ne olur?”, “Yargılanır mıyım?” gibi sorular bu aşamada çok yaygındır. İlk seansın nasıl geçeceğini bilmek, bu çekincelerin bir kısmını hafifletebilir.",
      "## Terapiye ne zaman başlanır?",
      "Terapi için “yeterince kötü” olmayı beklemek gerekmez. Yaşadığınız zorlanma haftalardır sürüyor, gündelik işleyişinizi, ilişkilerinizi ya da kendinizle ilgili hislerinizi etkiliyorsa, tek başınıza baş etmek yorucu hâle geldiyse ya da yaşamınızda önemli bir değişiklikle karşı karşıyaysanız, bir ruh sağlığı uzmanıyla görüşmek yerinde bir adımdır.",
      "## İlk seansta neler olur?",
      "İlk seans genellikle bir tanışma ve anlama görüşmesidir. Uzman sizi dinler, sizi terapiye getiren sorunu, bu sorunun ne zamandır sürdüğünü, günlük yaşamınıza etkisini ve geçmişte neler denediğinizi sorar. Gizlilik, seansların süresi ve sıklığı, randevu düzeni gibi çalışmanın çerçevesi de bu görüşmede konuşulur. Her şeyi ilk seansta anlatmanız gerekmez; hazır olduğunuz kadarını paylaşabilirsiniz.",
      "## Terapi nasıl ilerler?",
      "Bilişsel ve Davranışçı Terapiler (BDT) yaklaşımında ilk seansları, sorunun nasıl işlediğini birlikte anlama ve ortak hedefler belirleme izler. Terapi bir iş birliğidir: neyin üzerinde çalışılacağı birlikte kararlaştırılır, süreç belirli aralıklarla gözden geçirilir. Seanslar arasında denemeniz için küçük çalışmalar önerilebilir; bunlar sizin hızınıza göre ayarlanır.",
      "## İlk seansa hazırlanmak için",
      "Ne anlatacağınızı kusursuz planlamanız gerekmez. İsterseniz yaşadığınız zorlanmaları, ne zaman başladığını ve terapiden neler beklediğinizi kısaca not edebilirsiniz. Sorularınız varsa yazıp getirmek de işe yarar. Seans sırasında bir konuyu anlatmak istemezseniz bunu söylemeniz yeterlidir.",
      "## Doğru uyumu bulmak",
      "Terapide en önemli etkenlerden biri, uzmanla kurulan güvene dayalı ilişkidir. İlk birkaç seans sonunda kendinizi dinlenmiş, anlaşılmış ve yargılanmamış hissetmeniz önemlidir. Süreç hakkındaki sorularınızı rahatça sorabilirsiniz.",
      "Terapi süreci ve randevu düzeni hakkında bilgi almak isterseniz benimle iletişime geçebilirsiniz.",
      "Bu yazı genel bilgilendirme amacı taşır ve bireysel bir değerlendirmenin yerini tutmaz."
    ]
  },
  {
    "slug": "panik-atak-aninda-ne-yapmali",
    "title": "Panik Atak Anında Ne Yapılmalı?",
    "category": "Kaygı",
    "excerpt": "Atak sırasında uygulayabileceğiniz basit adımlar ve atakların tekrarını azaltmak için bilinmesi gerekenler.",
    "body": [
      "Panik atak, genellikle hiç beklenmedik bir anda başlayan yoğun bir korku ve bedensel belirti dalgasıdır. Çarpıntı, nefes darlığı, göğüste sıkışma, titreme ve “kontrolü kaybediyorum” ya da “kalp krizi geçiriyorum” korkusu sık görülür. Çok korkutucu olsa da panik atak kendiliğinden geçer ve yaşamı tehdit eden bir durum değildir.",
      "## Panik atak neden olur?",
      "Beden, tehlike algıladığında “savaş ya da kaç” tepkisini devreye sokar: kalp hızlanır, nefes sıklaşır, kaslar gerilir. Panik atakta bu alarm, ortada gerçek bir tehlike olmadığı hâlde çalışır. Bedensel belirtiler tehlikeli bir şeyin işareti olarak yorumlandığında korku artar, bu da belirtileri güçlendirir. Atak çoğu zaman birkaç dakikada doruğa çıkar ve ardından azalmaya başlar.",
      "## Atak sırasında yapılabilecekler",
      "Adlandırın. Kendinize “Bu bir panik atak, rahatsız edici ama tehlikeli değil, geçecek” demek, felaket yorumlarının gücünü azaltır.",
      "Yavaş nefes alın. Burnunuzdan yaklaşık dört saniye nefes alıp ağzınızdan altı saniye boyunca yavaşça verin. Nefesi uzun vermek bedeni sakinleştirmeye yardımcı olur. Nefesi derin ve hızlı almak ise belirtileri artırabilir.",
      "Dikkatinizi dışarı çevirin. Çevrenizde gördüğünüz beş şeyi, dokunabildiğiniz dört şeyi, duyduğunuz üç sesi, aldığınız iki kokuyu ve tadabildiğiniz bir şeyi sayın. Bu “5-4-3-2-1” alıştırması dikkatinizi bedensel duyumlardan şimdiki ana taşır.",
      "Kaçmaya çalışmayın. Mümkünse bulunduğunuz yerde kalıp atağın dalga gibi yükselip alçalmasına izin vermek, atağın tehlikeli olmadığını deneyimlemenizi sağlar. Kaçmak kısa vadede rahatlatır ancak o yerin “tehlikeli” olduğu inancını güçlendirir.",
      "## Atak geçtikten sonra",
      "Atağın ardından yorgun hissetmek normaldir. Su içmek, dinlenmek ve kendinize nazik davranmak iyi gelir. Kendinizi “bir daha olacak mı?” düşünceleriyle aşırı meşgul etmemeye çalışın. Atak sonrası yoğun endişe, bir sonraki atağı beklemeyi besler.",
      "## Atakları sürdüren döngü",
      "Panik bozuklukta kişi yeni bir atak yaşama korkusuyla belirli yerlerden, durumlardan ya da bedensel duyumlardan (spor, kahve, kalabalık gibi) kaçınmaya başlayabilir. Bu kaçınmalar zamanla yaşam alanını daraltır. Bilişsel ve Davranışçı Terapiler (BDT), bu döngüyü anlamaya ve kaçınılan durumlara kademeli olarak yaklaşmaya odaklanır.",
      "## Ne zaman destek almalı?",
      "Atakları ilk kez yaşıyorsanız ya da belirtiler kalp gibi başka bir sağlık sorununu düşündürüyorsa, önce bir hekime başvurmanız önerilir. Göğüs ağrısı uzuyorsa, bayılma ya da şiddetli nefes darlığı olursa gecikmeden acil servise gidin ya da 112’yi arayın. Ataklar tekrarlıyorsa, yaşamınızı kısıtlıyorsa ya da sürekli bir sonraki atağı bekliyorsanız bir ruh sağlığı uzmanından destek alabilirsiniz.",
      "Bu yazı genel bilgilendirme amacı taşır ve bireysel bir değerlendirmenin yerini tutmaz."
    ]
  },
  {
    "slug": "kaygi-ve-belirsizlikle-bas-etmek",
    "title": "Kaygı ve Belirsizlik ile Baş Etmek",
    "category": "Kaygı",
    "excerpt": "Belirsizlik karşısında zihin neden alarma geçer ve bu döngüyü yumuşatmak için neler yapılabilir?",
    "body": [
      "Yeni bir iş, bekleyen bir sonuç, sağlıkla ilgili bir endişe ya da sadece “ya olursa” diye başlayan bir düşünce. Belirsizlik, hayatın kaçınılmaz bir parçası. Ama bazı zamanlarda zihin, bilinmeyen karşısında öyle yüksek sesle alarm verir ki gündelik hayat bu alarmın etrafında şekillenmeye başlar.",
      "## Zihin neden belirsizliği sevmez?",
      "İnsan zihni geleceği öngörmeye çalışarak bizi korumayı amaçlar. Kesin olmayan bir durumla karşılaştığında en kötü ihtimali hesaplamak, bu koruma çabasının bir parçasıdır. Sorun, bu hesabın bir noktada çözüm üretmeyi bırakıp aynı düşünceleri tekrar tekrar döndürmeye başlamasıdır. Endişe o anda bize hazırlık yapıyormuş gibi hissettirir, oysa çoğu zaman yalnızca gerginliği artırır.",
      "## Kaygıyı sürdüren şeyler",
      "Bilişsel ve Davranışçı Terapiler (BDT) bakış açısına göre kaygıyı yalnızca “düşünce” ya da yalnızca “his” olarak görmeyiz; düşünce, duygu, bedensel duyum ve davranış birbirini besleyen bir döngü oluşturur. Bu döngüyü ayakta tutan davranışlar çoğu zaman iyi niyetlidir ama kısa vadeli rahatlama sağladığı için uzun vadede kaygıyı güçlendirir:",
      "Kaçınma: Kaygı uyandıran durumdan uzak durmak, o durumla baş edebileceğimizi öğrenmemizi engeller. Güvence arama: Sürekli birine sorarak, internette araştırarak ya da tekrar tekrar kontrol ederek emin olmaya çalışmak, kesinliğe duyulan ihtiyacı büyütür. Aşırı hazırlık ve kontrol: Her ihtimali önceden çözmeye çalışmak, zihni sürekli tetikte tutar.",
      "## Küçük ama işe yarayan adımlar",
      "İlk adım, belirsizliğin tamamen ortadan kalkmayacağını kabul etmektir. Hedef, kesinliğe ulaşmak değil, kesin olmayan durumda da işlev görebilmektir. Bu doğrultuda şunlar yardımcı olabilir:",
      "Endişeyi sınıflandırın. “Bu konuda şu an yapabileceğim bir şey var mı?” sorusu, endişeleri iki gruba ayırır. Yapabileceğiniz bir şey varsa küçük bir adım planlayın. Yoksa o düşünceyi “şu an çözemeyeceğim bir endişe” olarak etiketlemek, zihnin onunla uğraşma baskısını hafifletir.",
      "Düşünceleri gerçek değil, olasılık olarak görün. “Başıma kötü bir şey gelecek” cümlesi bir olgu değil, zihnin ürettiği bir tahmindir. Tahminin ne kadar olası olduğunu ve daha önce benzer durumlarda neler yaşandığını sorgulamak mesafe kazandırır.",
      "Endişe için zaman ayırın. Gün içinde endişeyle kendinizi sürekli meşgul etmek yerine, kısa ve belirli bir “endişe zamanı” koymak, geri kalan saatlerde dikkatinizi şimdiye döndürmenizi kolaylaştırır.",
      "Güvence aramayı kademeli olarak azaltın. Her kontrolü ya da soruyu bir anda bırakmak zor olabilir; sıklığı yavaş yavaş azaltmak, kesinlik olmadan da dayanabildiğinizi deneyimlemenizi sağlar.",
      "Şimdiye dönün. Nefes egzersizleri ve farkındalık (mindfulness) uygulamaları, dikkati gelecek senaryolarından bedene ve çevreye geri getirir. Amaç düşünceleri susturmak değil, onlara kapılmadan yanlarından geçebilmektir.",
      "## Ne zaman destek almak gerekir?",
      "Kaygı; uykunuzu, işinizi, ilişkilerinizi ya da gündelik kararlarınızı haftalardır belirgin biçimde etkiliyorsa, kendi başınıza baş etmeye çalışmak yorucu hâle geldiyse profesyonel destek almak yerinde bir adımdır. Kaygıyla çalışmak, BDT’nin en iyi araştırılmış alanlarından biridir ve süreç, kaygıyı sürdüren döngüyü birlikte anlayıp değiştirmeye odaklanır.",
      "Bu yazı genel bilgilendirme amacı taşır ve bireysel bir değerlendirmenin yerini tutmaz."
    ]
  },
  {
    "slug": "iliskilerde-iletisim",
    "title": "İlişkilerde İletişim: Daha Sağlıklı Bir Bağ Kurmak Mümkün mü?",
    "category": "İlişkiler",
    "excerpt": "Tekrar eden tartışmaların arkasındaki örüntüleri anlamak ve iletişimi yeniden kurmak için bilimsel temelli ipuçları.",
    "body": [
      "Aynı konuda tekrar tekrar tartışan, birbirini dinlemediğini hisseden ya da konuşmaya başlamadan yorulan çiftler için sık sorulan bir soru var: “Bu böyle devam mı edecek?” Kısa cevap, çoğu zaman hayır. İletişim doğuştan gelen bir yetenek değil, öğrenilebilen ve geliştirilebilen bir beceri seti.",
      "## Tartışmanın konusu değil, biçimi belirleyici",
      "İlişki araştırmaları, çiftlerin ilişkideki sorunları yaşayıp yaşamamasından çok, sorunlarla nasıl başa çıktığının önemli olduğunu gösteriyor. John Gottman’ın uzun yıllara dayanan çalışmaları, ilişkiye zarar verme olasılığı yüksek dört iletişim örüntüsünü tanımlar: eleştiri (davranış yerine kişiliğe yönelme), savunmaya geçme, küçümseme ve duvar örme (konuşmadan çekilme). Bu örüntüleri fark etmek, değişimin ilk adımıdır.",
      "## Sağlıklı iletişimi destekleyen alışkanlıklar",
      "Yumuşak başlangıç yapın. Bir konuşmanın nasıl başladığı, nasıl biteceğini büyük ölçüde belirler. “Sen hep böylesin” yerine “Bu konuda kendimi yalnız hissediyorum, bunu konuşabilir miyiz?” demek, karşı tarafın savunmaya geçme olasılığını azaltır.",
      "Ben dili kullanın. Karşınızdakini suçlamak yerine kendi deneyiminizi anlatın: “Beni dinlemiyorsun” yerine “Anlattıklarım yarıda kalınca değersiz hissediyorum.” Bu, aynı mesajı taşır ama kapıyı kapatmaz.",
      "Gerçekten dinleyin. Dinlemek, cevap hazırlamak değildir. Karşınızdakinin söylediğini kendi cümlelerinizle özetlemek (“Anladığım kadarıyla… doğru mu?”) hem yanlış anlamaları azaltır hem de anlaşıldığını hissettirir.",
      "Duygu yoğunlaştığında mola verin. Bedensel olarak çok gerildiğimizde (kalp atışı hızlanır, ses yükselir) mantıklı konuşmak zorlaşır. Böyle anlarda “Şu an çok gergin hissediyorum, yirmi dakika ara verip döneyim” demek ve verilen sözde durmak, konuşmanın kaçınma değil düzenleme olduğunu gösterir.",
      "Onarım girişimlerini fark edin. Tartışma sırasında yapılan bir espri, bir özür ya da “Şu an çok kötü bir yere gidiyoruz” cümlesi, ilişkiyi toparlama çabasıdır. Bu girişimleri kabul etmek, tartışmanın yıkıcı olmasını engeller.",
      "Olumlu anlara yer açın. İlişki yalnızca sorunları çözmekten ibaret değildir. Teşekkür etmek, küçük ilgi göstermek ve birlikte keyifli zaman geçirmek, zor zamanlarda ilişkiye tampon görevi gören bir güven birikimi oluşturur.",
      "## Çift terapisi ne sağlar?",
      "Bazen örüntüler o kadar yerleşmiştir ki içindeyken fark etmek zordur. Çift terapisi, iki tarafın da deneyimine eşit alan açan, tekrar eden döngüyü birlikte görmeyi ve yeni iletişim becerilerini güvenli bir ortamda denemeyi sağlayan bir çerçeve sunar. Amaç kimin haklı olduğunu belirlemek değil, ilişkinin işleyişini anlamak ve iki tarafın da duyulduğunu hissedeceği bir yol bulmaktır.",
      "Bu yazı genel bilgilendirme amacı taşır ve bireysel bir değerlendirmenin yerini tutmaz."
    ]
  },
  {
    "slug": "uyku-ve-ruh-sagligi",
    "title": "Uyku ve Ruh Sağlığı: Daha İyi Uyumak İçin Neler Yapılabilir?",
    "category": "Günlük yaşam",
    "excerpt": "Uyku ile duygu durumu arasındaki ilişki ve uykuyu destekleyen, uygulaması kolay alışkanlıklar.",
    "body": [
      "Uyku, beden kadar zihin için de bir onarım zamanıdır. Yetersiz ya da bölünen uyku, ertesi gün dikkat, hafıza, sabır ve duygu düzenlemeyi zorlaştırır. Uyku ile ruh sağlığı arasındaki ilişki çift yönlüdür: kaygı ve depresyon uykuyu bozabilir, bozulan uyku da kaygıyı ve çökkünlüğü artırabilir.",
      "## Uyku neden bozulur?",
      "Zihnin yatakta “sessizleşmemesi”, gün içinde ertelenen düşüncelerin gece öne çıkması, uyuyamayacağım endişesi, düzensiz uyku saatleri, akşam kafein ya da ekran kullanımı ve gün içi hareketsizlik uykuyu etkileyen yaygın etkenlerdendir. Uyuyamama konusundaki endişe zamanla kendi başına bir kaygı kaynağına dönüşebilir: kişi yatağa uyuyamama korkusuyla girer ve uyku daha da uzaklaşır.",
      "## Uykuyu destekleyen alışkanlıklar",
      "Saatleri düzenli tutun. Hafta sonu da dâhil her gün benzer saatte yatıp kalkmak, vücut saatini dengelemeye yardımcı olur.",
      "Yatağı uyku için ayırın. Yatakta telefona bakmak, iş yapmak ya da uzun süre endişelenmek zihnin yatağı uykuyla değil uyanıklıkla ilişkilendirmesine yol açabilir.",
      "Akşam rutini oluşturun. Yatmadan en az bir saat önce ekranları azaltmak, ışığı kısmak, ılık bir duş almak ya da sakin bir şey okumak bedene “yavaşlama” sinyali verir.",
      "Kafein ve ağır yemeği sınırlayın. Kahve, çay ve enerji içeceklerini öğleden sonra azaltmak, akşam geç saatte ağır yemekten kaçınmak uykuyu kolaylaştırabilir.",
      "Gün içinde hareket edin. Düzenli hareket ve gün ışığı uyku kalitesini olumlu etkiler. Yatmadan hemen önce yoğun egzersizden kaçınmak daha iyi olur.",
      "Endişeleri yatağa götürmeyin. Akşam erken bir saatte yirmi dakika ayırıp aklınızdakileri ve yarın yapılacakları bir kâğıda yazmak, gece zihninizin onları tekrar etmesini azaltabilir.",
      "## Uykuya dalamıyorsam?",
      "Yirmi dakika civarında uyuyamadıysanız yatakta çabalamayı sürdürmek yerine kalkıp loş ışıkta sakin bir şey yapmak, uykunuz gelince yatağa dönmek önerilir. Saate sürekli bakmak ve “uyumalıyım” diye kendinizi zorlamak uykuyu daha da uzaklaştırır.",
      "## Ne zaman destek almalı?",
      "Uyku sorunu haftada birkaç gece, üç aydan uzun süredir devam ediyor ve gündüz işlevselliğinizi etkiliyorsa, bir uzmana başvurmanız yerinde olur. Kronik uykusuzluk için Bilişsel ve Davranışçı Terapiler temelli yaklaşımlar, uyku ilacı kullanmadan uykuyu destekleyen, bilimsel olarak etkili yöntemler arasındadır. Horlama, nefes durması gibi belirtiler varsa ayrıca hekim değerlendirmesi gerekir.",
      "Bu yazı genel bilgilendirme amacı taşır ve bireysel bir değerlendirmenin yerini tutmaz."
    ]
  },
  {
    "slug": "duygulari-taniyip-adlandirmak",
    "title": "Duygularımızı Tanımak ve Adlandırmak",
    "category": "Duygular",
    "excerpt": "Duyguları fark etmek ve doğru adlandırmak, onlarla başa çıkmanın ilk ve en önemli adımlarından biridir.",
    "body": [
      "“İyiyim” ya da “kötüyüm” demenin ötesine geçmekte zorlanmak çok yaygındır. Oysa duygular, neye ihtiyacımız olduğunu, neyin bizi zorladığını ve neye değer verdiğimizi gösteren bilgi kaynaklarıdır. Duygularımızı tanıyıp adlandırabildiğimizde, onlara tepki vermek yerine onlarla bilinçli bir ilişki kurabiliriz.",
      "## Duyguyu neden adlandırmalı?",
      "Yoğun bir duygu yaşadığımızda onu kelimelerle ifade etmek, duygunun yoğunluğunu azaltmaya yardımcı olur. “Şu an kaygılı hissediyorum” demek, “her şey kötü gidiyor” düşüncesine kapılmaktan farklı bir mesafe sağlar. Adı konmamış duygular ise çoğu zaman bedensel gerginlik, sinirlilik ya da kaçınma olarak kendini gösterir.",
      "## Duygular bedende nerede hissedilir?",
      "Duygular yalnızca zihinde değil bedende de yaşanır: kaygıda midede düğüm ya da göğüste sıkışma, öfkede çenede ve ellerde gerginlik, üzüntüde boğazda yumru gibi. Gün içinde birkaç kez durup “Şu an bedenimde ne hissediyorum?” diye sormak, duygulara erken ulaşmanın yoludur.",
      "## Duygu günlüğü tutmak",
      "Bilişsel ve Davranışçı Terapiler’de sık kullanılan basit bir alıştırma, belirli bir anı dört başlıkta yazmaktır: Ne oldu? Aklımdan ne geçti? Ne hissettim? Ne yaptım? Bu kayıt, duygunun nasıl doğduğunu ve hangi düşüncenin onu güçlendirdiğini görmenizi sağlar.",
      "## Duygu kelime dağarcığını genişletmek",
      "“Kötü” kelimesinin altında çok farklı duygular yatabilir: hayal kırıklığı, utanç, yalnızlık, kırgınlık, bunalmışlık, endişe. Daha ince adlandırma, neye ihtiyaç duyduğunuzu anlamanıza yardımcı olur. Duygu çemberi gibi araçlar bu aşamada yol gösterebilir.",
      "## Duyguyu bastırmak yerine kabul etmek",
      "Duyguları “yanlış” ya da “fazla” görüp bastırmaya çalışmak, onları çoğu zaman güçlendirir. Kabul, duygudan hoşlanmak ya da onunla yaşamayı seçmek anlamına gelmez; yalnızca o anda var olduğunu yargılamadan fark etmektir. Duygu bir dalga gibi yükselir ve zamanla azalır.",
      "## Ne zaman destek almalı?",
      "Duygularınızı tanımakta ya da ifade etmekte sürekli zorlanıyor, duygularınızın sizi yönettiğini hissediyor ya da yoğun duyguların günlük yaşamınızı etkilediğini görüyorsanız, bir ruh sağlığı uzmanından destek almak bu becerileri güvenli bir ortamda geliştirmenize yardımcı olabilir.",
      "Bu yazı genel bilgilendirme amacı taşır ve bireysel bir değerlendirmenin yerini tutmaz."
    ]
  },
  {
    "slug": "is-yasaminda-tukenmislikle-basa-cikmak",
    "title": "İş Yaşamında Tükenmişlikle Başa Çıkmak",
    "category": "Günlük yaşam",
    "excerpt": "Tükenmişliğin işaretleri, nedenleri ve kendinizi toparlamak için atılabilecek adımlar.",
    "body": [
      "Sabah işe gitmeye gücünüz yoksa, eskiden keyif aldığınız işler artık hiçbir şey ifade etmiyorsa ve dinlenmek bile yetmiyorsa, bunlar tükenmişliğin işaretleri olabilir. Tükenmişlik, uzun süren yoğun iş stresinin ardından gelişen duygusal, zihinsel ve bedensel bir yorgunluk durumudur. Dünya Sağlık Örgütü bunu tıbbi bir hastalık olarak değil, işle ilgili bir olgu olarak tanımlar.",
      "## Tükenmişliğin işaretleri",
      "Dinlenmeyle geçmeyen yorgunluk, işe karşı mesafelenme ve kinik bir tutum, işte kendini yetersiz ya da etkisiz hissetme, sinirlilik, dikkat ve motivasyon kaybı ile uyku ve bedensel yakınmalar sık görülür. Bu belirtiler zamanla iş dışındaki yaşama da yayılabilir.",
      "## Tükenmişliğe zemin hazırlayan etkenler",
      "Araştırmalar tükenmişliğin yalnızca kişisel dayanıklılıkla değil, iş ortamıyla da ilgili olduğunu gösterir. Aşırı iş yükü, işte kontrol ve söz hakkı eksikliği, emeğin karşılığının alınamaması, destekleyici bir topluluğun olmaması, adaletsizlik algısı ve kişisel değerlerle iş arasındaki uyumsuzluk başlıca etkenler arasındadır. Mükemmeliyetçilik ve “hayır” diyememe gibi kişisel örüntüler de riski artırabilir.",
      "## Kendinizi toparlamak için",
      "Sınırlarınızı netleştirin. Mesai bittikten sonra işten kopmak için net bir ritüel oluşturmak (bildirimleri kapatmak, belirli bir saatte bilgisayarı kapatmak) zihnin dinlenmesine yardımcı olur.",
      "Gerçek dinlenme için zaman ayırın. Hafta içi küçük molalar, hafta sonu ise işle ilgisi olmayan, sizi besleyen etkinlikler iyileşmenin parçasıdır. Dinlenmeyi “kazanılması gereken bir ödül” olarak değil, ihtiyaç olarak görmek önemlidir.",
      "Önceliklerinizi gözden geçirin. Her şeyi aynı anda yapmaya çalışmak yerine neyin gerçekten önemli olduğunu belirlemek, devredebileceğiniz ya da bırakabileceğiniz işleri görmenizi sağlar.",
      "Destek isteyin. Yöneticinizle iş yükünü konuşmak, güvendiğiniz biriyle yaşadıklarınızı paylaşmak ya da bir uzmandan destek almak yalnız olmadığınızı hissettirir.",
      "Kendinize yönelik katı beklentileri sorgulayın. “Daha çok çalışmalıyım”, “Yetmiyorum” gibi düşünceler tükenmişliği besleyebilir. Bu düşünceleri fark edip daha dengeli ifadelerle değiştirmek terapide sık çalışılan bir alandır.",
      "## Ne zaman destek almalı?",
      "Belirtiler haftalardır sürüyor, uykunuzu, ilişkilerinizi ve sağlığınızı etkiliyorsa ya da umutsuzluk ve çökkünlük hissi eşlik ediyorsa bir ruh sağlığı uzmanıyla görüşmek önemlidir. Tükenmişlik zaman zaman depresyonla karışabilir; ayırt etmek için değerlendirme gerekir.",
      "Bu yazı genel bilgilendirme amacı taşır ve bireysel bir değerlendirmenin yerini tutmaz."
    ]
  },
  {
    "slug": "farkindalik-mindfulness-ve-simdiye-donmek",
    "title": "Farkındalık (Mindfulness): Şimdiye Dönmek",
    "category": "Duygular",
    "excerpt": "Farkındalık nedir, ne değildir ve günlük yaşamda nasıl uygulanabilir?",
    "body": [
      "Zihnimiz çoğu zaman ya geçmişte yaşadıklarımızı tekrar eder ya da gelecek hakkında senaryolar üretir. Farkındalık (mindfulness), dikkati kasıtlı olarak şimdiki ana, yargılamadan çevirmek anlamına gelir. Zihni susturmak ya da hiç düşünmemek değil, düşüncelerle ve duygularla farklı bir ilişki kurmaktır.",
      "## Farkındalık ne değildir?",
      "Farkındalık, zihni boşaltmak, sürekli sakin hissetmek ya da rahatlamak için yapılan bir teknik değildir. Rahatlama bazen bir yan etki olarak ortaya çıkar ama asıl amaç, o anda ne yaşanıyorsa onu fark edebilmektir. Dikkat dağıldığında bu “başarısızlık” değil, pratiğin kendisidir: dağıldığını fark edip nazikçe geri dönmek.",
      "## Neden işe yarar?",
      "Kaygı, depresyon ve stres çoğu zaman düşünce döngülerine kapılmakla ilgilidir. Farkındalık, düşünceleri “gerçekler” değil zihinsel olaylar olarak görmeyi öğretir. Bu mesafe, düşüncelerin bizi sürüklemesini azaltır. Bu nedenle farkındalık temelli uygulamalar Bilişsel ve Davranışçı Terapiler içinde de kullanılmaktadır.",
      "## Günlük yaşamda basit uygulamalar",
      "Üç dakikalık nefes molası. Rahat bir pozisyonda gözlerinizi kapatın ve dikkatinizi nefesinize verin. Nefesin burnunuzdan girişini, göğsünüzün ve karnınızın hareketini fark edin. Zihniniz dağıldığında bunu not edip dikkatinizi yeniden nefese getirin.",
      "Bedeni taramak. Dikkatinizi ayak parmaklarınızdan başlayarak yavaşça başınıza kadar taşıyın. Gerginlik ya da rahatlık hissettiğiniz yerleri değiştirmeye çalışmadan sadece fark edin.",
      "Farkındalıkla yürümek. Yürürken adımlarınızı, ayaklarınızın yerle temasını ve çevredeki sesleri fark edin. Telefon ve müzik olmadan on dakika yürümek bile iyi bir başlangıçtır.",
      "Farkındalıkla yemek yemek. İlk lokmayı yavaşça çiğneyin, tadı, dokuyu ve kokuyu fark edin. Bu uygulama özellikle duygusal yeme ile çalışırken de yardımcı olabilir.",
      "Duyularla anda kalmak. Zihin döngülere kapıldığında çevrenizde görebildiğiniz, duyabildiğiniz ve dokunabildiğiniz şeylere dikkatinizi vermek sizi şimdiye getirir.",
      "## Nasıl başlanır?",
      "Her gün birkaç dakikayla başlamak, uzun ve düzensiz uygulamalardan daha etkilidir. Beklenti oluşturmadan, merakla denemek ve kendinize nazik davranmak önemlidir. Çok yoğun travma ya da şiddetli depresyon yaşıyorsanız, özellikle oturarak yapılan uzun uygulamalar rahatsız edici olabilir; bu durumda bir uzman eşliğinde ilerlemek daha güvenlidir.",
      "Bu yazı genel bilgilendirme amacı taşır ve bireysel bir değerlendirmenin yerini tutmaz."
    ]
  },
  {
    "slug": "yasamin-degisen-donemlerinde-psikolojik-uyum",
    "title": "Yaşamın Değişen Dönemlerinde Psikolojik Uyum",
    "category": "Yaşam geçişleri",
    "excerpt": "Taşınma, yeni bir iş, ebeveynlik ya da kayıp: geçiş dönemlerinde zorlanmak neden doğal ve neler iyi gelir?",
    "body": [
      "Yeni bir şehre taşınmak, işten ayrılmak, evlenmek, ebeveyn olmak, bir sevdiğini kaybetmek ya da bir sağlık sorunuyla karşılaşmak. Hayat, bazen planladığımız bazen de hiç beklemediğimiz anlarda yön değiştirir. İyi bir değişiklik bile bir alışma süreci gerektirir; bu yüzden geçiş dönemlerinde zorlanmak bir zayıflık değil, insani bir tepkidir.",
      "## Değişim neden yorar?",
      "Yaşamdaki her önemli geçiş, bildiğimiz rutinleri, rollerimizi ve beklentilerimizi bir süreliğine belirsiz hâle getirir. Zihin yeni durumu anlamlandırmaya, beden de yeni düzene uyum sağlamaya çalışır. Bu dönemde uykuda bozulma, huzursuzluk, ilgi kaybı, çabuk yorulma, gerginlik ya da duygu dalgalanmaları görülebilir. Bunlar çoğu zaman uyum sürecinin geçici bir parçasıdır.",
      "## Geçişlerde kayıp ve kazanç birlikte yaşanır",
      "İstediğimiz bir değişiklik bile bir şeyi geride bırakmayı içerir. Yeni bir işe başlarken eski ekibi özlemek, ebeveyn olurken eski hayatı arayıp suçluluk duymak sık yaşanan, çelişkili gibi görünen ama tamamen anlaşılır duygulardır. Duyguları “yanlış” diye bastırmak yerine olduğu gibi tanımak, uyumu kolaylaştırır.",
      "## Uyumu destekleyen yaklaşımlar",
      "Rutin oluşturun. Her şey değişirken uyku, yemek ve hareket saatleri gibi küçük sabitler öngörülebilirlik hissi verir. Büyük hedefler yerine küçük ve yapılabilir günlük adımlar belirlemek, kontrol duygusunu geri kazandırır.",
      "Esnek düşünün. “Eskisi gibi olmalıyım” ya da “Bu kadar zorlanmamalıydım” gibi katı beklentiler, zorlanmanın üstüne bir de kendini eleştirme yükü ekler. Kendinize, yakın bir arkadaşınıza göstereceğiniz anlayışı göstermeyi deneyin.",
      "Değerlerinize dönün. Hayatınızda önem verdiğiniz şeyler (ilişkiler, öğrenme, üretme, sağlık gibi) değişim sırasında da yön gösterir. Bu alanlarda yapılabilecek küçük bir eylem, belirsizlik içinde bile anlam duygusunu korur.",
      "Destek alın ve paylaşın. Yaşadıklarınızı güvendiğiniz biriyle konuşmak, yalnız olmadığınızı hissettirir. Benzer süreçlerden geçen kişilerle bağ kurmak da normalleştirici bir etki yapar.",
      "Bedeninize iyi bakın. Düzenli uyku, hareket ve nefes ya da farkındalık egzersizleri, yoğun duyguların bedendeki etkisini hafifletir ve zihnin daha dengeli çalışmasına yardımcı olur.",
      "## Ne zaman destek almak gerekir?",
      "Zorlanma haftalarca sürüyor, günlük işlevlerinizi (iş, bakım, ilişkiler) belirgin biçimde etkiliyor ya da umutsuzluk, yoğun kaygı ve çaresizlik hissi giderek artıyorsa psikolojik destek almak değerlidir. Kayıp ve yas gibi ağır süreçlerde de profesyonel bir eşlikçi, duyguların yerini bulmasına ve yeni düzene adım adım uyum sağlanmasına yardımcı olabilir.",
      "Bu yazı genel bilgilendirme amacı taşır ve bireysel bir değerlendirmenin yerini tutmaz."
    ]
  }
];

export const categories = Array.from(new Set(posts.map((p) => p.category)));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Ortalama 200 kelime/dk ile okuma süresi (dakika). */
export function readingMinutes(p: Post) {
  const words = (p.body ?? []).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Ara başlıktan sayfa içi bağlantı kimliği üretir (Türkçe karakterleri sadeleştirir). */
export function slugify(text: string) {
  return text
    .toLocaleLowerCase("tr")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
