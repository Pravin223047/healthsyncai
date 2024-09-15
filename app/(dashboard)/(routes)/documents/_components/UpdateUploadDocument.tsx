"use client";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import FileUpdateUpload from "./FileUpdateDocument";

interface UpdateUploadDocumentProps {
  documentId: string;
  setDocuments: (documents: any) => void;
  setShowUpdatePopup: (show: boolean) => void;
}

const UpdateUploadDocument: React.FC<UpdateUploadDocumentProps> = ({
  documentId,
  setDocuments,
  setShowUpdatePopup,
}) => {
  const [documentData, setDocumentData] = useState<any>(null);
  const [newDocumentName, setNewDocumentName] = useState("");
  const [newDocumentDescription, setNewDocumentDescription] = useState("");
  const [newDocumentUrl, setNewDocumentUrl] = useState("");
  const [newDocumentType, setNewDocumentType] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const response = await fetch(`/api/updatedocument/${documentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch document data");
        }
        const data = await response.json();
        setDocumentData(data);
        setNewDocumentName(data.name);
        setNewDocumentDescription(data.description);
        setNewDocumentUrl(data.url);
        setNewDocumentType(data.type);
      } catch (error) {
        console.error("Error fetching document data:", error);
        toast.error("Failed to fetch document data.");
      }
    };

    fetchDocumentData();
  }, [documentId]);

  const handleClosePopup = () => {
    setShowUpdatePopup(false);
  };

  const handleImageUpload = (url: string) => {
    setNewDocumentUrl(url);
    const fileType = url.split(".").pop();
    setNewDocumentType(fileType || "unknown");
    setIsUploading(false);
    setIsFileUploaded(true);
  };

  const handleUpdate = async () => {
    setIsUploading(true);
    try {
      const response = await fetch(`/api/updatedocument/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newDocumentName,
          type: newDocumentType,
          description: newDocumentDescription,
          url: newDocumentUrl,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update document: ${errorText}`);
      }

      const updatedDocument = await response.json();

      setDocuments((prevDocuments: any) =>
        prevDocuments.map((doc: any) =>
          doc.id === documentId ? updatedDocument : doc
        )
      );
      handleClosePopup();
      toast.success("Document updated successfully.");
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update document.");
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid =
    newDocumentName &&
    newDocumentDescription &&
    (isFileUploaded || documentData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 border-2 rounded-lg shadow-lg w-full md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl text-blue-600 font-semibold">
            Update Document
          </h1>
          <button
            className="text-red-500 rounded-md bg-red-300 hover:text-red-700 p-1 flex items-center justify-center"
            onClick={handleClosePopup}
          >
            <RxCross2 className="h-5 w-5 text-lg" />
          </button>
        </div>
        <div className="mt-4">
          <FileUpdateUpload
            onChange={handleImageUpload}
            value={newDocumentUrl}
            endpoint="messageFile"
            documentId={documentId}
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
            onClick={handleUpdate}
            disabled={!isFormValid || isUploading}
            className={`px-4 py-2 w-fit text-white rounded-md ${
              isFormValid && !isUploading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {isUploading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUploadDocument;
