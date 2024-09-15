"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import React, { useRef, useState, useEffect } from "react";
import MessageBox from "../MessageBox/MessageBox";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
  selectedMessageId?: string;
}

const BodyComponent: React.FC<BodyProps> = ({
  initialMessages,
  selectedMessageId,
}) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const [isMessageSelected, setIsMessageSelected] = useState<boolean>(
    !!selectedMessageId
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const selectedMessageRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  // Scroll to bottom on message update or conversation change
  useEffect(() => {
    if (conversationId) {
      axios.post(`/api/conversations/${conversationId}/seen`);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationId, messages]);

  // Set up Pusher subscription and handler
  useEffect(() => {
    if (!conversationId) return; // Handle case where conversationId is not available

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) =>
          currentMessage.id === newMessage.id ? newMessage : currentMessage
        )
      );
    };

    pusherClient.subscribe(conversationId);
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  // Scroll to selected message
  useEffect(() => {
    if (selectedMessageId) {
      selectedMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      setIsMessageSelected(true);
    }
  }, [selectedMessageId]);

  // Handle click outside to deselect message
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMessageSelected) {
        setIsMessageSelected(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMessageSelected]);

  return (
    <div className="flex-1 overflow-y-auto chatbackground">
      {messages.map((message, i) => (
        <div
          key={message.id}
          ref={message.id === selectedMessageId ? selectedMessageRef : null}
          className={`${
            message.id === selectedMessageId && isMessageSelected
              ? "bg-neutral-800 opacity-90"
              : ""
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent click propagation to the document
        >
          <MessageBox
            isLast={i === messages.length - 1}
            data={message}
            key={message.id}
            messageId={message.id}
          />
        </div>
      ))}
      <div ref={bottomRef} className="pt-2" />
    </div>
  );
};

export default BodyComponent;
