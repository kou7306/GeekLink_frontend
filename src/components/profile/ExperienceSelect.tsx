// components/profile/ExperienceSelectModal.tsx
import React from "react";
import { experienceOptions } from "./options";

interface ExperienceSelectProps {
  toggleModal: () => void;
  selectedExperiences: string[];
}

const ExperienceSelect: React.FC<ExperienceSelectProps> = ({ toggleModal, selectedExperiences }) => {
  return (
    <div>
      <button
        type="button"
        onClick={toggleModal}
        className="my-4 py-2 px-4 bg-gray-600 hover:bg-gray-800 text-white rounded hover:bg-gray-800"
      >
        経験を複数選択
      </button>
      <div className="flex gap-2 flex-wrap mb-4">
        {selectedExperiences.map((experience) => (
          <span key={experience} className="bg-blue-300 text-white rounded-full px-4 py-1">
            {experience}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSelect;
