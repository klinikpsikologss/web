import { requireAuth } from "@/lib/cms/auth";
import { getMeta } from "@/lib/cms/content";
import { unreadCount } from "@/lib/cms/messages";
import { Logo } from "@/components/Logo";
import { Shell } from "@/components/panel/Shell";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();
  const [meta, unread] = await Promise.all([getMeta(), unreadCount()]);
  return (
    <Shell initialMeta={meta} initialUnread={unread} logo={<Logo variant="light" />}>
      {children}
    </Shell>
  );
}
