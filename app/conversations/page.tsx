"use client";
import React from "react";
import useConversation from "../hooks/useConversation";
import EmptyState from "../chat/[id]/components/EmptyState";
import clsx from "clsx";

const ConversationPage = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default ConversationPage;
