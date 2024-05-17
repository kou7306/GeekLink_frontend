// components/profile/MessageInput.tsx
import React from "react";

interface MessageInputProps {
  message?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ message, onChange }) => {
  return (
    <div>
      <label htmlFor="message" className="block text-sm font-medium text-gray-700 rounded-md">
        一言メッセージ
      </label>
      <input
        type="text"
        id="message"
        name="message"
        value={message}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
