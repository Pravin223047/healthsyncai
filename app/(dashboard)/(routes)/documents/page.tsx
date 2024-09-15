"use client";

import React, { useState, useEffect, useRef } from "react";
import { MdOutlineCloudUpload, MdOutlineDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { FaShareAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineFilePdf, AiOutlineFileImage } from "react-icons/ai";
import { Skeleton } from "@/components/ui/skeleton";
import UploadDocument from "./_components/UploadDocument";
import useOnClickOutside from "@/hooks/clickoutsidedropdown";
import Actions from "./_components/Actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import UpdateUploadDocument from "./_components/UpdateUploadDocument";

interface Document {
  id: string;
  profileId: string;
  name: string;
  type: string;
  date: string;
  description: string;
  url: string;
}

const MyDocuments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState("");
  const [copiedDocumentName, setCopiedDocumentName] = useState("");
  const [copiedDocumentId, setCopiedDocumentId] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isdocumentOpen, setIsdocumentOpen] = useState<boolean>(false);

  const imagesDropdownRef = useRef<HTMLDivElement | null>(null);
  const documentsDropdownRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(imagesDropdownRef, () => setIsOpen(false));
  useOnClickOutside(documentsDropdownRef, () => setIsdocumentOpen(false));

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("/api/document");
        if (response.ok) {
          const data = await response.json();
          setDocuments(data.documents);
          setFilteredDocuments(data.documents);
        } else {
          console.error("Failed to fetch documents");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [filter, fileTypes, documents]);

  const filterDocuments = () => {
    if (filter === "all") {
      setFilteredDocuments(documents);
    } else {
      const filtered = documents.filter((doc) => {
        const isImage =
          typeof doc.type === "string" && doc.type.startsWith("image");
        const isFileTypeMatch = fileTypes.length
          ? fileTypes.includes(doc.type)
          : !isImage;

        if (filter === "images") {
          return isFileTypeMatch;
        }
        if (filter === "documents") {
          return !isImage && isFileTypeMatch;
        }
        return true;
      });

      setFilteredDocuments(filtered);
    }
  };

  const handleDelete = async (
    id?: string,
    profileId?: string,
    url?: string
  ) => {
    try {
      const deleteResponse = await fetch("/api/document", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, profileId }),
      });

      if (!deleteResponse.ok) {
        const errorText = await deleteResponse.text();
        throw new Error(`Failed to delete document: ${errorText}`);
      }

      if (url) {
        try {
          const encodedUrl = encodeURIComponent(url);
          const fileDeleteResponse = await fetch(
            `/api/uploadthing_document?url=${encodedUrl}`,
            {
              method: "DELETE",
            }
          );

          if (!fileDeleteResponse.ok) {
            const fileErrorText = await fileDeleteResponse.text();
            throw new Error(`Failed to delete file: ${fileErrorText}`);
          }
        } catch (fileError) {
          console.error("Error deleting file:", fileError);
          toast.error("Failed to delete file.");
        }
      }

      // Remove document from local state
      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== id)
      );
      toast.success("Document deleted successfully.");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document.");
    }
  };

  const handleSharePopup = (url: string, id: string, name: string) => {
    setShowSharePopup(true);
    setCopiedUrl(url);
    setCopiedDocumentName(name);
    setCopiedDocumentId(id);
    setCopySuccess(false); // Reset copy success state
  };

  const handleShareClosePopup = () => {
    setShowSharePopup(false);
    setCopiedUrl("");
    setCopiedDocumentName("");
    setCopiedDocumentId("");
    setCopySuccess(false);
  };

  const handleUploadClick = () => {
    setShowPopup(true);
  };

  const handleUpdateUploadClick = (id: string) => {
    setShowUpdatePopup(true);
    setDocumentId(id);
  };

  const handleCopyUrl = (url: string, documentId: string) => {
    setCopiedUrl(url);
    setCopiedDocumentId(documentId);
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopySuccess(true);
        toast.success("Link Copied");
        setTimeout(() => {
          setCopySuccess(false);
        }, 3000); // Clear copy success after 3 seconds
      })
      .catch((error) => {
        console.error("Error copying URL:", error);
        setCopySuccess(false);
      });
  };

  const handleWhatsappClick = (name: string, url: string) => {
    const text = `Check out this document: ${name} - ${url}`;
    const whatsappText = encodeURIComponent(text);

    window.open(`https://api.whatsapp.com/send?text=${whatsappText}`, "_blank");
  };

  // Function to get the appropriate icon based on the document type
  const getFileTypeIcon = (type: string) => {
    if (type === "pdf")
      return <AiOutlineFilePdf className="text-red-500 text-xl" />;
    if (type === "png")
      return <AiOutlineFileImage className="text-blue-500 text-xl" />;
    return <IoDocumentTextOutline className="text-gray-400 text-xl" />;
  };

  return (
    <div className="p-6 bg-gray-800 w-full rounded-lg shadow-md">
      <div className="flex w-full justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${
              filter === "all" ? "bg-blue-700" : "bg-blue-600"
            } hover:bg-blue-700`}
          >
            All
          </button>
          <div className="relative" ref={imagesDropdownRef}>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={`px-4 py-2 rounded-md ${
                filter === "images" ? "bg-blue-700" : "bg-blue-600"
              } hover:bg-blue-700`}
            >
              Images
            </button>
            {isOpen && (
              <div className="absolute w-full left-0 mt-2 border-2 bg-slate-800 shadow-lg rounded-md">
                <button
                  onClick={() => {
                    setFileTypes(["png"]);
                    setFilter("images");
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 block text-left w-full ${
                    fileTypes.includes("png") ? "bg-slate-900" : ""
                  }`}
                >
                  PNG
                </button>
                <button
                  onClick={() => {
                    setFileTypes(["jpeg"]);
                    setFilter("images");
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 block text-left w-full ${
                    fileTypes.includes("jpeg") ? "bg-slate-900" : ""
                  }`}
                >
                  JPEG
                </button>
                <button
                  onClick={() => {
                    setFileTypes([]);
                    setFilter("images");
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 block text-left w-full ${
                    fileTypes.length === 0 ? "bg-slate-900" : ""
                  }`}
                >
                  All
                </button>
              </div>
            )}
          </div>

          <div className="relative" ref={documentsDropdownRef}>
            <button
              onClick={() => setIsdocumentOpen((prev) => !prev)}
              className={`px-4 py-2 rounded-md ${
                filter === "documents" ? "bg-blue-700" : "bg-blue-600"
              } hover:bg-blue-700`}
            >
              Documents
            </button>
            {isdocumentOpen && (
              <div className="absolute w-full left-0 mt-2 border-2 bg-slate-800 shadow-lg rounded-md">
                <button
                  onClick={() => {
                    setFileTypes(["pdf"]);
                    setFilter("documents");
                    setIsdocumentOpen(false);
                  }}
                  className={`px-4 py-2 block text-left w-full ${
                    fileTypes.includes("pdf") ? "bg-slate-900" : ""
                  }`}
                >
                  PDF
                </button>
                <button
                  onClick={() => {
                    setFileTypes(["txt"]);
                    setFilter("documents");
                    setIsdocumentOpen(false);
                  }}
                  className={`px-4 py-2 block text-left w-full ${
                    fileTypes.includes("txt") ? "bg-slate-900" : ""
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => {
                    setFileTypes([]);
                    setFilter("documents");
                    setIsdocumentOpen(false);
                  }}
                  className={`px-4 py-2 block text-left w-full ${
                    fileTypes.length === 0 ? "bg-slate-900" : ""
                  }`}
                >
                  All
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleUploadClick}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <MdOutlineCloudUpload className="mr-2" />
          Upload
        </button>
      </div>

      <div className="flex flex-col w-full items-center justify-center gap-4 bg-transparent rounded-lg">
        <div className="flex bg-blue-900 border-2 py-2 rounded-md text-white items-center w-full justify-between gap-4">
          <h1 className="font-semibold text-white text-center w-full">ID</h1>
          <h1 className="font-semibold text-white text-center w-full">
            My Documents
          </h1>
          <h1 className="font-semibold text-white text-center w-full">Type</h1>
          <h1 className="font-semibold text-white text-center w-full">Date</h1>
          <h1 className="font-semibold text-white text-center w-full">
            Description
          </h1>
          <h1 className="font-semibold text-white text-center w-full">
            Actions
          </h1>
        </div>

        {loading ? (
          <div className="space-y-4 w-full">
            <Skeleton className="h-12 border-2 w-full z-50" />
            <Skeleton className="h-12 border-2 w-full z-50" />
            <Skeleton className="h-12 border-2 w-full z-50" />
            <Skeleton className="h-12 border-2 w-full z-50" />
            <Skeleton className="h-12 border-2 w-full z-50" />
          </div>
        ) : (
          <div className="space-y-4 w-full h-[100vh] 2xl:h-[calc(100vh-248px)] overflow-auto hidden-scrollbar">
            {filteredDocuments.length === 0 ? (
              <p className="text-center text-gray-400">No documents found.</p>
            ) : (
              filteredDocuments.map((doc, index) => (
                <div
                  key={doc.id}
                  className="flex flex-col items-center w-full justify-between gap-4"
                >
                  <div className="flex w-full items-center gap-5 rounded-md py-2 bg-slate-600 border-2 justify-between text-center">
                    <span className="text-gray-100 text-center w-full">
                      {index + 1}
                    </span>
                    <span className="flex items-center justify-center gap-2 text-center w-full text-white">
                      {getFileTypeIcon(doc.type)} {doc.name}
                    </span>
                    <span className="text-gray-100 text-center w-full">
                      {doc.type}
                    </span>
                    <span className="text-gray-100 text-center w-full">
                      {doc.date}
                    </span>
                    <p className="text-gray-100 text-center w-full overflow-auto whitespace-nowrap seen-scrollbar">
                      {doc.description}
                    </p>

                    <div className="flex gap-2 text-center justify-center w-full">
                      <button
                        className="p-2 text-lg text-yellow-500 hover:text-yellow-600"
                        onClick={() => handleUpdateUploadClick(doc.id)}
                      >
                        <GoPencil />
                      </button>
                      <button
                        onClick={() =>
                          handleSharePopup(doc.url, doc.id, doc.name)
                        }
                        className="p-2 text-lg text-green-500 hover:text-green-600"
                      >
                        <FaShareAlt />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="p-2 text-lg text-red-500 hover:text-red-600">
                            <MdOutlineDelete />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-gray-900 border-2">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your file and remove your data
                              from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex items-center justify-center gap-3">
                            <AlertDialogCancel className="h-[45px] px-6">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDelete(doc.id, doc.profileId, doc.url)
                              }
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {showPopup && (
          <UploadDocument
            setDocuments={setDocuments}
            setShowPopup={setShowPopup}
          />
        )}

        {showUpdatePopup && (
          <UpdateUploadDocument
            documentId={documentId}
            setDocuments={setDocuments}
            setShowUpdatePopup={setShowUpdatePopup}
          />
        )}

        {showSharePopup && (
          <Actions
            handleShareClosePopup={handleShareClosePopup}
            handleWhatsappClick={handleWhatsappClick}
            copiedDocumentName={copiedDocumentName}
            copiedUrl={copiedUrl}
            handleCopyUrl={handleCopyUrl}
            copiedDocumentId={copiedDocumentId}
            copySuccess={copySuccess}
          />
        )}
      </div>
    </div>
  );
};

export default MyDocuments;
