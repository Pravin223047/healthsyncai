import React from "react";
import { FaCheck, FaWhatsapp } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

interface ActionsProps {
  handleShareClosePopup: any;
  handleWhatsappClick: any;
  copiedDocumentName: string;
  copiedUrl: string;
  handleCopyUrl: any;
  copiedDocumentId: string;
  copySuccess: boolean;
}

const Actions: React.FC<ActionsProps> = ({
  handleShareClosePopup,
  handleWhatsappClick,
  copiedDocumentName,
  copiedUrl,
  handleCopyUrl,
  copiedDocumentId,
  copySuccess,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center border-2 bg-black bg-opacity-50">
      <div className="bg-gray-800 border-2 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Share Document</h2>
          <button
            className="text-rose-500 hover:text-rose-700 bg-rose-400 text-lg rounded-md p-1"
            onClick={handleShareClosePopup}
          >
            <RxCross2 />
          </button>
        </div>
        <p className="mt-4">Share the document via:</p>
        <div className="flex gap-4 mt-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={() => handleWhatsappClick(copiedDocumentName, copiedUrl)}
          >
            <FaWhatsapp />
            WhatsApp
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <RiMessengerLine />
            Messenger
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={() => handleCopyUrl(copiedUrl, copiedDocumentId)}
          >
            {copySuccess ? (
              <span className="flex items-center gap-2">
                <FaCheck />
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FiLink />
                Copy Link
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Actions;
