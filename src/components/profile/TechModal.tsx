import React from "react";

interface ModalProps {
  isOpen: boolean;
  technologies: string[];
  selectedTech: string[];
  onSelect: (tech: string) => void;
  onClose: () => void;
  onNext: () => void;
}

export const TechModal: React.FC<ModalProps> = ({
  isOpen,
  technologies,
  selectedTech,
  onSelect,
  onClose,
  onNext,
}) => {
  if (!isOpen) return null;

  const handleSelect = (tech: string) => {
    onSelect(tech);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mt-16">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="font-semibold text-xl mb-3">技術を選択</h2>
        <div className="grid grid-cols-6 gap-3">
          {technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => handleSelect(tech)}
              className={`p-1 rounded-full ${
                selectedTech.includes(tech) ? "bg-blue-300 text-white" : "bg-gray-200"
              }`}
            >
              {tech}
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
        <button
          type="button"
          onClick={onNext}
          className="mt-4 ml-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700"
        >
          次へ
        </button>
      </div>
    </div>
  );
};
