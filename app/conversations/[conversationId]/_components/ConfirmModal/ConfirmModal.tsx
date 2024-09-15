"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  emoji: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  emoji,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error confirming action:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <Dialog.Panel className="bg-slate-900 p-4 rounded-lg shadow-lg max-w-sm mx-auto">
          <Dialog.Title id="confirm-modal-title" className="text-lg font-bold">
            Confirm Removal
          </Dialog.Title>
          <Dialog.Description
            id="confirm-modal-description"
            className="mt-2 text-sm"
          >
            Are you sure you want to remove the {emoji} reaction?
          </Dialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={onClose} variant="outline" disabled={isConfirming}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              disabled={isConfirming}
            >
              {isConfirming ? "Removing..." : "Remove"}
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
