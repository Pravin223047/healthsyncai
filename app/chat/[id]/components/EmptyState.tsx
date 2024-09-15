import Image from "next/image";
import React from "react";

const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-gray-900">
      <div className="text-center items-center flex flex-col">
        <div className="h-full p-20 flex flex-col items-center justify-center">
          <h3 className="mt-2 text-2xl font-semibold text-gray-400 text-center">
            Select a chat or start a new conversation
          </h3>
          <div className="relative h-72 w-72">
            <Image alt="Empty" fill src="/empty.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
