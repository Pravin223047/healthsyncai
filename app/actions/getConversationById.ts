import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await currentProfile();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;
