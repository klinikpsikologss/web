// Çalışma alanı sayfalarının içerikleri (slug → özet + metin).
// Metin içinde "## " ile başlayan satır ara başlık olur. Düzenlemek için ilgili slug'ın metnini değiştirmek yeterli.
type Entry = { summary: string; body: string[] };

export const content: Record<string, Entry> = {
  "anksiyete-bozukluklari": {
    summary: "Kaygının gündelik hayatı belirgin biçimde zorlaştırdığı durumlar ve bu süreçte birlikte neler yapılabileceği.",
    body: [
      "Kaygı, tehlike ya da belirsizlik karşısında ortaya çıkan doğal bir tepkidir. Ancak bu tepki çok sık, çok yoğun ya da gerçek tehlikeyle orantısız olduğunda, uyku, iş, ilişkiler ve karar verme gibi alanları etkilemeye başlar. Anksiyete bozuklukları; yaygın kaygı, panik, fobiler, sosyal kaygı ve sağlık kaygısı gibi farklı biçimlerde görülebilen bir grup durumu kapsar.",
      "## Nasıl kendini gösterebilir?",
      "Sürekli gerginlik ve huzursuzluk, kontrol edilmesi zor endişeler, kas gerginliği, çarpıntı, nefes darlığı, uykuya dalmakta güçlük, dikkat toplamakta zorlanma ve kaygı uyandıran durumlardan kaçınma sık görülen belirtilerdir. Kaçınma kısa vadede rahatlatır, uzun vadede ise kaygının sürmesine yol açar.",
      "## Terapide nasıl çalışılır?",
      "Bilişsel ve Davranışçı Terapiler (BDT) kaygıyı düşünce, duygu, bedensel duyum ve davranışın birbirini besleyen bir döngüsü olarak ele alır. Terapide önce bu döngü sizin deneyiminiz üzerinden birlikte haritalanır. Ardından kaygı uyandıran düşünceleri sorgulama, kaçınılan durumlara kademeli olarak yaklaşma ve bedensel gerginlikle başa çıkma becerileri üzerinde çalışılır. Amaç kaygıyı tamamen yok etmek değil, onunla yaşamınızı kısıtlamadan ilişki kurabilmenizdir.",
    ],
  },

  "yaygin-kaygi-bozuklugu": {
    summary: "Gündelik pek çok konuda kontrol edilmesi zor, sürekli bir endişe hâli.",
    body: [
      "Yaygın kaygı bozukluğunda endişe tek bir konuya bağlı değildir; sağlık, iş, para, aile ya da gelecek gibi birçok alana yayılır ve çoğu zaman “ya olursa” sorularıyla ilerler. Endişe uzun süredir (genellikle aylarca) sürer ve durdurmak zor gelir.",
      "## Nasıl kendini gösterebilir?",
      "Sürekli gerginlik, kolay yorulma, dikkat toplamakta güçlük, kas gerginliği, sinirlilik ve uyku sorunları eşlik edebilir. Kişi çoğu zaman endişelenmenin kendisini korumaya yaradığına inanır; bu inanç endişeyi sürdüren etkenlerden biridir.",
      "## Terapide nasıl çalışılır?",
      "BDT’de endişenin işlevi, endişeye dair inançlar ve belirsizliğe tahammül düzeyi birlikte ele alınır. Çözülebilir sorunlarla çözülemeyen “ya olursa” düşüncelerini ayırma, endişe için zaman sınırlama, güvence aramayı azaltma ve şimdiki ana odaklanma (mindfulness) becerileri üzerinde çalışılır. Amaç, belirsizlik olsa bile işlev görebilmenin yollarını geliştirmektir.",
    ],
  },

  "panik-bozukluk": {
    summary: "Ani ve yoğun korku nöbetleri ile yeni bir nöbet yaşama korkusu.",
    body: [
      "Panik atak, birkaç dakika içinde doruğa çıkan yoğun bir korku ve bedensel belirti dalgasıdır. Panik bozuklukta bu ataklar tekrarlar ve kişi yeni bir atak yaşama korkusuyla yaşamaya başlar.",
      "## Nasıl kendini gösterebilir?",
      "Çarpıntı, göğüste sıkışma, nefes darlığı, terleme, titreme, baş dönmesi, kontrolü kaybetme ya da ölüm korkusu görülebilir. Bu belirtiler tehlikeli bir hastalığın işareti gibi algılandığında kaygı artar ve atak güçlenir. Zamanla kişi atak yaşayabileceği yerlerden (kalabalık, toplu taşıma, yalnız kalmak) kaçınmaya başlayabilir.",
      "## Terapide nasıl çalışılır?",
      "BDT’de önce panik döngüsü birlikte anlaşılır: bedensel duyum, felaket yorumu, kaygının artması ve duyumların güçlenmesi. Ardından bedensel duyumlara dair yanlış yorumlar sorgulanır, atağı çağrıştıran duyumlara kontrollü biçimde yaklaşılır ve kaçınılan yerlere kademeli olarak dönülür. Nefes ve gevşeme çalışmaları destekleyici olarak kullanılır. Atak sırasında yaşanan belirtiler başka bir sağlık sorunundan kaynaklanıyor olabileceği için hekim değerlendirmesi de önemlidir.",
    ],
  },

  "ozgul-fobiler": {
    summary: "Belirli bir nesne ya da duruma karşı orantısız korku ve bundan kaçınma.",
    body: [
      "Özgül fobi; yükseklik, uçmak, kan ve iğne, hayvanlar, kapalı alanlar gibi belirli bir nesne ya da duruma karşı, gerçek tehlikeyle orantısız ve kolayca azalmayan bir korkudur. Kişi çoğu zaman korkusunun abartılı olduğunu bilir, ancak bu bilgi korkuyu durdurmaya yetmez.",
      "## Nasıl kendini gösterebilir?",
      "Korkulan durumla karşılaşıldığında ya da karşılaşma düşünüldüğünde yoğun kaygı, çarpıntı ve kaçma isteği görülür. Zamanla kişi günlük planlarını korkudan kaçınacak şekilde düzenleyebilir; bu da yaşam alanını daraltır.",
      "## Terapide nasıl çalışılır?",
      "Özgül fobilerde BDT’nin kademeli maruz bırakma yöntemi en çok kullanılan yaklaşımlardandır. Korkulan durumlar birlikte bir sıraya dizilir, en kolay basamaktan başlanarak planlı ve güvenli biçimde yaklaşılır. Bu sırada korkuyla ilgili düşünceler de ele alınır. Kaçınma azaldıkça, korkunun beklenen sonuçlarının gerçekleşmediği deneyimlenir ve kaygı zamanla hafifler.",
    ],
  },

  "sosyal-anksiyete": {
    summary: "Başkalarının önünde değerlendirilme, yargılanma ya da utanma korkusu.",
    body: [
      "Sosyal anksiyete, başkalarının önünde yanlış bir şey yapıp küçük düşme ya da olumsuz değerlendirilme korkusudur. Toplantıda konuşmak, tanımadığı biriyle sohbet etmek, yemek yemek ya da birine bir şey sormak gibi gündelik durumlar bile yoğun kaygı yaratabilir.",
      "## Nasıl kendini gösterebilir?",
      "Kızarma, titreme, ses titremesi, terleme ve zihnin boşalması gibi belirtiler; konuşma öncesinde uzun süren endişe ve konuşma sonrasında yaşananları tekrar tekrar zihinde gözden geçirme sık görülür. Kişi sosyal ortamlardan kaçınabilir ya da çok yoğun bir çabayla katlanabilir.",
      "## Terapide nasıl çalışılır?",
      "BDT’de sosyal durumlarda dikkatin kendine çevrilmesi, kendini olumsuz değerlendirme ve güvenlik davranışları (göz teması kurmamak, önceden prova yapmak gibi) ele alınır. Davranışsal deneyler ve kademeli maruz kalma ile “insanlar beni sert biçimde yargılar” gibi tahminler gerçek deneyimlerle sınanır. Dikkati kendinden dışarıya yöneltmek ve sosyal beceriler üzerinde çalışmak sürecin parçalarıdır.",
    ],
  },

  "saglik-kaygisi": {
    summary: "Bedensel duyumların ciddi bir hastalığın belirtisi olduğu düşüncesi ve sürekli kontrol etme ihtiyacı.",
    body: [
      "Sağlık kaygısında kişi, bedensel duyumları ya da küçük belirtileri ciddi bir hastalığın işareti olarak yorumlar ve bu düşünceden kurtulmakta zorlanır. Doktor muayenesi ya da normal çıkan tetkikler çoğu zaman kısa süreli rahatlama sağlar, ardından endişe geri döner.",
      "## Nasıl kendini gösterebilir?",
      "Bedeni sık sık kontrol etme, internette sürekli araştırma, yakınlarından ya da hekimlerden tekrar tekrar güvence isteme, ya da tam tersine doktora gitmekten kaçınma görülebilir. Bu davranışlar kaygıyı kısa vadede azaltır, uzun vadede sürdürür.",
      "## Terapide nasıl çalışılır?",
      "BDT’de bedensel duyumlara verilen yorumlar, dikkat ve kontrol davranışlarının rolü ve güvence arama döngüsü ele alınır. Duyumlara alternatif, daha dengeli açıklamalar geliştirilir; kontrol etme ve araştırma davranışları kademeli olarak azaltılır. Terapi sürecine başlamadan önce gerekli sağlık değerlendirmelerinin yapılmış olması önemlidir.",
    ],
  },

  "obsesif-kompulsif-bozukluk": {
    summary: "İstenmeyen, tekrarlayan düşünceler (obsesyon) ve bunları azaltmaya yönelik tekrarlayan davranışlar (kompulsiyon).",
    body: [
      "Obsesif kompulsif bozukluk (OKB), kişiyi rahatsız eden ve zihne istemeden gelen düşünce, görüntü ya da dürtüler (obsesyonlar) ile bu rahatsızlığı gidermek için yapılan tekrarlayan davranış ya da zihinsel eylemlerden (kompulsiyonlar) oluşur. Temizlik, kontrol, düzen, zarar verme korkusu, dinî ya da ahlaki konular sık görülen temalardandır.",
      "## Nasıl kendini gösterebilir?",
      "Kapının kilitli olup olmadığını tekrar tekrar kontrol etmek, uzun süre el yıkamak, belirli sayıda ya da belirli sırada bir şeyler yapmak, zihinde tekrarlamak ya da sürekli güvence istemek örnek olarak verilebilir. Kompulsiyonlar kısa süreli rahatlama sağlar ama obsesyonun güç kazanmasına yol açar ve zaman alır.",
      "## Terapide nasıl çalışılır?",
      "OKB için en iyi araştırılmış yaklaşım, BDT içinde yer alan maruz bırakma ve tepki önleme yöntemidir. Obsesyon uyandıran durumlara planlı ve kademeli olarak yaklaşılırken kompulsiyonun yapılmaması üzerinde çalışılır. Bu süreçte düşüncelere verilen anlamlar ve belirsizliğe tahammül de ele alınır. Terapi hızı ve basamaklar kişiye özel olarak birlikte belirlenir.",
    ],
  },

  "travma-sonrasi-stres-bozuklugu": {
    summary: "Yaşanan travmatik bir olayın ardından süren yeniden yaşama, kaçınma ve tetikte olma belirtileri.",
    body: [
      "Travma sonrası stres bozukluğu (TSSB), ölüm tehdidi, ciddi yaralanma, şiddet, kaza, doğal afet ya da kayıp gibi sarsıcı bir olayın ardından ortaya çıkabilen bir durumdur. Her travmatik olay TSSB’ye yol açmaz; ancak ilk haftalarda beklenen tepkiler zamanla azalmak yerine sürdüğünde destek almak önemlidir.",
      "## Nasıl kendini gösterebilir?",
      "Olayı istemsizce yeniden yaşama (anılar, kâbuslar, ani geri dönüşler), olayı hatırlatan yer ve durumlardan kaçınma, kendine ve dünyaya dair olumsuz inançlar, suçluluk ve utanç duyguları, duygusal küntleşme, aşırı tetikte olma, irkilme ve uyku sorunları görülebilir.",
      "## Terapide nasıl çalışılır?",
      "Travma odaklı BDT, anıyı güvenli bir çerçevede işlemeyi, travmaya dair düşünce ve inançları (örneğin “suç bendeydi”, “artık hiçbir yer güvenli değil”) gözden geçirmeyi ve kaçınılan hatırlatıcılara kademeli olarak yaklaşmayı içerir. Süreç, önce güvenlik ve baş etme becerileri kurularak, kişinin hızına göre ilerler. Anıyla çalışmak zorlayıcı olabileceğinden, tempo birlikte belirlenir.",
    ],
  },

  depresyon: {
    summary: "Süregelen çökkünlük, ilgi ve zevk kaybı ile enerji düşüklüğünün günlük yaşamı etkilemesi.",
    body: [
      "Depresyon, geçici bir üzgünlükten farklı olarak iki haftadan uzun süren, günün büyük bölümünde hissedilen çökkün ruh hâli ya da ilgi ve zevk kaybıyla seyreden, işlevselliği belirgin biçimde etkileyen bir durumdur. Kişinin kendi iradesiyle “toparlanabileceği” bir durum değildir.",
      "## Nasıl kendini gösterebilir?",
      "Sürekli üzgün ya da boşlukta hissetme, daha önce keyif alınan şeylerden zevk almama, enerji düşüklüğü, uyku ve iştah değişiklikleri, dikkat dağınıklığı, değersizlik ve suçluluk düşünceleri, gelecekle ilgili umutsuzluk ve hareketlerde yavaşlama görülebilir. Kendine zarar verme ya da yaşamı sonlandırma düşünceleri varsa gecikmeden bir ruh sağlığı uzmanına ya da acil servise başvurmak gerekir.",
      "## Terapide nasıl çalışılır?",
      "BDT’de depresyonu sürdüren iki alan birlikte ele alınır: davranışlar ve düşünceler. Davranışsal aktivasyon ile gün içinde kişiye anlamlı gelen ve keyif veren etkinlikler kademeli olarak yeniden planlanır. Bilişsel çalışmada ise “hiçbir şey düzelmeyecek” gibi olumsuz otomatik düşünceler fark edilir ve dengeli alternatiflerle karşılaştırılır. Orta ve ağır düzeylerde ilaç tedavisi için psikiyatri uzmanıyla birlikte çalışılması gerekebilir.",
    ],
  },

  "uzamis-yas": {
    summary: "Sevilen birinin kaybından uzun zaman sonra bile yoğunluğunu koruyan ve yaşamı kısıtlayan yas tepkisi.",
    body: [
      "Yas, bir kaybın ardından verilen doğal bir tepkidir ve herkes için farklı seyreder. Kayıptan uzun zaman sonra bile özlem, acı ve kaybı kabullenmekte güçlük yoğun biçimde sürüyor, günlük yaşamı belirgin biçimde kısıtlıyorsa, bu durum uzamış yas olarak ele alınabilir.",
      "## Nasıl kendini gösterebilir?",
      "Kaybedilen kişiye yoğun özlem, onunla ilgili düşüncelere takılıp kalma, kaybı gerçek kabul edememe, kayıpla ilgili hatırlatıcılardan kaçınma ya da tam tersine sürekli hatırlatıcılara yönelme, yaşamın anlamsızlaştığı hissi, duygusal uyuşukluk ve ilişkilerden uzaklaşma görülebilir.",
      "## Terapide nasıl çalışılır?",
      "Terapide yasın bir hastalık değil, sevginin bir yansıması olduğu kabul edilerek çalışılır. Kayıpla ilgili anıların ve duyguların güvenli biçimde ele alınması, kaçınılan durumlara kademeli yaklaşma, suçluluk ve “keşke” düşüncelerinin gözden geçirilmesi ve kayıp sonrası yaşamda yeniden anlam ve hedefler kurma üzerinde çalışılır. Süreç kişinin hızına saygı duyularak ilerler.",
    ],
  },

  "duygudurum-sorunlari": {
    summary: "Duygudurumdaki belirgin çökkünlük ya da yükselme dönemleri ve duygu dalgalanmaları.",
    body: [
      "Duygudurum sorunları; ruh hâlinin uzun süre çökkün kalması, olağandışı biçimde yükselmesi ya da bu iki durum arasında belirgin dalgalanmalar göstermesiyle kendini belli eder. Herkes zaman zaman iniş çıkışlar yaşar; ancak bu dalgalanmalar yoğun, uzun süreli ya da gündelik yaşamı bozacak ölçüde olduğunda destek almak önemlidir.",
      "## Nasıl kendini gösterebilir?",
      "Uzun süren üzüntü ve ilgi kaybının yanı sıra, bazı dönemlerde uyku ihtiyacında azalma, aşırı enerji, hızlı konuşma, fikirlerin akışında hızlanma, dürtüsel kararlar ya da aşırı sinirlilik gibi belirtiler görülebilir. Bu tür belirtilerde psikiyatrik değerlendirme önemlidir.",
      "## Terapide nasıl çalışılır?",
      "Psikoterapi, duygudurumdaki değişimlerin erken fark edilmesine, uyku ve günlük düzenin korunmasına, tetikleyicilerin belirlenmesine ve düşünce ile davranış örüntülerinin ele alınmasına odaklanır. BDT, özellikle depresif dönemlerde etkili beceriler kazandırır. Duygudurum sorunlarının izlenmesinde ve gerektiğinde ilaç tedavisinde psikiyatri uzmanıyla iş birliği yapılması önerilir.",
    ],
  },

  "iletisim-sorunlari": {
    summary: "Duygu ve düşünceleri ifade etmekte, dinlemekte ve anlaşılmakta yaşanan güçlükler.",
    body: [
      "İletişim sorunları; kendini ifade edememe, anlaşılmadığını hissetme, çatışmadan kaçınma ya da tartışmaların sürekli aynı noktada kilitlenmesi gibi biçimlerde yaşanabilir. Bu güçlükler yakın ilişkilerde, iş ortamında ve aile içinde kişinin yalnızlık ve yorgunluk hissini artırabilir.",
      "## Nasıl kendini gösterebilir?",
      "İstediğini ya da hissettiğini söyleyememe, hayır diyememe, sürekli kendini savunma, sessizliğe çekilme, suçlayıcı ya da yüksek sesli konuşma, karşıdakinin niyetini olumsuz okuma ve konuşmalardan sonra pişmanlık duyma örnek olarak verilebilir.",
      "## Terapide nasıl çalışılır?",
      "Terapide iletişim örüntüleri ve bu örüntüleri besleyen düşünce ve inançlar (“söylersem reddedilirim” gibi) fark edilir. Duyguları tanıma ve adlandırma, ben diliyle konuşma, sınır koyma, etkin dinleme ve çatışma anında kendini düzenleme becerileri üzerinde çalışılır. Yeni beceriler terapide denenir ve gündelik yaşamda uygulanır.",
    ],
  },

  "iliski-problemleri": {
    summary: "Çiftlerin ve yakın ilişkilerde yaşanan güven, yakınlık ve tekrar eden çatışma sorunları.",
    body: [
      "İlişki problemleri; tekrarlayan tartışmalar, uzaklaşma, güven sorunları, beklentilerin karşılanmaması, ilişkide yalnız hissetme ya da bağlanma güçlükleri gibi farklı biçimlerde ortaya çıkabilir. Çoğu zaman sorun tek bir kişide değil, iki tarafın birbirini tetikleyen örüntüsünde yatar.",
      "## Nasıl kendini gösterebilir?",
      "Aynı konuda tekrar eden tartışmalar, eleştiri ve savunma döngüsü, küçümseme, konuşmaktan kaçınma, duygusal ya da fiziksel mesafe, ilişkiden beklentilerin netleşmemesi ve ilişkinin geleceğine dair belirsizlik örnek olarak verilebilir.",
      "## Terapide nasıl çalışılır?",
      "Bireysel ya da çift terapisinde ilişkideki örüntüler, bu örüntülerin altında yatan ihtiyaçlar ve duygular ele alınır. Çift terapisinde Gottman yaklaşımından yararlanılarak iletişim biçimleri, çatışma yönetimi, güven ve yakınlığı güçlendirme becerileri üzerinde çalışılır. Bireysel terapide ise kişinin ilişkilerdeki inanç, beklenti ve davranış kalıpları ele alınır.",
    ],
  },

  "aile-ici-iletisim-ve-catismalar": {
    summary: "Ebeveyn, kardeş ve diğer aile üyeleriyle yaşanan iletişim güçlükleri ve süregelen çatışmalar.",
    body: [
      "Aile ilişkileri, kişinin en erken ve en kalıcı ilişkileridir; bu nedenle aile içindeki çatışmalar yoğun duygular uyandırır. Ebeveynle sınır sorunları, kardeşler arası rekabet, beklenti çatışmaları, yetişkin çocuk-ebeveyn ilişkileri ya da evlilik sonrası aile ilişkileri bu başlık altında ele alınabilir.",
      "## Nasıl kendini gösterebilir?",
      "Konuşmaların sık sık tartışmaya dönüşmesi, anlaşılmadığını ya da kontrol edildiğini hissetme, suçluluk ve borçluluk duyguları, sınır koymakta zorlanma, aile toplantılarından önce yoğun gerginlik ya da aile ile ilişkiyi tamamen koparma isteği görülebilir.",
      "## Terapide nasıl çalışılır?",
      "Terapide aile içindeki rollerin ve örüntülerin fark edilmesi, kişinin kendi duygu ve ihtiyaçlarını ifade etmesi, sağlıklı sınırların kurulması ve çatışma anlarında yapıcı iletişim yöntemlerinin geliştirilmesi üzerinde çalışılır. Amaç, aile ilişkilerini değerlendirirken kendi değerlerinize uygun, sürdürülebilir bir denge bulmanıza eşlik etmektir.",
    ],
  },

  "yeme-bozukluklari": {
    summary: "Yeme davranışı ve beden algısıyla ilgili, sağlığı ve yaşamı etkileyen sorunlar.",
    body: [
      "Yeme bozuklukları; yeme davranışında, beden algısında ve kilo ile şekle verilen değerde belirgin bozulmalarla seyreden, hem ruhsal hem bedensel sağlığı etkileyen durumlardır. Anoreksiya nervoza, bulimia nervoza ve tıkınırcasına yeme bozukluğu başlıca türleridir.",
      "## Nasıl kendini gösterebilir?",
      "Yemekle ilgili sürekli düşünme, katı kurallar ve diyetler, yemekten sonra suçluluk, kontrolsüz yeme, kusma ya da aşırı egzersiz gibi telafi davranışları, bedenden yoğun rahatsızlık duyma ve yemek yeme durumlarından kaçınma görülebilir. Sorun çoğu zaman yemekten çok kendilik değeriyle ve duygularla ilgilidir.",
      "## Terapide nasıl çalışılır?",
      "Yeme bozuklukları için geliştirilmiş BDT yaklaşımları, düzenli yeme düzeninin kurulmasını, beden ve kiloya verilen aşırı değerin ele alınmasını ve yeme davranışını tetikleyen duygu ve olayların anlaşılmasını hedefler. Yeme bozukluklarının bedensel sonuçları ciddi olabileceğinden hekim ve diyetisyen takibi sürece mutlaka eşlik etmelidir.",
    ],
  },

  "anoreksiya-nervoza": {
    summary: "Kilo almaktan yoğun korku, yeme kısıtlaması ve beden algısında bozulma.",
    body: [
      "Anoreksiya nervoza; kilo almaktan yoğun korku, enerji alımını belirgin biçimde kısıtlama ve beden algısında bozulma ile kendini gösterir. Kişi düşük kiloda olsa bile kendini kilolu görebilir. Bu durum yalnızca bir yeme sorunu değil, ciddi sağlık sonuçları olabilen bir ruhsal sağlık sorunudur.",
      "## Nasıl kendini gösterebilir?",
      "Katı yeme kuralları, kalori ve kilo takibi, yemek paylaşımından kaçınma, aşırı egzersiz, bedene dair sürekli kontrol ve soğuğa duyarlılık, halsizlik, adet düzensizliği gibi bedensel belirtiler görülebilir. Kişi çoğu zaman durumun ciddiyetini fark etmeyebilir.",
      "## Terapide nasıl çalışılır?",
      "Süreçte hekim ve diyetisyen takibi birlikte yürütülmelidir; bedensel durum ciddi olduğunda tıbbi izlem öncelik kazanır. BDT temelli terapide düzenli ve yeterli beslenmenin yeniden kurulması, kilo ve şekle verilen aşırı değerin ele alınması, katı kuralların ve mükemmeliyetçiliğin gözden geçirilmesi ve beden algısı üzerinde çalışılır. Ailenin sürece dâhil edilmesi çoğu zaman yararlıdır.",
    ],
  },

  "bulimia-nervoza": {
    summary: "Tekrarlayan aşırı yeme nöbetleri ve bunları ardından gelen telafi davranışları.",
    body: [
      "Bulimia nervoza, kısa sürede, kontrolü kaybettiğini hissederek yenen büyük miktarda yiyecek (tıkınma) ve ardından kilo almayı önlemek için yapılan telafi davranışlarıyla (kusma, müshil kullanımı, aşırı egzersiz, açlık) tanımlanır. Utanç ve gizlilik duyguları bu süreçte sık görülür.",
      "## Nasıl kendini gösterebilir?",
      "Tıkınma ve telafi döngüsü, yemekten sonra tuvalete gitme, bedene ve kiloya aşırı odaklanma, yeme konusunda gizlilik, suçluluk ve utanç duyguları görülür. Kusma ve müshil kullanımı sağlık açısından ciddi risk taşır; tıbbi değerlendirme önemlidir.",
      "## Terapide nasıl çalışılır?",
      "BDT temelli yaklaşımda düzenli yeme düzeni kurularak “kısıtlama–tıkınma” döngüsü kırılır. Tıkınmayı tetikleyen düşünce, duygu ve durumlar fark edilir, alternatif baş etme yolları geliştirilir; beden algısı ve kilo ile şekle verilen aşırı değer ele alınır. Süreçte hekim ve diyetisyen takibi birlikte yürütülür.",
    ],
  },

  "tikinircasina-yeme-bozuklugu": {
    summary: "Kontrolü kaybetme hissiyle tekrarlayan, utanç ve suçluluk eşlik eden aşırı yeme nöbetleri.",
    body: [
      "Tıkınırcasına yeme bozukluğunda kişi, belirli bir sürede çoğu insanın yiyeceğinden belirgin biçimde fazla yer ve yemeyi durduramadığını hisseder. Tıkınma sonrasında kusma gibi telafi davranışları görülmez; bunun yerine yoğun utanç, suçluluk ve kendini eleştirme yaşanır.",
      "## Nasıl kendini gösterebilir?",
      "Tok olmadığı hâlde çok hızlı yeme, rahatsız edici biçimde doyana kadar yeme, başkalarının yanında az, yalnızken çok yeme, tıkınma sonrası suçluluk ve depresif duygular görülebilir. Sıkça diyet–tıkınma döngüsü yaşanır.",
      "## Terapide nasıl çalışılır?",
      "BDT’de düzenli ve yeterli yemenin sağlanması, diyet ve kısıtlama kurallarının azaltılması, tıkınmayı tetikleyen duygu ve durumların fark edilmesi ve bunlar için alternatif baş etme becerilerinin geliştirilmesi üzerinde çalışılır. Beden algısı ve kendini eleştirme ele alınır. Diyetisyen ve gerektiğinde hekim desteği sürece katkı sağlar.",
    ],
  },

  "duygusal-yeme": {
    summary: "Açlıktan çok duygulara bağlı olarak yeme ve bu davranışın sürdürdüğü döngü.",
    body: [
      "Duygusal yeme, fiziksel açlık yokken stres, sıkıntı, yalnızlık, öfke ya da can sıkıntısı gibi duyguları yatıştırmak için yemeye yönelmektir. Zaman zaman yemekle rahatlamak herkes için olağandır; ancak sıklaştığında ve tek baş etme yolu hâline geldiğinde bir döngüye dönüşebilir.",
      "## Nasıl kendini gösterebilir?",
      "Ani ve güçlü yeme istekleri, belirli yiyeceklere yönelme, yedikten sonra suçluluk ve pişmanlık, diyet başlama ve bırakma döngüsü, yemek yerken farkında olmama ve duygusal yoğunluk anlarında yemenin tek çıkış gibi görünmesi örnek olarak verilebilir.",
      "## Terapide nasıl çalışılır?",
      "Terapide açlık ve duygu sinyallerini ayırt etme, yemeyi tetikleyen durum ve düşünceleri tanıma ve duygularla başa çıkmak için yeni yollar geliştirme üzerinde çalışılır. Katı diyetler yerine düzenli ve esnek bir yeme düzeni desteklenir; kendine yönelik eleştirel dilin yumuşatılması sürecin önemli bir parçasıdır. Mindfulness temelli farkındalık uygulamaları da destekleyici olabilir.",
    ],
  },

  "stres-ve-gunluk-yasam-sorunlari": {
    summary: "Yoğun iş, sorumluluk ve yaşam değişikliklerinin yarattığı sürekli gerginlik ve baş etme güçlüğü.",
    body: [
      "Stres, talepler ile baş etme kaynakları arasındaki dengesizlikte ortaya çıkar. Kısa süreli stres işlevseldir; ancak uzun süren, yoğun ve dinlenmeyle azalmayan stres uyku, ilişkiler, iş performansı ve beden sağlığını etkileyebilir.",
      "## Nasıl kendini gösterebilir?",
      "Sürekli gerginlik, sinirlilik, dikkat dağınıklığı, baş ve boyun ağrıları, uyku sorunları, yorgunluk, keyif alamama, işleri ertelemek ya da kontrolünü kaybetme hissi görülebilir. Bazı kişilerde stres yeme, içme ya da kaçınma gibi sağlıksız baş etme yollarına yönelmeyi artırır.",
      "## Terapide nasıl çalışılır?",
      "Terapide önce stresi yaratan durumlar ve bunlara verilen düşünce, duygu ve davranış tepkileri birlikte anlaşılır. Ardından öncelik belirleme, zaman ve sınır yönetimi, gevşeme ve nefes teknikleri, farkındalık uygulamaları ve stres yaratan düşünceleri dengeleme becerileri üzerinde çalışılır. Amaç stresi tamamen ortadan kaldırmak değil, onunla daha işlevsel başa çıkabilmektir.",
    ],
  },

  "uyum-sorunlari-ve-yasam-degisiklikleri": {
    summary: "Taşınma, iş değişikliği, ayrılık ya da yeni bir rol gibi yaşam değişikliklerine uyum sağlamakta zorlanma.",
    body: [
      "Yaşam değişiklikleri istenen ya da istenmeyen bir şekilde gelebilir: yeni bir şehre taşınmak, iş değiştirmek ya da işini kaybetmek, ayrılık, evlilik, ebeveyn olmak, emeklilik veya sağlık alanında yaşanan bir değişiklik gibi. Bu tür değişikliklerden sonra bir süre zorlanmak olağandır. Ancak sıkıntı beklenenden uzun sürüyor, yoğun yaşanıyor ya da gündelik işleyişi ve ilişkileri belirgin biçimde etkiliyorsa destek almak yararlı olabilir.",
      "## Nasıl kendini gösterebilir?",
      "Sürekli bir endişe ya da çökkünlük hali, sinirlilik, uyku ve iştah değişiklikleri, dikkat toplamakta güçlük, işe ya da sorumluluklara yönelik isteksizlik, kendini yeni duruma yabancı hissetme ve ilişkilerde çekilme görülebilir. Bu belirtiler genellikle değişikliğin ardından günler ya da haftalar içinde başlar.",
      "## Terapide nasıl çalışılır?",
      "Terapide kişinin yaşadığı değişikliğin kendisi için ne anlama geldiği, bu süreçte devreye giren düşünce ve duygu örüntüleri birlikte ele alınır. Belirsizliğe tahammülü artırma, baş etme becerilerini güçlendirme, destek kaynaklarını görünür kılma ve değerlerle uyumlu adımlar belirleme üzerinde çalışılır. Amaç, değişikliği ortadan kaldırmak değil, yeni duruma uyum sağlamayı kolaylaştırmaktır.",
    ],
  },

  tukenmislik: {
    summary: "Uzun süreli yoğun stresin ardından gelen duygusal, zihinsel ve bedensel tükenme.",
    body: [
      "Tükenmişlik, özellikle iş ve bakım verme gibi alanlarda uzun süre yüksek talep altında kalmanın ardından gelişen derin bir yorgunluk durumudur. Dünya Sağlık Örgütü tükenmişliği tıbbi bir hastalık olarak değil, işle ilgili bir olgu olarak tanımlar; ancak kişinin hem ruhsal hem de bedensel sağlığını etkileyebilir.",
      "## Nasıl kendini gösterebilir?",
      "Dinlenmeyle geçmeyen tükenme hissi, işe ya da sorumluluklara karşı mesafelenme ve alaycılık, verimin ve başarma duygusunun azalması, motivasyon kaybı, sinirlilik, uyku ve konsantrasyon sorunları ile bedensel yakınmalar görülebilir. Tükenmişlik zaman zaman depresyonla karışabilir; ayırt etmek için değerlendirme gerekir.",
      "## Terapide nasıl çalışılır?",
      "Terapide iş ve yaşam dengesi, sınır koyma, mükemmeliyetçilik, “hayır” diyememe ve kendini ihmal etme gibi tükenmeye zemin hazırlayan düşünce ve davranış örüntüleri ele alınır. Dinlenme ve iyileşme alanlarının yeniden kurulması, değerlerle uyumlu önceliklerin belirlenmesi ve stres yönetimi becerileri üzerinde çalışılır.",
    ],
  },

  "ofke-sorunlari": {
    summary: "Yoğun, sık ya da kontrol edilmesi zor öfkenin kişinin ilişkilerine ve yaşamına zarar vermesi.",
    body: [
      "Öfke, sınırların aşıldığı ya da haksızlığa uğrandığı durumlarda ortaya çıkan doğal ve işlevsel bir duygudur. Sorun, öfkenin çok sık, çok yoğun ya da kontrolü zor olduğu, kişinin ilişkilerine, işine ve kendi iç huzuruna zarar vermeye başladığı durumlarda ortaya çıkar.",
      "## Nasıl kendini gösterebilir?",
      "Küçük olaylara orantısız tepki verme, bağırma, kapıları çarpma, sonradan pişmanlık, öfkeyi içinde biriktirip patlama, ilişkilerde çatışmalar, bedensel gerginlik ve sürekli sinirli hissetme görülebilir. Öfkenin altında çoğu zaman kırgınlık, korku, değersizlik ya da yorgunluk gibi duygular yer alır.",
      "## Terapide nasıl çalışılır?",
      "BDT’de öfkeyi tetikleyen durumlar, bu durumlara verilen yorumlar (“bana saygısızlık ediyor” gibi) ve bedensel belirtiler fark edilir. Öfkeyi erken evrede tanıma, durma ve soğuma teknikleri, düşünceleri dengeleme, sınırları kendini ve başkalarını yıpratmadan ifade etme becerileri üzerinde çalışılır. Öfkeyi yok etmek değil, onu yönetilebilir ve yapıcı hâle getirmek hedeflenir.",
    ],
  },

  "degersizlik-ve-yetersizlik-algisi": {
    summary: "Kendini değersiz, yetersiz ya da sevilmeye layık değil olarak görme ve bunun yaşama yansımaları.",
    body: [
      "Değersizlik ve yetersizlik algısı, kişinin kendisi hakkında “yeterince iyi değilim”, “başarısızım” ya da “sevilmeye layık değilim” gibi köklü ve katı inançlar taşımasıdır. Bu inançlar çoğu zaman erken yaşantılarda şekillenir ve yetişkin yaşamda ilişkileri, işi ve kararları sessizce etkiler.",
      "## Nasıl kendini gösterebilir?",
      "Sürekli kendini eleştirme, mükemmeliyetçilik, başkalarının onayına aşırı ihtiyaç duyma, hayır diyememe, başarıları küçümseme, kendini başkalarıyla kıyaslama, reddedilme korkusu ve yeni şeyler denemekten kaçınma görülebilir.",
      "## Terapide nasıl çalışılır?",
      "BDT’de bu inançların nasıl oluştuğu ve hangi düşünce ve davranışlarla beslendiği birlikte anlaşılır. Kendini eleştiren iç sesin fark edilmesi, olumsuz kendilik inançlarını destekleyen ve çürüten kanıtların gözden geçirilmesi, daha dengeli ve şefkatli bir bakış geliştirilmesi ve davranışsal deneylerle yeni inançların sınanması üzerinde çalışılır. Değişim zaman alır; küçük adımlarla ilerlenir.",
    ],
  },

  "erteleme-ve-karar-verme-zorluklari": {
    summary: "İşleri sürekli sonraya bırakma ve karar vermekte yaşanan güçlükler.",
    body: [
      "Erteleme, yapılması gereken bir işi, olumsuz sonuçlarını bilmeye rağmen sürekli sonraya bırakmaktır. Karar verme güçlüğü ise seçenekler arasında kalıp bir türlü karar verememe ya da verdikten sonra sürekli şüphe duymadır. İkisi çoğu zaman tembellikle değil, kaygı, mükemmeliyetçilik ve hata yapma korkusuyla ilgilidir.",
      "## Nasıl kendini gösterebilir?",
      "Başlamakta zorlanma, son ana bırakma, işe başlamadan önce uzun hazırlık ya da kaçınma, “hazır hissettiğimde yaparım” düşüncesi, yanlış karar vermekten korkma, kararı başkalarına devretme ve karar sonrası pişmanlık yaşama görülebilir.",
      "## Terapide nasıl çalışılır?",
      "BDT’de ertelemeyi besleyen düşünceler (“mükemmel olmazsa yapmayayım”), duygular (kaygı, sıkılma) ve kaçınma davranışları ele alınır. İşleri küçük adımlara bölme, gerçekçi zaman planlama, başlama için kısa süreli hedefler belirleme ve karar vermeyi kolaylaştıracak ölçütler geliştirme gibi becerilerle çalışılır. Mükemmeliyetçilik ve hata yapma korkusu üzerinde de durulur.",
    ],
  },

  "dikkat-eksikligi-ve-hiperaktivite-bozuklugu": {
    summary: "Dikkati sürdürme, organize olma ve dürtüleri kontrol etmede süregelen güçlükler.",
    body: [
      "Dikkat eksikliği ve hiperaktivite bozukluğu (DEHB), çocuklukta başlayan ve yetişkinlikte de sürebilen, dikkati sürdürme, planlama ve organizasyon, dürtü kontrolü ve bazı kişilerde aşırı hareketlilik ile kendini gösteren bir nörogelişimsel durumdur. Tanı için bir psikiyatri uzmanı tarafından kapsamlı değerlendirme yapılması gerekir.",
      "## Nasıl kendini gösterebilir?",
      "Dikkatin kolay dağılması, işleri bitirememe, unutkanlık, eşya kaybetme, zaman yönetiminde zorlanma, ertelemek, sabırsızlık, düşünmeden hareket etme ve içsel huzursuzluk görülebilir. Bu güçlükler eğitim, iş ve ilişkilerde yıpranmaya ve düşük özgüvene yol açabilir.",
      "## Terapide nasıl çalışılır?",
      "Psikoterapi, DEHB’nin yerini almaz; ancak günlük yaşam becerilerini güçlendirir. BDT temelli çalışmada planlama ve zaman yönetimi, işleri parçalara bölme, hatırlatıcı ve düzen sistemleri kurma, dikkat dağıtıcıları yönetme ve yıllar içinde oluşan olumsuz kendilik inançlarını ele alma üzerinde çalışılır. İlaç tedavisi gerektiğinde psikiyatri uzmanıyla iş birliği yapılır.",
    ],
  },

  bagimlilik: {
    summary: "Madde ya da davranışı bırakmakta güçlük ve bunun yaşam alanlarına yansıyan olumsuz etkileri.",
    body: [
      "Bağımlılık, kişinin zararlarını bilmesine rağmen bir madde ya da davranışı (alkol, uyuşturucu, sigara, kumar, bahis gibi) bırakmakta zorlanması, kontrol kaybı ve yaşamın büyük bölümünün bununla şekillenmesiyle tanımlanır. Bağımlılık bir irade zayıflığı değil, beyin, duygu, alışkanlık ve çevresel etkenlerin birlikte rol oynadığı karmaşık bir sorundur.",
      "## Nasıl kendini gösterebilir?",
      "Kullanımı azaltma girişimlerinde başarısızlık, yoğun istek, kullanım için daha çok zaman ve para harcama, sorumlulukların aksaması, ilişkilerde bozulma, gizlilik, bırakınca ortaya çıkan huzursuzluk ve kullanımın duygulardan kaçmanın yolu hâline gelmesi görülebilir.",
      "## Terapide nasıl çalışılır?",
      "Süreç, değişim isteğinin ve motivasyonun desteklenmesiyle başlar. BDT’de kullanımı tetikleyen durum, düşünce ve duygular belirlenir; istekle başa çıkma, reddetme becerileri, alternatif etkinlikler ve nüks (yeniden kullanma) önleme planı üzerinde çalışılır. Madde bağımlılığında bırakma süreci tıbbi risk taşıyabileceğinden hekim eşliğinde yürütülmesi önemlidir.",
    ],
  },

  psikoonkoloji: {
    summary: "Kanser tanısı ve tedavi sürecinde hastaların ve yakınlarının yaşadığı duygusal zorluklara destek.",
    body: [
      "Psikoonkoloji, kanser tanısı ve tedavisi sürecinde ortaya çıkan ruhsal, sosyal ve davranışsal ihtiyaçlara odaklanan bir alandır. Tanı almak, tedavi süreci, yan etkiler, belirsizlik, kontrol kaygısı ve yaşam planlarının değişmesi hem hastalar hem de hasta yakınları için yoğun duygular yaratabilir.",
      "## Nasıl kendini gösterebilir?",
      "Tanı sonrası şok ve inanamama, yoğun kaygı ve korku, çökkünlük, öfke, uyku ve iştah sorunları, yineleme (nüks) korkusu, beden imajındaki değişim nedeniyle sıkıntı, ilişkilerde ve rollerde değişim ve yalnızlık hissi görülebilir. Hasta yakınları da suçluluk, tükenmişlik ve çaresizlik yaşayabilir.",
      "## Terapide nasıl çalışılır?",
      "Terapide duyguların güvenli biçimde ifade edilmesi, kaygı ve belirsizlikle baş etme, tedavi sürecine uyumu destekleme, ilişkilerde ve iletişimde yaşanan değişimleri ele alma ve yaşam anlamını yeniden kurma üzerinde çalışılır. Gerektiğinde hasta yakınlarına yönelik destek de sunulur. Çalışma, tedaviyi yürüten sağlık ekibinin yerini almaz, onu tamamlar.",
    ],
  },

  "hamilelik-ve-dogum-sonrasi-surecler": {
    summary: "Çocuk sahibi olma kararı, hamilelik ve doğum sonrası dönemde yaşanan duygusal değişimler ve zorluklar.",
    body: [
      "Çocuk sahibi olmayı düşünme, hamilelik ve doğum sonrası dönem, yoğun sevinç ile birlikte kaygı, belirsizlik ve kimlik değişimi de getirebilen hassas bir geçiş sürecidir. Bu dönemde zorlanmak, anne ya da baba olmaya uygun olmadığınız anlamına gelmez.",
      "## Nasıl kendini gösterebilir?",
      "Hamilelikte yoğun endişe, doğum korkusu, geçmiş kayıp ya da kötü deneyimlerin yeniden canlanması, bebeğe bağlanmada zorlanma; doğum sonrasında ise uzayan üzüntü, ağlama nöbetleri, sinirlilik, uyku sorunları, suçluluk, kendini yetersiz hissetme ve bebeğe zarar verecek düşünceler görülebilir. Doğum sonrası ilk günlerde kısa süren duygusal dalgalanmalar sık görülür; belirtiler iki haftadan uzun sürüyor ya da ağırlaşıyorsa destek almak önemlidir.",
      "## Terapide nasıl çalışılır?",
      "Terapide duyguların normalleştirilmesi, kaygı ve depresif belirtilerle baş etme, yeni rolü ve beklentileri gözden geçirme, eşle iletişim ve iş bölümü, kendine bakım ve destek ağını güçlendirme üzerinde çalışılır. Kendine ya da bebeğe zarar verme düşünceleri olduğunda acil olarak bir sağlık kuruluşuna başvurulmalıdır.",
    ],
  },

  "infertilite-ve-tup-bebek-sureci": {
    summary: "Çocuk sahibi olma sürecinde yaşanan belirsizlik, beklenti, kayıp ve tedavi yorgunluğu.",
    body: [
      "İnfertilite ve tüp bebek tedavisi, tıbbi sürecin yanı sıra duygusal olarak da yorucu olabilen bir yolculuktur. Beklemek, her ay umut ve hayal kırıklığı arasında gidip gelmek, tedavilerin getirdiği bedensel yük, maddi baskı ve çevreden gelen sorular kişileri ve çiftleri zorlayabilir.",
      "## Nasıl kendini gösterebilir?",
      "Yoğun kaygı ve belirsizlik, çökkünlük, suçluluk ve kendini suçlama, yetersizlik hissi, öfke, ilişkide gerginlik ve mesafe, sosyal ortamlardan (hamile arkadaşlar, doğum günleri gibi) kaçınma, tedavi sonuçlarını beklerken yoğun stres ve başarısız denemelerden sonra yas görülebilir.",
      "## Terapide nasıl çalışılır?",
      "Terapide bu sürecin yarattığı duyguların güvenle ifade edilmesi, belirsizlikle ve bekleme dönemleriyle baş etme, kendine yönelik suçlayıcı düşüncelerin gözden geçirilmesi, çiftler arasında iletişim ve destek ve gerektiğinde kayıp ve yas üzerinde çalışılır. Kararları ve tedavi tercihlerini kendi değerlerinize göre almanıza destek olmak amaçlanır; tıbbi süreç sizi takip eden hekim ekibi tarafından yürütülür.",
    ],
  },
};
