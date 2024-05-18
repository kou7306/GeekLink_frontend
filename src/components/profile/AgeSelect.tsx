// components/profile/AgeSelect.tsx
import React from "react";

interface AgeSelectProps {
  age: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ages: string[];
}

const AgeSelect: React.FC<AgeSelectProps> = ({ age, onChange, ages }) => {
  return (
    <div>
      <label htmlFor="age" className="block text-sm font-medium text-gray-700">
        年齢
      </label>
      <select name="age" value={age} onChange={onChange} className="mt-1 block w-full">
        <option value="">選択してください</option>
        {ages.map((age) => (
          <option key={age} value={age}>
            {age}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AgeSelect;
