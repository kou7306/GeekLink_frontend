// components/profile/SexSelect.tsx
import React from "react";

interface SexSelectProps {
  sex: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SexSelect: React.FC<SexSelectProps> = ({ sex, onChange }) => {
  return (
    <div>
      <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
        性別
      </label>
      <select name="sex" value={sex} onChange={onChange} className="mt-1 block w-full">
        <option value="">選択してください</option>
        <option value="男性">男性</option>
        <option value="女性">女性</option>
      </select>
    </div>
  );
};

export default SexSelect;
