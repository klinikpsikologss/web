/** Sayfaya bir veya birden çok JSON-LD (yapılandırılmış veri) bloğu ekler. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <>
      {(Array.isArray(data) ? data : [data]).map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
