"use client";
import React, { useState } from "react";
import { FullMessageType } from "@/app/types";
import { Conversation, Profile } from "@prisma/client";
import HeaderPage from "../Header/Header";
import BodyComponent from "../Body/Body";
import FormComponent from "../Form/Form";

interface HeaderBodyMixProps {
  messages: FullMessageType[];
  conversation: Conversation & { users: Profile[] };
}

const HeaderBodyMix: React.FC<HeaderBodyMixProps> = ({
  messages,
  conversation,
}) => {
  const [selectedMessageId, setSelectedMessageId] = useState<string>("");

  const handleMessageSelect = (messageId: string) => {
    setSelectedMessageId(messageId);
  };

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <HeaderPage
          initialMessages={messages}
          conversation={conversation}
          handleMessageSelect={handleMessageSelect}
        />
        <BodyComponent
          initialMessages={messages}
          selectedMessageId={selectedMessageId}
        />
        <FormComponent />
      </div>
    </div>
  );
};

export default HeaderBodyMix;
