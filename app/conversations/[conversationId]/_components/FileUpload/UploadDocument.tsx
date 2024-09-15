"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RxCross2 } from "react-icons/rx";
import FileUpload from "./FileUpload";
import toast from "react-hot-toast";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";

interface UploadDocumentProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ setShowPopup }) => {
  const [newDocumentUrl, setNewDocumentUrl] = useState<string>("");
  const [newDocumentType, setNewDocumentType] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { conversationId } = useConversation();

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleImagesUpload = (url: string) => {
    setNewDocumentUrl(url);
    const fileType = url.split(".").pop();
    setNewDocumentType(fileType || "unknown");
    setIsUploading(false);
  };

  const handleImageUpload = async () => {
    if (!newDocumentUrl) {
      toast.error("No file selected.");
      return;
    }

    setIsUploading(true);

    try {
      const payload = {
        message: "",
        image: newDocumentUrl,
        conversationId,
      };

      await axios.post("/api/messages", payload);

      toast.success("File uploaded successfully!");
      setNewDocumentUrl("");
      setNewDocumentType("");
      setShowPopup(false);
    } catch (error) {
      toast.error("Failed to upload file. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = !!newDocumentUrl && !isUploading;

  return (
    <div
      role="dialog"
      aria-labelledby="upload-document-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-gray-900 p-6 border-2 rounded-lg shadow-lg w-full md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h1
            id="upload-document-title"
            className="text-xl text-blue-600 font-semibold"
          >
            Upload Document
          </h1>
          <button
            aria-label="Close"
            className="text-red-500 rounded-md bg-red-300 hover:text-red-700 p-1 flex items-center justify-center"
            onClick={handleClosePopup}
          >
            <RxCross2 className="h-5 w-5 text-lg" />
          </button>
        </div>
        <div className="mt-4">
          <FileUpload
            onChange={handleImagesUpload}
            value={newDocumentUrl}
            endpoint="messageFile"
          />
        </div>

        <div className="flex justify-start mt-5">
          <button
            onClick={handleImageUpload}
            disabled={!isFormValid}
            className={`px-4 py-2 w-fit text-white rounded-md ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
