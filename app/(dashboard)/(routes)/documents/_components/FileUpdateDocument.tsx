"use client";
import React, { useState, useEffect } from "react";
import { X, Loader2, FileText, ImageIcon } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

interface FileUpdateUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "messageFile";
  documentId: string;
}

const FileUpdateUpload: React.FC<FileUpdateUploadProps> = ({
  onChange,
  value,
  endpoint,
  documentId,
}) => {
  const [document, setDocument] = useState<any>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/updatedocument/${documentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        setDocument(data);
        setUploadDisabled(!!data.url); // Disable upload if a file is already uploaded
      } catch (error) {
        console.error("Error fetching document:", error);
        toast.error("Failed to load document details.");
      }
    };

    fetchDocument();
  }, [documentId]);

  const handleDelete = async () => {
    setDeleting(true); // Start the loader animation
    try {
      const encodedValue = encodeURIComponent(value);
      // Delete the uploaded file from uploadthing service
      const response = await fetch(
        `/api/uploadthing_document?url=${encodedValue}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      onChange(""); // Call onChange with an empty string to delete the uploaded file
      setUploadDisabled(false); // Re-enable the upload button
      toast.success("File removed successfully.");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file. Please try again.");
    } finally {
      setDeleting(false); // Stop the loader animation
    }
  };

  // Determine if the file is an image
  const fileType = value?.split(".").pop();

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative w-full flex flex-col items-center justify-center rounded-md overflow-hidden">
          {value && fileType?.match(/(jpg|jpeg|png|gif)$/i) ? (
            <div className="relative flex items-center w-20 h-20 p-2">
              <Image
                src={document.url}
                alt={document.name || "Uploaded image"}
                layout="fill"
                objectFit="cover"
                className="rounded-full object-contain border-2 border-slate-500"
                onLoad={() => setImageLoading(false)}
              />
              <button
                onClick={handleDelete}
                className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                type="button"
                disabled={deleting}
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </button>
            </div>
          ) : value && fileType === "pdf" ? (
            <div className="relative flex items-center border-2 mt-4 w-fit p-2">
              <FileText className="h-8 w-8 text-gray-500" />
              <span className="ml-2 text-gray-400">PDF Document</span>
              <button
                onClick={handleDelete}
                className="bg-rose-500 text-white p-1 rounded-full absolute -top-3 -right-3 shadow-sm"
                type="button"
                disabled={deleting}
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </button>
            </div>
          ) : (
            <UploadDropzone
              className="mb-3 border-dashed cursor-pointer border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center hover:bg-gray-800 transition"
              endpoint={endpoint}
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) {
                  onChange(res[0].url);
                  toast.success("File Updated");
                  setImageLoading(false);
                  setUploadDisabled(true);
                }
              }}
              onUploadError={(error: Error) => {
                console.error("Upload Error:", error);
                toast.error("Upload failed. Please try again.");
              }}
              disabled={uploadDisabled}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpdateUpload;
