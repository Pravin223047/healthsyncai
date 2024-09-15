import { ToasterProvider } from "@/components/toast-provider";
import getConversations from "../actions/getConversationsList";
import Sidebar from "../chat/[id]/components/Sidebar";
import ConversationList from "./_components/ConversationList";
import getUsers from "../actions/getUsers";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <>
      <ToasterProvider />
      <Sidebar>
        <div className="h-full">
          <ConversationList users={users} initialItems={conversations} />
          {children}
        </div>
      </Sidebar>
    </>
  );
}
