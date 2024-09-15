"use client";

import UserEmailFetcher from "@/app/actions/getCurrentUserEmail";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import AvatarGroup from "@/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const router = useRouter();
  const email = UserEmailFetcher(data);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return email;
  }, [email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a conversation";
  }, [lastMessage]);

  // Determine the display name
  const displayName = useMemo(() => {
    if (data.isGroup) {
      return data.name; // Group name
    }
    return otherUser?.name || data.name; // User name or fallback to conversation name
  }, [data.isGroup, data.name, otherUser]);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  return (
    <div
      className={clsx(
        `w-full relative p-2 flex items-center mb-2 space-x-3 hover:bg-neutral-800 rounded-md cursor-pointer transition`,
        selected ? "bg-neutral-800" : "bg-slate-700"
      )}
      onClick={handleClick}
    >
      {/* Avatar */}
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : otherUser ? (
        <div className="relative">
          {isActive && (
            <span className="absolute z-50 block rounded-full bg-green-500 ring-2 ring-green-500 top-0 right-1 h-2 w-2" />
          )}
          <Avatar className="relative">
            <AvatarImage src={otherUser.imageUrl} alt={otherUser.id} />
            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Skeleton className="w-12 h-12 rounded-full" />
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex items-center justify-between mb-1">
            {otherUser ? (
              <>
                <div className="text-md font-medium text-white">
                  {displayName}
                </div>
                {lastMessage?.createdAt && (
                  <div className="text-xs text-gray-400 font-light">
                    {format(new Date(lastMessage?.createdAt), "p")}
                  </div>
                )}
              </>
            ) : (
              <>
                <Skeleton className="w-1/2 h-4 mb-1" />
                <Skeleton className="w-1/4 h-4 mb-1" />
              </>
            )}
          </div>
          <div
            className={clsx(
              `truncate text-sm`,
              hasSeen ? "text-gray-500" : "text-slate-200 font-medium"
            )}
          >
            {otherUser ? lastMessageText : <Skeleton className="w-full h-4" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
