import React from "react";

interface ExperienceModalProps {
  isOpen: boolean;
  experiences: string[];
  selectedExperiences: string[];
  onSelect: (tech: string) => void;
  onClose: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  experiences,
  selectedExperiences,
  onSelect,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleSelect = (experience: string) => {
    onSelect(experience);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white mx-4 p-4 rounded-lg">
        <h2 className="font-semibold text-xl mb-4">経験を複数選択</h2>
        <div className="grid grid-cols-3 gap-4">
          {experiences.map((experience) => (
            <button
              key={experience}
              type="button"
              onClick={() => handleSelect(experience)}
              className={`p-2 rounded-full ${
                selectedExperiences.includes(experience) ? "bg-blue-300 text-white" : "bg-gray-200"
              }`}
            >
              {experience}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default ExperienceModal;