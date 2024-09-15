import { Profile } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Modal from "../../../../components/Modal/Modal";
import Select from "@/components/Select";

interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: Profile[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await axios.post("/api/conversations", {
        ...data,
        isGroup: true,
      });
      router.refresh();
      onClose();
      toast.success("Group chat created successfully!");
    } catch (error) {
      console.error("Error creating group chat:", error);
      toast.error("Failed to create group chat. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-lg font-semibold text-blue-600">
          Create a group chat
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-200">
          Create a chat with more than 2 people
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="border-b mt-5 border-gray-900/10">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200"
            >
              Group Name
            </label>
            <input
              id="name"
              autoComplete="off"
              disabled={isLoading}
              {...register("name", { required: "Group name is required" })}
              className={`mt-4 block w-full p-2 rounded-md bg-black text-gray-100 shadow-sm outline-none border-2 ${
                errors.name ? "border-red-500" : "focus:border-blue-500"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors?.name?.message as string}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="members"
              className="block text-sm font-medium text-gray-200"
            >
              Select Members
            </label>
            <div className="mt-1">
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default GroupChatModal;
