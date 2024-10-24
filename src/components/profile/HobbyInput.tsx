// components/profile/HobbyInput.tsx
import React from "react";

interface HobbyInputProps {
  hobby?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HobbyInput: React.FC<HobbyInputProps> = ({ hobby, onChange }) => {
  return (
    <div>
      <label
        htmlFor="hobby"
        className="block text-sm font-medium text-text rounded-md"
      >
        趣味
      </label>
      <input
        type="text"
        id="hobby"
        name="hobby"
        value={hobby}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-content_base"
      />
    </div>
  );
};

export default HobbyInput;
