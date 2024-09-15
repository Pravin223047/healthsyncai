"use client";

import useActiveList from "@/app/hooks/useActiveList";
import LoadingModal from "@/components/LoadingModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

interface UserBoxProps {
  data: Profile;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  const { members } = useActiveList();
  const isActive = members.indexOf(data.email) !== -1;

  return (
    <>
      {isLoading && <LoadingModal />}

      <div
        onClick={handleClick}
        className="w-full mb-2 relative flex items-center space-x-2 bg-slate-800 p-3 hover:bg-neutral-800 rounded-md transition cursor-pointer"
      >
        <div className="relative">
          {isActive && (
            <span className="absolute z-50 block rounded-full bg-green-500 ring-2 ring-green-500 top-0 right-1 h-2 w-2" />
          )}
          <Avatar className="relative">
            <AvatarImage src={data.imageUrl} />
            <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-50">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
