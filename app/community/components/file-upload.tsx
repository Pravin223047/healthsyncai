"use client";
import React, { useState } from "react";
import { X, Loader2, FileText } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  endpoint,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(!!value);

  // Handle file deletion
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const encodedValue = encodeURIComponent(value);
      const response = await fetch(
        `/api/uploadthing_document?url=${encodedValue}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      onChange("");
      setUploadDisabled(false);
      toast.success("File removed successfully.");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const fileType = value?.split(".").pop();

  return (
    <div className="w-full flex items-center justify-center">
      {value && fileType?.match(/(jpg|jpeg|png|gif)$/i) ? (
        // Display uploaded image
        <div className="relative h-20 w-20">
          <Image
            fill
            src={value}
            alt="Uploaded File"
            className="rounded-full object-cover border-2 border-slate-500 shadow-lg"
            onLoadingComplete={() => setImageLoading(false)}
          />

          <button
            onClick={handleDelete}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all"
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
        // Upload dropzone component
        <div className="w-full flex flex-col items-center space-y-2">
          <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) {
                onChange(res[0].url);
                toast.success("File uploaded successfully.");
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
          <p className="text-sm text-gray-500">
            Supported formats: JPG, PNG, GIF
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
