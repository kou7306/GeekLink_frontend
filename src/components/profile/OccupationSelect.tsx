// components/profile/OccupationSelect.tsx
import React from "react";

interface OccupationSelectProps {
  occupation: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  occupations: string[];
}

const OccupationSelect: React.FC<OccupationSelectProps> = ({ occupation, onChange, occupations }) => {
  return (
    <div>
      <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
        職種
      </label>
      <select name="occupation" value={occupation} onChange={onChange} className="mt-1 block w-full">
        <option value="">選択してください</option>
        {occupations.map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OccupationSelect;
