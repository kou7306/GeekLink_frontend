// components/profile/PortfolioInput.tsx
import React from "react";

interface PortfolioInputProps {
  portfolio?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PortfolioInput: React.FC<PortfolioInputProps> = ({
  portfolio,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor="portfolio"
        className="block text-sm font-medium text-text rounded-md"
      >
        ポートフォリオ
      </label>
      <input
        type="text"
        id="portfolio"
        name="portfolio"
        value={portfolio}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-content_base"
      />
    </div>
  );
};

export default PortfolioInput;
