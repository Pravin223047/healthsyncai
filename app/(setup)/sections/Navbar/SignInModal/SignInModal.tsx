"use client";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn, useUser } from "@clerk/nextjs";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose, isOpen }) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleRedirect = async () => {
    if (isSignedIn && selectedRole) {
      if (selectedRole === "patient") {
        router.push("/dashboard");
      } else if (selectedRole === "doctor") {
        router.push("/doctor/dashboard");
      } else if (selectedRole === "admin") {
        router.push("/admin");
      }
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    router.push("/sign-in");

    setTimeout(() => {
      handleRedirect();
    }, 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={`bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg ${
          loading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <h3 className="text-lg font-semibold text-gray-200 mb-4">
          Sign In Options
        </h3>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="patientCheckbox"
              checked={selectedRole === "patient"}
              onChange={() => setSelectedRole("patient")}
              className="form-checkbox text-blue-500 checked:bg-blue-500 checked:border-transparent mr-2"
            />
            <Label htmlFor="patientCheckbox" className="text-blue-500">
              Patient
            </Label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="doctorCheckbox"
              checked={selectedRole === "doctor"}
              onChange={() => setSelectedRole("doctor")}
              className="form-checkbox text-green-500 checked:bg-green-500 checked:border-transparent mr-2"
            />
            <Label htmlFor="doctorCheckbox" className="text-green-500">
              Doctor
            </Label>
          </div>
          <div className="flex items-center mb-4 justify-end">
            <input
              type="checkbox"
              id="adminCheckbox"
              checked={selectedRole === "admin"}
              onChange={() => setSelectedRole("admin")}
              className="form-checkbox text-red-500 checked:bg-red-500 checked:border-transparent mr-2"
            />
            <Label htmlFor="adminCheckbox" className="text-red-500">
              Admin
            </Label>
          </div>
        </div>

        {/* Buttons for Cancel and Submit */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={!selectedRole || loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;
