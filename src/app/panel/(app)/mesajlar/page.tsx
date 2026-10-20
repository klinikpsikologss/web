import { listMessages } from "@/lib/cms/messages";
import { PageTitle } from "@/components/panel/kit";
import { Messages } from "@/components/panel/Messages";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  return (
    <>
      <PageTitle title="Mesajlar" lead="İletişim formundan gelen mesajlar. Mesajlar yalnızca bu panelde saklanır." />
      <Messages initial={await listMessages()} />
    </>
  );
}
