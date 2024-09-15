import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import EmojiPicker from "emoji-picker-react";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  value: string;
  setValue: (value: string) => void;
  onSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  type = "text",
  required,
  errors,
  id,
  register,
  value,
  setValue,
  onSendMessage,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject: any) => {
    setValue(value + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!errors[id]}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`text-white w-full font-light py-2 px-4 pr-10 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 transition duration-300`}
      />

      <button
        type="button"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
      >
        😊
      </button>

      {showEmojiPicker && (
        <div className="absolute bottom-12 right-0 z-10 bg-gray-900 rounded-lg p-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
