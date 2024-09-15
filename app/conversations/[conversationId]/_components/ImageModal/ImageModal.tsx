"use client";
import React, { useState } from "react";
import { FiDownload, FiCopy, FiSave, FiCheck } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Modal from "@/components/Modal/Modal";
import Image from "next/image";
import SaveAsDialog from "../SaveAsDialog/SaveAsDialog";
import { Button } from "@/components/ui/button";

interface ImageModalProps {
  src: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ onClose, isOpen, src }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSaveAsOpen, setIsSaveAsOpen] = useState(false);

  if (!src) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(src);
    setIsCopied(true);
    toast.success("Image URL copied to clipboard!");

    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "image.jpg";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Failed to download the image.");
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-full h-80 mx-auto mb-4 relative">
          <Image
            alt="Displayed image"
            className="object-contain rounded-lg"
            fill
            src={src}
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-between w-full mt-4 gap-4">
          <Button
            onClick={handleDownload}
            className="flex items-center w-full justify-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
            aria-label="Download Image"
          >
            <FiDownload className="mr-2" /> Download
          </Button>
          <Button
            onClick={() => setIsSaveAsOpen(true)}
            className="flex items-center w-full justify-center px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition duration-300"
            aria-label="Save As"
          >
            <FiSave className="mr-2" /> Save As
          </Button>
          <Button
            onClick={handleCopy}
            className={`flex items-center justify-center w-full px-4 py-2 ${
              isCopied ? "bg-green-500" : "bg-gray-500"
            } text-white rounded-md shadow hover:bg-gray-600 transition duration-300`}
            aria-label={isCopied ? "Copied" : "Copy Image URL"}
          >
            {isCopied ? (
              <FiCheck className="mr-2" />
            ) : (
              <FiCopy className="mr-2" />
            )}
            {isCopied ? "Copied" : "Copy URL"}
          </Button>
        </div>
      </Modal>

      {/* Save As Dialog */}
      {isSaveAsOpen && (
        <SaveAsDialog
          src={src}
          isOpen={isSaveAsOpen}
          onClose={() => setIsSaveAsOpen(false)}
        />
      )}
    </>
  );
};

export default ImageModal;
