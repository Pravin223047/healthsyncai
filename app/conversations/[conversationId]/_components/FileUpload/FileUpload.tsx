"use client";
import React, { useState } from "react";
import { X, Loader2, FileText } from "lucide-react"; // Importing Loader and FileText icon from Lucide
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing"; // Ensure correct path
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "messageFile";
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  endpoint,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [deleting, setDeleting] = useState(false); // Track the deletion state
  const [uploadDisabled, setUploadDisabled] = useState(!!value); // Track if upload is disabled

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

  const fileType = value?.split(".").pop();

  return (
    <div className="w-full flex items-center justify-center">
      {value && fileType?.match(/(jpg|jpeg|png|gif)$/i) ? (
        <div className="relative h-60 w-60">
          {imageLoading ? (
            <Skeleton className="w-full h-full rounded-md" />
          ) : (
            <Image
              fill
              src={value}
              alt="Uploaded File"
              className={`rounded-md object-contain border-2`}
              onLoadingComplete={() => setImageLoading(false)}
            />
          )}
          <button
            onClick={handleDelete}
            className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
            type="button"
            disabled={deleting} // Disable button during deletion
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" /> // Loader animation
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        </div>
      ) : value && fileType === "pdf" ? (
        <div className="relative flex items-center border-2 w-fit p-2">
          <FileText className="h-8 w-8 text-gray-500" />
          <span className="ml-2 text-gray-400">PDF Document</span>
          <button
            onClick={handleDelete}
            className="bg-rose-500 text-white p-1 rounded-full absolute -top-3 -right-3 shadow-sm"
            type="button"
            disabled={deleting} // Disable button during deletion
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" /> // Loader animation
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
              toast.success("File Uploaded");
              setImageLoading(false);
              setUploadDisabled(true); // Disable the upload button after an image is uploaded
            }
          }}
          onUploadError={(error: Error) => {
            console.error("Upload Error:", error);
            toast.error("Upload failed. Please try again.");
          }}
          disabled={uploadDisabled} // Disable the dropzone when an image is uploaded
        />
      )}
    </div>
  );
};

export default FileUpload;
