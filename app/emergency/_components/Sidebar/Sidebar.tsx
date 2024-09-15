// components/Sidebar.tsx
"use client";
import { Contact } from "@/lib/types";
import React, { useState } from "react";

const Sidebar: React.FC<{
  onSelectContact: (contact: Contact | null) => void;
}> = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({ name: "", number: "" });

  const handleAddContact = () => {
    setContacts([...contacts, { id: Date.now(), ...newContact }]);
    setNewContact({ name: "", number: "" });
  };

  return (
    <div className="hidden md:block w-[400px] bg-gray-800 p-4 border-r border-gray-200 h-full">
      <h2 className="text-lg font-bold">Emergency Contacts</h2>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newContact.number}
          onChange={(e) =>
            setNewContact({ ...newContact, number: e.target.value })
          }
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        <button
          onClick={handleAddContact}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Add Contact
        </button>
      </div>
      <ul className="mt-4">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="cursor-pointer p-2 hover:bg-gray-200"
            onClick={() => onSelectContact(contact)}
          >
            {contact.name} - {contact.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
