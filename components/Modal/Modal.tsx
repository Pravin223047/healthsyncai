import React from "react";
import { XIcon } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-neutral-900 p-6 rounded-lg w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-5 z-50 right-4 bg-red-200 hover:bg-red-300 p-1 rounded-md text-rose-500"
          aria-label="Close"
        >
          <XIcon className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
