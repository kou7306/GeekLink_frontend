// components/profile/DesireOccupationSelect.tsx
import React from "react";
import { desiredOccupationOptions } from "./options";

interface DesireOccupationSelectProps {
  desireOccupation?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DesireOccupationSelect: React.FC<DesireOccupationSelectProps> = ({ desireOccupation, onChange }) => {
  return (
    <div>
      <label htmlFor="desireOccupation" className="block text-sm font-medium text-gray-700">
        希望職種
      </label>
      <select name="desireOccupation" value={desireOccupation} onChange={onChange} className="mt-1 block w-full">
        <option value="">選択してください</option>
        {desiredOccupationOptions.map((desireOccupation) => (
          <option key={desireOccupation} value={desireOccupation}>
            {desireOccupation}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DesireOccupationSelect;
