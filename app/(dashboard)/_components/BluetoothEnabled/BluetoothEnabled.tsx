// components/BluetoothEnable.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

interface BluetoothEnableProps {
  isOpen: boolean;
  onClose: () => void;
}

const BluetoothEnable: React.FC<BluetoothEnableProps> = ({
  isOpen,
  onClose,
}) => {
  const [isEnabling, setIsEnabling] = useState(false);

  const handleCheckBluetooth = async () => {
    try {
      // Check if Bluetooth is available in the browser
      if (!navigator.bluetooth) {
        toast({
          title: "Unsupported",
          description: "Your browser does not support Bluetooth.",
        });
        return;
      }

      // Try to request a device to see if Bluetooth is enabled
      await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });

      toast({
        title: "Bluetooth Enabled",
        description: "Bluetooth is on. Please connect your smartwatch.",
      });
      onClose();
    } catch (error) {
      // If the user cancels the request or Bluetooth is off, show the dialog
      toast({
        title: "Bluetooth Disabled",
        description: "Please enable your PC or laptop's Bluetooth.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enable Bluetooth</DialogTitle>
          <DialogDescription>
            Bluetooth is required to connect your smartwatch. Please enable it
            in your PC or laptop settings.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleCheckBluetooth}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            disabled={isEnabling}
          >
            {isEnabling ? "Checking..." : "Check Bluetooth"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BluetoothEnable;
