"use client";

import { useState, useEffect } from "react";
import getCurrentUserEmail from "@/app/actions/getCurrentUserEmail";
import { FullMessageType } from "@/app/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import ImageModal from "../ImageModal/ImageModal";
import Reaction from "../Reactions/Reaction";
import ContextMenuImage from "../ContextMenuImage/ContextMenuImage";
import ContextMenuText from "../ContextMenuText/ContextMenuText";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

// Define emoji options
const emojiOptions = ["👍", "❤️", "😂", "😮", "😢", "👏", "🔥", "💯"];

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
  messageId: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast, messageId }) => {
  const email = getCurrentUserEmail(data) as string;
  const isOwn = email === data?.sender?.email;

  const [imageModalOpen, setImageModelOpen] = useState(false);
  const [reactions, setReactions] = useState<{ [emoji: string]: string[] }>({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [emojiToRemove, setEmojiToRemove] = useState<string | null>(null);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await fetch(`/api/messages/${data.id}`);
        const result = await response.json();
        if (result.reactions && isValidReactions(result.reactions)) {
          setReactions(result.reactions);
        }
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    fetchReactions();
  }, [data.id]);

  const handleEmojiSelect = async (emoji: string) => {
    const userEmail = email;

    const userHasReacted = reactions[emoji]?.includes(userEmail);

    if (userHasReacted) {
      // Instead of window.confirm, open the custom confirmation modal
      setEmojiToRemove(emoji);
      setIsConfirmOpen(true);
      return;
    }

    // Update reactions optimistically
    setReactions((prevReactions) => {
      const newReactions = { ...prevReactions };

      // Remove user's previous reactions
      Object.keys(newReactions).forEach((key) => {
        newReactions[key] = newReactions[key].filter(
          (user) => user !== userEmail
        );
        if (newReactions[key].length === 0) delete newReactions[key];
      });

      // Add new reaction
      if (!newReactions[emoji]) {
        newReactions[emoji] = [];
      }
      newReactions[emoji].push(userEmail);

      return newReactions;
    });

    try {
      const response = await fetch(`/api/messages/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emoji, userEmail }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reactions");
      }
    } catch (error) {
      console.error("Error updating reactions:", error);
    }
  };

  const seenList = (data.seen || [])
    .filter((user) => user.email === data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx(
    "flex gap-3 p-4",
    isOwn ? "justify-end" : "justify-start"
  );
  const avatar = clsx("flex-shrink-0", isOwn && "order-2");
  const body = clsx(
    "relative flex flex-col max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] gap-2 p-3 rounded-lg",
    isOwn ? "bg-sky-900 text-gray-50" : "bg-gray-800 text-white",
    isOwn ? "arrow-right" : "arrow-left"
  );

  const message = clsx(
    "text-sm overflow-hidden w-full rounded-lg break-words",
    data.image ? "p-0" : "py-2 px-3 border-2",
    isOwn
      ? "bg-sky-600 text-white border-sky-900"
      : "bg-gray-600 border-gray-900 text-white"
  );

  const confirmRemoveReaction = async () => {
    if (!emojiToRemove) return;

    const userEmail = email;
    const emoji = emojiToRemove;

    setIsConfirmOpen(false);
    setEmojiToRemove(null);

    // Proceed to delete the reaction
    try {
      const response = await fetch(`/api/messages/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emoji, userEmail }),
      });

      if (response.ok) {
        // Update reactions optimistically
        setReactions((prevReactions) => {
          const newReactions = { ...prevReactions };

          // Remove the user's reaction
          if (newReactions[emoji]) {
            newReactions[emoji] = newReactions[emoji].filter(
              (user) => user !== userEmail
            );

            // If no users are left for this emoji, remove the emoji
            if (newReactions[emoji].length === 0) {
              delete newReactions[emoji];
            }
          }

          return newReactions;
        });
      } else {
        console.error("Failed to delete reaction");
      }
    } catch (error) {
      console.error("Error deleting reaction:", error);
    }
  };

  const cancelRemoveReaction = () => {
    setIsConfirmOpen(false);
    setEmojiToRemove(null);
  };

  return (
    <div className={container}>
      <div className={avatar}>
        <div className="relative">
          <span className="absolute z-10 block rounded-full bg-green-500 ring-2 ring-green-500 top-0 right-1 h-2 w-2" />
          <Avatar className="relative">
            <AvatarImage src={data.sender.imageUrl} />
            <AvatarFallback>{data.sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <ContextMenu>
        <ContextMenuTrigger>
          <div className={body}>
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="text-sm font-semibold">{data.sender.name}</div>
              <div className="text-xs text-white">
                {format(new Date(data.createdAt), "p")}
              </div>
            </div>
            <div className={message}>
              <ImageModal
                src={data.image}
                isOpen={imageModalOpen}
                onClose={() => setImageModelOpen(false)}
              />
              {data.image ? (
                <Image
                  onClick={() => setImageModelOpen(true)}
                  src={data.image}
                  alt="Message Image"
                  height={288}
                  width={288}
                  className="object-cover rounded-lg bg-sky-500 cursor-pointer"
                />
              ) : (
                data.body
              )}
            </div>
            {isLast && isOwn && seenList.length > 0 && (
              <div className="text-xs font-light text-gray-100">{`Seen by ${seenList}`}</div>
            )}

            {/* Display the reactions */}
            <Reaction
              isOwn={isOwn}
              reactions={reactions}
              handleEmojiSelect={handleEmojiSelect}
              messageId={messageId}
            />
          </div>
        </ContextMenuTrigger>

        {/* Context Menu for Reactions and Other Actions */}
        <ContextMenuContent className="w-[240px] p-2 bg-gray-900 border-none">
          <div className="flex flex-wrap gap-2 mb-2">
            {emojiOptions.map((emoji) => {
              // Get the count of the current emoji

              return (
                <ContextMenuItem
                  key={emoji}
                  onSelect={() => handleEmojiSelect(emoji)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <span className="text-xl">{emoji}</span>
                </ContextMenuItem>
              );
            })}
          </div>

          {data.image ? <ContextMenuImage /> : <ContextMenuText />}

          <ContextMenuSeparator className="bg-gray-700" />
        </ContextMenuContent>
      </ContextMenu>
      {email && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          onConfirm={confirmRemoveReaction}
          onClose={cancelRemoveReaction}
          emoji={emojiToRemove || ""}
        />
      )}
    </div>
  );
};

// Validate reactions structure to prevent rendering issues
const isValidReactions = (reactions: any): boolean => {
  return (
    reactions &&
    typeof reactions === "object" &&
    !Array.isArray(reactions) &&
    Object.keys(reactions).every(
      (key) =>
        Array.isArray(reactions[key]) &&
        reactions[key].every((user) => typeof user === "string")
    )
  );
};

export default MessageBox;
