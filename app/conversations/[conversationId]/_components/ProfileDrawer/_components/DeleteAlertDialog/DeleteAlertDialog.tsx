"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AlertDialogProps {
  isOpen: boolean;
  onCancel: () => void;
}

const AlertDialogComponent: React.FC<AlertDialogProps> = ({
  isOpen,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { conversationId } = useConversation();

  const handleConfirmDelete = useCallback(async () => {
    if (!conversationId) {
      toast.error("Conversation ID is missing");
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete(`/api/conversations/${conversationId}`);
      toast.success("Conversation deleted successfully");
      onCancel();
      router.push("/conversations");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      toast.error("Failed to delete the conversation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, router, onCancel]);

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md">
            Are you sure you want to delete this conversation?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex flex-col lg:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Cancel deletion"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isLoading}
            aria-label="Confirm deletion"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialogComponent;
