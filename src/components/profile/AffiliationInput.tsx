// components/profile/AffiliationInput.tsx
import React from "react";

interface AffiliationInputProps {
  affiliation?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AffiliationInput: React.FC<AffiliationInputProps> = ({ affiliation, onChange }) => {
  return (
    <div>
      <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700 rounded-md">
        所属
      </label>
      <input
        type="text"
        id="affiliation"
        name="affiliation"
        value={affiliation}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default AffiliationInput;
