import React from "react";

interface TopTechModalProps {
  isOpen: boolean;
  selectedTech: string[];
  top_teches: string[];
  onClose: () => void;
  onTopSelect: (tech: string) => void;
}

export const TopTechModal: React.FC<TopTechModalProps> = ({
  isOpen,
  selectedTech,
  top_teches,
  onClose,
  onTopSelect,
}) => {
  if (!isOpen) return null;

  // 順位を付けて表示するためのマッピング
  const getTechWithRank = () => {
    return top_teches.map((tech, index) => `${index + 1}. ${tech}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="font-semibold text-xl mb-4">Top 3 技術を選択</h2>
        <div className="grid grid-cols-3 gap-4">
          {selectedTech.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => onTopSelect(tech)}
              className={`p-2 rounded-full ${
                top_teches.includes(tech) ? "bg-green-500 text-white" : "bg-gray-200"
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
      </div>
      {top_teches.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg">
          <h3 className="text-lg font-semibold">選択された Top 3</h3>
          <ul>
            {getTechWithRank().map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
