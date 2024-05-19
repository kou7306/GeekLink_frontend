// components/profile/DesireOccupationSelect.tsx
import React from "react";
import { desiredOccupationOptions } from "./options";

interface DesireOccupationSelectProps {
  desire_occupation?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DesireOccupationSelect: React.FC<DesireOccupationSelectProps> = ({
  desire_occupation,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor="desire_occupation" className="block text-sm font-medium text-gray-700">
        希望職種
      </label>
      <select
        name="desire_occupation"
        value={desire_occupation}
        onChange={onChange}
        className="mt-1 block w-full"
      >
        <option value="">選択してください</option>
        {desiredOccupationOptions.map((desire_occupation) => (
          <option key={desire_occupation} value={desire_occupation}>
            {desire_occupation}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DesireOccupationSelect;
