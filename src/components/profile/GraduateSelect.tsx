// components/profile/GraduateSelect.tsx
import React from "react";
import { graduateOptions } from "./options";

interface GraduateSelectProps {
  graduate?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GraduateSelect: React.FC<GraduateSelectProps> = ({ graduate, onChange }) => {
  return (
    <div>
      <label htmlFor="graduate" className="block text-sm font-medium text-gray-700">
        卒業見込み
      </label>
      <select name="graduate" value={graduate} onChange={onChange} className="mt-1 block w-full">
        <option value="">選択してください</option>
        {graduateOptions.map((graduate) => (
          <option key={graduate} value={graduate}>
            {graduate}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GraduateSelect;
