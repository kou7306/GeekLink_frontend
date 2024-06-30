// components/profile/QualificationInput.tsx
import React, { useState } from "react";

interface QualificationInputProps {
  onAddQualification: (qualification: string) => void;
}

const QualificationInput: React.FC<QualificationInputProps> = ({ onAddQualification }) => {
  const [qualification, setQualification] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQualification(e.target.value);
  };

  const handleAddClick = () => {
    if (qualification.trim() !== "") {
      onAddQualification(qualification);
      setQualification(""); // 入力フィールドをクリア
    }
  };

  return (
    <div>
      <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 rounded-md">
        資格
      </label>
      <input
        type="text"
        id="qualification"
        name="qualification"
        value={qualification}
        onChange={handleChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
      <button type="button" onClick={handleAddClick} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
        追加
      </button>
    </div>
  );
};

export default QualificationInput;
