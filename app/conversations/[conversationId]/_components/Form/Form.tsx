"use client";
import React, { useState, useRef } from "react";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import {
  HiDocument,
  HiPaperAirplane,
  HiOutlinePhoto,
  HiOutlineVideoCamera,
  HiOutlineDocumentCheck,
} from "react-icons/hi2";
import MessageInput from "../MessageInput/MessageInput";
import useOnClickOutside from "@/hooks/clickoutsidedropdown";
import UploadDocument from "../FileUpload/UploadDocument";

const FormComponent: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isDocumentPopupOpen, setIsDocumentPopupOpen] =
    useState<boolean>(false);
  const documentDropdownRef = useRef<HTMLDivElement | null>(null);
  const { conversationId } = useConversation();
  const [inputValue, setInputValue] = useState<string>(""); // Input value controlled here

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post("/api/messages", {
        message: inputValue, // Use the controlled input value
        conversationId,
      });
      setValue("message", ""); // Clear react-hook-form state
      setInputValue(""); // Clear the inputValue state after sending
    } catch (error) {
      console.error("Message send error:", error);
    }
  };

  const onSendMessage = () => {
    handleSubmit(onSubmit)();
  };

  const toggleDocumentPopup = () => {
    setIsDocumentPopupOpen((prev) => !prev);
  };

  useOnClickOutside(documentDropdownRef, () => setIsDocumentPopupOpen(false));

  const handleUploadClick = () => {
    setShowPopup(true);
    setIsDocumentPopupOpen(false);
  };

  return (
    <div className="py-4 px-4 bg-slate-800 border-t flex items-center gap-2 lg:gap-4 w-full shadow-lg">
      <div className="relative">
        <HiDocument
          size={32}
          className="text-sky-500 cursor-pointer"
          onClick={toggleDocumentPopup}
          title="Attach Document"
          aria-haspopup="true"
          aria-expanded={isDocumentPopupOpen}
          aria-controls="document-popup"
        />
        {isDocumentPopupOpen && (
          <div
            ref={documentDropdownRef}
            id="document-popup"
            className="absolute bottom-full left-0 mb-2 w-48 bg-slate-900 text-white rounded-lg shadow-lg p-2 z-50"
          >
            <div
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 transition rounded"
              onClick={handleUploadClick}
            >
              <HiOutlinePhoto size={20} className="text-gray-100" />
              <span className="text-sm">Images</span>
            </div>
            <div
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 transition rounded"
              onClick={() => setIsDocumentPopupOpen(false)}
            >
              <HiOutlineVideoCamera size={20} className="text-gray-100" />
              <span className="text-sm">Videos</span>
            </div>
            <div
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 transition rounded"
              onClick={() => setIsDocumentPopupOpen(false)}
            >
              <HiOutlineDocumentCheck size={20} className="text-gray-100" />
              <span className="text-sm">Documents</span>
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          onSendMessage(); // Call the onSendMessage function
        }}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message..."
          value={inputValue} // Pass input value to the MessageInput component
          setValue={setInputValue} // Pass function to update the value
          onSendMessage={onSendMessage} // Pass onSendMessage function
        />
        <button
          type="submit"
          title="Send Message"
          className="flex items-center justify-center rounded-md p-2 bg-sky-500 hover:bg-sky-600 transition text-white"
        >
          <HiPaperAirplane size={20} />
        </button>
      </form>
      {showPopup && <UploadDocument setShowPopup={setShowPopup} />}
    </div>
  );
};

export default FormComponent;
