import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const getConversations = async () => {
  const currentUser = await currentProfile();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversation = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        profileIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversation;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
