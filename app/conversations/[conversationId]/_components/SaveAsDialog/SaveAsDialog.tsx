import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Assuming this is part of ShadCN components
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import React, { useState } from "react";

interface SaveAsDialogProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

const SaveAsDialog: React.FC<SaveAsDialogProps> = ({
  src,
  isOpen,
  onClose,
}) => {
  const [fileName, setFileName] = useState("image.jpg");

  const handleSaveAs = async () => {
    try {
      if (!fileName.trim()) {
        toast.error("File name is required.");
        return;
      }

      // Simple validation to ensure file name does not contain invalid characters
      const sanitizedFileName =
        fileName.replace(/[<>:"/\\|?*]/g, "_") || "image.jpg";

      // Fetch the image as a blob
      const response = await fetch(src);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();

      // Create a link element to download the blob as an image
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = sanitizedFileName; // Use the sanitized file name entered by the user
      document.body.appendChild(link);

      // Simulate a click to trigger the "Save As" action
      link.click();

      // Clean up by revoking the object URL and removing the link element
      URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast.success(`Image saved as "${sanitizedFileName}" successfully!`);
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("Failed to save the image.");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Image As</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveAs}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveAsDialog;
