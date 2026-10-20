import { createElement } from "react";
import { getContent } from "@/lib/cms/content";

/**
 * Satır içi düzenlenebilir metin. Yayındaki sitede düz metindir; panelden "Siteyi özelleştir" açıldığında
 * (taslak modu + düzenleme katmanı) tıklanıp doğrudan yazılabilir. `id` metnin kalıcı kimliğidir.
 */
export async function Edit({
  id,
  as = "span",
  className,
  style,
  children,
  multiline = false,
}: {
  id: string;
  as?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Varsayılan metin (panelde değiştirilmemişse bu gösterilir) */
  children: string;
  multiline?: boolean;
}) {
  const c = await getContent();
  const text = c.texts[id] ?? children;
  return createElement(
    as,
    {
      className,
      style: multiline ? { whiteSpace: "pre-line", ...style } : style,
      "data-edit-id": id,
      "data-edit-default": children,
      ...(multiline ? { "data-edit-multiline": "true" } : {}),
    },
    text,
  );
}
