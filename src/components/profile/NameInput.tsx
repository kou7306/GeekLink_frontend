// components/profile/NameInput.tsx
import React from "react";

interface NameInputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameInput: React.FC<NameInputProps> = ({ name, onChange }) => {
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 rounded-md">
        名前
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default NameInput;
