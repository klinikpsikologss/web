// Sık sorulan sorular. `home: true` olanlar ana sayfada, tümü /sss sayfasında gösterilir.
// Not: Cevaplar genel bilgilendirme niteliğindedir; seans ücreti, süresi gibi kişiye özel bilgiler eklenmemiştir.
export type Faq = { q: string; a: string; home?: boolean };

export const faqs: Faq[] = [
  {
    q: "Psikoterapi süreci nasıl ilerler?",
    a: "Süreç, sizi zorlayan durumu anlamak için yapılan ilk görüşmelerle başlar. Ardından sorunun nasıl işlediğini birlikte anlar ve ortak hedefler belirleriz. Seanslarda bu hedefler üzerinde çalışılır, belirli aralıklarla ilerleme gözden geçirilir ve hedeflere ulaşıldığında süreç planlı biçimde sonlandırılır.",
    home: true,
  },
  {
    q: "İlk terapi seansında neler konuşulur?",
    a: "İlk seans bir tanışma ve anlama görüşmesidir. Sizi neyin getirdiğini, bu zorlanmanın ne zamandır sürdüğünü ve yaşamınıza etkisini konuşuruz. Gizlilik, seansların düzeni ve çalışma çerçevesi de bu görüşmede netleştirilir. Her şeyi ilk seansta anlatmanız gerekmez.",
    home: true,
  },
  {
    q: "Terapiye başvurmayı ne zaman düşünmeliyim?",
    a: "Yaşadığınız zorlanma haftalardır sürüyorsa, günlük işleyişinizi, ilişkilerinizi ya da kendinizle ilgili hislerinizi etkiliyorsa ve tek başınıza baş etmek yorucu hâle geldiyse destek almayı düşünebilirsiniz. “Yeterince kötü” olmayı beklemek gerekmez.",
    home: true,
  },
  {
    q: "Hangi konularda psikolojik destek alabilirim?",
    a: "Kaygı ve panik, depresyon, travma, obsesif kompulsif bozukluk, yeme sorunları, ilişki ve iletişim sorunları, tükenmişlik, öz değer sorunları, psikoonkoloji ve hamilelik ya da doğum sonrası süreçler gibi pek çok alanda destek verilmektedir. Tüm başlıklara Çalışma Alanları sayfasından ulaşabilirsiniz.",
    home: true,
  },
  {
    q: "Psikoterapi süreci kaç seans sürer?",
    a: "Süre; sorunun niteliğine, sizin hedeflerinize ve sürece katılımınıza göre kişiden kişiye değişir. Bilişsel ve Davranışçı Terapiler hedef odaklı çalışır; ilk görüşmelerden sonra sürecin tahmini planını birlikte konuşur, ilerlemeyi düzenli aralıklarla gözden geçiririz.",
    home: true,
  },
  {
    q: "Online terapi ile yüz yüze terapi arasında ne gibi farklılıklar vardır?",
    a: "Terapinin yöntemi, hedefleri ve gizlilik ilkeleri aynıdır; yalnızca ortam değişir. Online görüşmeler görüntülü bağlantı üzerinden, bulunduğunuz yerden yapılır. Yüz yüze görüşmeler ise Bolu’daki kliniğimizde gerçekleşir. Hangisinin size uygun olduğunu ilk görüşmede birlikte değerlendirebiliriz.",
    home: true,
  },
  {
    q: "Görüşmelerde paylaştıklarım gizli kalır mı?",
    a: "Evet. Seanslarda paylaştığınız her şey gizlilik ilkesi çerçevesinde korunur. Gizliliğin istisnaları yalnızca yasal zorunluluklar ve kendinize ya da başkalarına yönelik ciddi bir zarar riskinin bulunduğu durumlarla sınırlıdır; bunlar ilk görüşmede açıkça anlatılır.",
  },
  {
    q: "Randevu nasıl alabilirim?",
    a: "İletişim sayfasındaki formu doldurabilir, telefonla arayabilir ya da e-posta gönderebilirsiniz. Size en kısa sürede dönüş yapılır ve uygun bir görüşme zamanı birlikte planlanır.",
  },
  {
    q: "Seans ücreti ve ödeme bilgisi için kimle görüşmeliyim?",
    a: "Seans ücreti ve ödeme ile ilgili bilgiler randevu görüşmesi sırasında paylaşılır. İletişim sayfasından ya da telefonla ulaşabilirsiniz.",
  },
  {
    q: "Çift terapisine ikimizin de katılması gerekir mi?",
    a: "Çift terapisi, ilişkinin kendisine odaklandığı için ideal olan her iki tarafın da süreçte yer almasıdır. Bir taraf katılmak istemiyorsa, kendi yaşadıklarınızı ele almak için bireysel görüşme de bir seçenek olabilir. Bu konuyu ilk görüşmede birlikte değerlendirebiliriz.",
  },
  {
    q: "Psikolog ilaç yazar mı?",
    a: "Hayır. İlaç yazma yetkisi psikiyatri uzmanlarına aittir. Psikoterapi sürecinde ilaç tedavisinin faydalı olabileceği bir durum söz konusuysa, sizi bir psikiyatri uzmanına yönlendirmek ve gerekirse birlikte çalışmak mümkündür.",
  },
  {
    q: "Çocuklar ve ergenlerle de çalışıyor musunuz?",
    a: "Bireysel psikoterapi ve çift terapisi hizmetleri yetişkinlere yöneliktir.",
  },
];

/** Arama sonuçlarında soru-cevap olarak gösterilebilmesi için yapılandırılmış veri (schema.org FAQPage). */
export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
