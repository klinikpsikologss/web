import Link from "next/link";
import { Photo, hasAsset } from "./Photo";
import { Mark } from "./Icons";
import { readingMinutesOf, type PostRec } from "@/lib/cms/content";

/** Yazının kapak görseli: panelden yüklenen kapak varsa o, yoksa public/blog/<slug>.jpg */
export const postCover = (p: Pick<PostRec, "slug" | "cover">) => p.cover || `/blog/${p.slug}.jpg`;

/** Blog kartı: görsel, konu ve okuma süresi, başlık, özet. */
export function PostCard({ post }: { post: PostRec }) {
  const src = postCover(post);
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-[0.875rem] shadow-[0_30px_60px_-36px_rgba(15,39,71,0.4)]">
        {hasAsset(src) ? (
          <Photo src={src} alt="" sizes="(min-width: 768px) 30vw, 90vw" className="aspect-[3/2]" editId={`post:${post.id}`} />
        ) : (
          <div data-edit-img={`post:${post.id}`} className="relative grid aspect-[3/2] place-items-center bg-gradient-to-br from-paper via-sand to-gold/40">
            <Mark className="h-14 w-14 text-navy/25" />
          </div>
        )}
      </div>
      <p className="mt-6 text-sm text-gold-deep">
        {post.category} <span className="mx-1.5 text-navy/30" aria-hidden="true">/</span> {readingMinutesOf(post)} dk okuma
        {post.status === "taslak" && <span className="ml-2 rounded-full bg-gold/30 px-2 py-0.5 text-xs text-navy">Taslak</span>}
      </p>
      <h3 className="mt-2 font-display text-[1.65rem] leading-snug text-navy transition-colors duration-500 group-hover:text-gold-deep">{post.title}</h3>
      {post.excerpt && <p className="mt-3 line-clamp-3 text-[0.95rem] text-muted">{post.excerpt}</p>}
    </Link>
  );
}
