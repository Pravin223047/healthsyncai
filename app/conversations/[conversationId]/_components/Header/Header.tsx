"use client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useOnClickOutside from "@/hooks/clickoutsidedropdown";
import { Conversation, Profile } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import {
  HiChevronLeft,
  HiEllipsisHorizontal,
  HiPhone,
  HiVideoCamera,
} from "react-icons/hi2";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer";
import { FullMessageType } from "@/app/types";
import AvatarGroup from "@/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & { users: Profile[] };
  initialMessages: FullMessageType[];
  handleMessageSelect: (messageId: string) => void;
}

const HeaderPage: React.FC<HeaderProps> = ({
  conversation,
  initialMessages,
  handleMessageSelect,
}) => {
  const otherUser = useOtherUser(conversation);
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.includes(otherUser?.email || "");

  const callDropdownRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(callDropdownRef, () => setIsCallPopupOpen(false));

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  const toggleCallPopup = () => {
    setIsCallPopupOpen((prev) => !prev);
  };

  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsProfileDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsProfileDrawerOpen(false);
  };

  const handleSelectMessage = (messageId: string) => {
    handleMessageSelect(messageId);
  };

  return (
    <>
      <ProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={handleCloseDrawer}
        data={conversation}
        onMessageSelect={handleSelectMessage}
        initialMessages={initialMessages}
      />
      <div className="bg-slate-800 text-white w-full flex justify-between items-center border-b border-slate-600 sm:px-4 py-3 px-4 lg:px-6 shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-400 hover:text-sky-600 transition cursor-pointer"
            aria-label="Back to conversations"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <div className="relative">
              {isActive && (
                <span className="absolute z-50 block rounded-full bg-green-500 ring-2 ring-green-500 top-0 right-1 h-2 w-2" />
              )}

              <Avatar className="relative">
                <AvatarImage src={otherUser?.imageUrl} />
                <AvatarFallback>{otherUser?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          )}

          <div className="flex flex-col">
            <div>{conversation.name || otherUser?.name}</div>
            <div className="text-sm font-light text-blue-500">{statusText}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative" ref={callDropdownRef}>
            <HiPhone
              size={32}
              onClick={toggleCallPopup}
              className="text-sky-500 cursor-pointer bg-slate-700 p-2 rounded-md hover:text-sky-600 transition"
              aria-label="Call options"
            />
            {isCallPopupOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-slate-900 text-white rounded-lg shadow-lg p-2 z-50">
                <div
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 transition rounded"
                  onClick={() => setIsCallPopupOpen(false)}
                >
                  <HiPhone size={20} className="text-gray-100" />
                  <span className="text-sm">Audio Call</span>
                </div>
                <div
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 transition rounded"
                  onClick={() => setIsCallPopupOpen(false)}
                >
                  <HiVideoCamera size={20} className="text-gray-100" />
                  <span className="text-sm">Video Call</span>
                </div>
              </div>
            )}
          </div>
          <HiEllipsisHorizontal
            size={32}
            onClick={handleOpenDrawer}
            className="text-sky-500 cursor-pointer bg-slate-700 rounded-md hover:text-sky-600 transition"
            aria-label="More options"
          />
        </div>
      </div>
    </>
  );
};

export default HeaderPage;
