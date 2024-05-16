// components/profile/FacultySelect.tsx
import React from "react";
import { facultyOptions } from "./options";

interface FacultySelectProps {
  faculty?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FacultySelect: React.FC<FacultySelectProps> = ({ faculty, onChange }) => {
  return (
    <div>
      <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">
        学部
      </label>
      <select name="faculty" value={faculty} onChange={onChange} className="mt-1 block w-full">
        <option value="">選択してください</option>
        {facultyOptions.map((faculty) => (
          <option key={faculty} value={faculty}>
            {faculty}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FacultySelect;
