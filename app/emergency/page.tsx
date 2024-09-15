// pages/settings.tsx
"use client";
import React, { useState } from "react";
import Sidebar from "./_components/Sidebar/Sidebar";
import ChatContainer from "./_components/Sidebar/ChatContainer/ChatContainer";
import { Contact } from "@/lib/types";

const EmergencyPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  return (
    <div className="flex h-screen">
      <Sidebar onSelectContact={setSelectedContact} />
      <ChatContainer selectedContact={selectedContact} />
    </div>
  );
};

export default EmergencyPage;
