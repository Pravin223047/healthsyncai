"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { pusherClient } from "@/lib/pusher";

interface ReactionsProps {
  handleEmojiSelect: (emoji: string) => void;
  reactions: { [emoji: string]: string[] }; // emoji as key, users as an array
  messageId: string;
  isOwn: boolean;
}

const Reaction: React.FC<ReactionsProps> = ({
  handleEmojiSelect,
  reactions: initialReactions,
  messageId,
  isOwn,
}) => {
  const [reactions, setReactions] = useState<{ [emoji: string]: string[] }>(
    initialReactions || {}
  );

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await fetch(`/api/messages/${messageId}`);
        if (!response.ok) throw new Error("Failed to fetch reactions");

        const result = await response.json();
        if (isValidReactions(result.reactions)) {
          setReactions(result.reactions);
        }
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    fetchReactions();
  }, [messageId]);

  useEffect(() => {
    const newHandler = (data: { reactions: { [emoji: string]: string[] } }) => {
      setReactions(data.reactions);
    };

    const channel = pusherClient.subscribe(`message-${messageId}`);
    channel.bind("reaction:update", newHandler);

    return () => {
      channel.unbind("reaction:update", newHandler);
      pusherClient.unsubscribe(`message-${messageId}`);
    };
  }, [messageId]);

  const reactionsContainer = clsx("flex gap-2", isOwn ? "pr-1" : "pl-1");

  return (
    <div className={reactionsContainer}>
      {Object.entries(reactions).map(([emoji, users]) => {
        const count = users.length;
        return (
          <div key={emoji} className="relative flex items-center group">
            <span
              className="cursor-pointer bg-gray-900 hover:bg-gray-700 p-2 text-sm rounded-md flex items-center justify-between hover:text-gray-100 transition-colors"
              onClick={() => handleEmojiSelect(emoji)}
              title={count > 0 ? users.join(", ") : "No users"}
            >
              {emoji}
              {count > 0 && (
                <span className="text-sm text-gray-100 ml-1 pl-1">{count}</span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const isValidReactions = (
  reactions: any
): reactions is { [emoji: string]: string[] } => {
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

export default Reaction;
