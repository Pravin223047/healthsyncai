"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RxCross2 } from "react-icons/rx";
import FileUpload from "./FileUpload";
import toast from "react-hot-toast";

interface UploadDocumentProps {
  setDocuments: any;
  setShowPopup: any;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({
  setDocuments,
  setShowPopup,
}) => {
  const [newDocumentName, setNewDocumentName] = useState("");
  const [newDocumentDescription, setNewDocumentDescription] = useState("");
  const [newDocumentUrl, setNewDocumentUrl] = useState("");
  const [newDocumentType, setNewDocumentType] = useState(""); // State to store document type
  const [isUploading, setIsUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleImageUpload = (url: string) => {
    setNewDocumentUrl(url);
    const fileType = url.split(".").pop(); // Extract file type from URL
    setNewDocumentType(fileType || "unknown"); // Set document type
    setIsUploading(false);
    setIsFileUploaded(true);
  };

  const handleUpload = async () => {
    const today = new Date();
    const formattedDate = `${today.getDate()}-${
      today.getMonth() + 1
    }-${today.getFullYear()}`;

    try {
      const response = await fetch("/api/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: uuidv4(),
          name: newDocumentName,
          type: newDocumentType, // Include document type
          date: formattedDate,
          description: newDocumentDescription,
          url: newDocumentUrl,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload document: ${errorText}`);
      }

      const newDocument = await response.json();

      setDocuments((prevDocuments: any) => [...prevDocuments, newDocument]);
      handleClosePopup();
      setNewDocumentName("");
      setNewDocumentUrl("");
      setNewDocumentDescription("");
      setNewDocumentType(""); // Reset document type
      setIsFileUploaded(false);
      toast.success("Document uploaded successfully.");

      // Reload the page after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document");
    }
  };

  const isFormValid =
    newDocumentName && newDocumentDescription && isFileUploaded;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 border-2 rounded-lg shadow-lg w-full md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl text-blue-600 font-semibold">
            Upload Document
          </h1>
          <button
            className="text-red-500 rounded-md bg-red-300 hover:text-red-700 p-1 flex items-center justify-center"
            onClick={handleClosePopup}
          >
            <RxCross2 className="h-5 w-5 text-lg" />
          </button>
        </div>
        <div className="mt-4">
          <FileUpload
            onChange={handleImageUpload}
            value={newDocumentUrl}
            endpoint="messageFile"
          />
        </div>
        <div>
          <label className="block text-gray-300">Document Name</label>
          <input
            type="text"
            value={newDocumentName}
            onChange={(e) => setNewDocumentName(e.target.value)}
            className="w-full p-2 mt-1 border bg-gray-800 border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-300">Description</label>
          <textarea
            value={newDocumentDescription}
            onChange={(e) => setNewDocumentDescription(e.target.value)}
            className="w-full p-2 mt-1 border bg-gray-800 border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-start mt-5">
          <button
            onClick={handleUpload}
            disabled={!isFormValid && isUploading}
            className={`px-4 py-2 w-fit text-white rounded-md ${
              isFormValid && !isUploading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {isUploading && isFormValid ? "Please Enter the details" : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
