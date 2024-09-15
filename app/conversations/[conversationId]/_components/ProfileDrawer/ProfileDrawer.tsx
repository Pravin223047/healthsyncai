"use client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, Profile, Message } from "@prisma/client";
import { format } from "date-fns";
import React, { Fragment, useMemo, useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash, IoSearch } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FullMessageType } from "@/app/types";
import { ClipLoader } from "react-spinners";
import AlertDialogComponent from "./_components/DeleteAlertDialog/DeleteAlertDialog";
import AvatarGroup from "@/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface ProfileDrawerProps {
  data: Conversation & {
    users: Profile[];
    messages?: Message[];
  };
  isOpen: boolean;
  onClose: () => void;
  onMessageSelect: (messageId: string) => void;
  initialMessages: FullMessageType[];
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  onClose,
  isOpen,
  data,
  onMessageSelect,
  initialMessages,
}) => {
  const otherUser = useOtherUser(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const [isSearching, setIsSearching] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };

  // Filter out messages with images and apply search term filter
  const filteredMessages = useMemo(() => {
    if (!searchTerm || !messages.length) return [];
    return messages.filter((message) =>
      message.body?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, messages]);

  const groupedMessages = useMemo(() => {
    const grouped: { [key: string]: FullMessageType[] } = {};

    filteredMessages.forEach((message) => {
      const messageDate = format(new Date(message.createdAt), "yyyy-MM-dd");
      if (!grouped[messageDate]) {
        grouped[messageDate] = [];
      }
      grouped[messageDate].push(message);
    });

    return grouped;
  }, [filteredMessages]);

  const { members } = useActiveList();
  const isActive = members.includes(otherUser?.email!);

  const joinedDate = useMemo(() => {
    if (otherUser?.createdAt) {
      return format(new Date(otherUser.createdAt), "PP");
    }
    return "Unknown";
  }, [otherUser?.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser?.name || "Unknown";
  }, [data.name, otherUser?.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return isActive ? "Active" : "Offline";
  }, [data.isGroup, data.users.length, isActive]);

  const handleSearch = useCallback(() => {
    setIsSearching(true);
  }, []);

  const handleCloseSearch = useCallback(() => {
    setSearchTerm("");
    setIsSearching(false);
  }, []);

  const handleSelectMessage = useCallback(
    (messageId: string) => {
      onMessageSelect(messageId);
      onClose();
    },
    [onMessageSelect, onClose]
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className={"relative z-50"} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40">
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel
                      className={"pointer-events-auto w-screen max-w-md"}
                    >
                      <div className="flex h-full flex-col overflow-y-scroll bg-gray-900 text-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <button
                              onClick={onClose}
                              type="button"
                              className="rounded-md bg-gray-900 text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                              aria-label="Close Panel"
                            >
                              <IoClose size={24} />
                            </button>
                            {!isSearching ? (
                              <button
                                onClick={handleSearch}
                                type="button"
                                className="rounded-md bg-gray-900 text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                aria-label="Search"
                              >
                                <IoSearch size={24} />
                              </button>
                            ) : (
                              <div className="flex w-full gap-2 items-center justify-between mt-10">
                                <input
                                  type="text"
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  placeholder="Search messages..."
                                  className="w-full p-2 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                />
                                <button
                                  onClick={handleCloseSearch}
                                  type="button"
                                  className="rounded-md p-1 bg-rose-500 text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                  aria-label="Close Search"
                                >
                                  <IoClose size={28} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {!isSearching ? (
                          <div className="relative mt-6 flex-1 px-4 sm:px-6">
                            <div className="flex flex-col items-center">
                              <div className="mb-2">
                                {data.isGroup ? (
                                  <AvatarGroup users={data.users} />
                                ) : (
                                  <Avatar className="relative">
                                    <AvatarImage src={otherUser?.imageUrl} />
                                    <AvatarFallback>
                                      {otherUser?.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                              <div className="text-white text-lg font-semibold">
                                {title}
                              </div>
                              <div className="text-sm text-gray-400">
                                {statusText}
                              </div>
                              <div className="flex gap-10 my-8">
                                <div
                                  onClick={handleDeleteClick}
                                  className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                                >
                                  <div className="w-10 h-10 bg-rose-500 rounded-md text-white flex items-center justify-center shadow-lg">
                                    <IoTrash size={20} />
                                  </div>
                                  <div className="text-sm font-light text-gray-400">
                                    Delete
                                  </div>
                                </div>
                              </div>

                              {/* AlertDialog for confirming deletion */}
                              <AlertDialogComponent
                                isOpen={isDialogOpen}
                                onCancel={handleCancelDelete}
                              />
                              <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                                <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                  {data.isGroup && (
                                    <div>
                                      <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                        Group Emails
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-200 sm:col-span-2">
                                        <ul className="list-disc list-inside space-y-1">
                                          {data.users.map((user) => (
                                            <li
                                              key={user.id}
                                              className="text-gray-200"
                                            >
                                              {user.email}
                                            </li>
                                          ))}
                                        </ul>
                                      </dd>
                                    </div>
                                  )}
                                  {!data.isGroup && (
                                    <div>
                                      <dl className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                        Email
                                      </dl>
                                      <dd className="mt-1 text-sm text-gray-200 sm:col-span-2">
                                        {otherUser?.email ||
                                          "No email available"}
                                      </dd>
                                    </div>
                                  )}
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-200">
                                      {joinedDate}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative mt-6 flex-1 px-4 sm:px-6">
                            {filteredMessages.length ? (
                              <div>
                                {Object.keys(groupedMessages).map((date) => (
                                  <div key={date} className="mb-6">
                                    <div className="text-gray-500 text-xs mb-2">
                                      {date}
                                    </div>
                                    <ul>
                                      {groupedMessages[date].map((message) => (
                                        <li
                                          key={message.id}
                                          className="py-2 cursor-pointer hover:bg-gray-800"
                                          onClick={() =>
                                            handleSelectMessage(message.id)
                                          }
                                        >
                                          <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                              <Avatar className="relative">
                                                <AvatarImage
                                                  src={message.sender.imageUrl}
                                                />
                                                <AvatarFallback>
                                                  {message.sender.name.charAt(
                                                    0
                                                  )}
                                                </AvatarFallback>
                                              </Avatar>
                                            </div>
                                            <div className="ml-3">
                                              <div className="text-sm font-medium text-white">
                                                {message.sender.name}
                                              </div>
                                              <div className="text-sm text-gray-400">
                                                {message.body}
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center text-gray-400">
                                No messages found
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default ProfileDrawer;
