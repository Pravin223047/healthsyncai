"use client";
import React, { useState, useEffect } from "react";
import { Contact } from "@/lib/types";
import MapContainer from "../../MapContainer/MapContainer";

const ChatContainer: React.FC<{ selectedContact: Contact | null }> = ({
  selectedContact,
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedContact) {
      // Fetch messages or initialize chat with the selected contact
      setMessages([]); // Initialize empty messages for now
    }
  }, [selectedContact]);

  const handleSendMessage = () => {
    setMessages([...messages, newMessage]);
    setNewMessage("");
  };

  return (
    <div className="flex-1 p-4">
      {selectedContact ? (
        <>
          <h2 className="text-lg font-bold">
            Chat with {selectedContact.name}
          </h2>
          <div className="mt-4 h-72 border border-gray-300 p-2 overflow-y-scroll">
            {messages.map((msg, index) => (
              <div key={index} className="p-2 border-b border-gray-200">
                {msg}
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="p-2 border border-gray-300 rounded flex-1"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded ml-2"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="h-full">
          {/* Render MapContainer when no contact is selected */}
          <MapContainer />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
