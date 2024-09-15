import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/chat/[id]/components/EmptyState";
import HeaderBodyMix from "./_components/HeaderBodyMix/HeaderBodyMix";

interface Iparams {
  conversationId: string;
}

const ConversationPage = async ({ params }: { params: Iparams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col ">
          <EmptyState />
        </div>
      </div>
    );
  }

  return <HeaderBodyMix messages={messages} conversation={conversation} />;
};

export default ConversationPage;
