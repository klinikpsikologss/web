// Başlıklarda her kelimenin ilk harfi büyük olur; "ve", "ile", "için" gibi bağlaçlar küçük kalır (Türkçe i/İ kurallarıyla).
const SMALL = new Set(["ve", "ile", "için", "veya", "ya", "da", "de", "mi", "mı", "mu", "mü", "ki"]);

export function titleCase(text: string): string {
  return text
    .split(" ")
    .map((w, i) => {
      if (!w || (i > 0 && SMALL.has(w.toLocaleLowerCase("tr")))) return w;
      const k = w.search(/\p{L}/u);
      if (k < 0) return w;
      return w.slice(0, k) + w.charAt(k).toLocaleUpperCase("tr") + w.slice(k + 1);
    })
    .join(" ");
}
