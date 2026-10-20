import { currentUsername } from "@/lib/cms/auth";
import { getHistory, readDraft } from "@/lib/cms/content";
import { PageTitle } from "@/components/panel/kit";
import { Settings } from "@/components/panel/Settings";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [c, history, username] = await Promise.all([readDraft(), getHistory(), currentUsername()]);
  return (
    <>
      <PageTitle title="Ayarlar" lead="İletişim bilgileri, arama motoru ayarları, renkler ve hesap güvenliği." />
      <Settings site={c.site} seo={c.seo} theme={c.theme} username={username} history={history} />
    </>
  );
}
