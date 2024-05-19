// components/profile/SnsAccounts.tsx
import React from "react";

interface SnsAccountsProps {
  github: string;
  twitter: string;
  zenn: string;
  qiita: string;
  atcoder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SnsAccounts: React.FC<SnsAccountsProps> = ({
  github,
  twitter,
  zenn,
  qiita,
  atcoder,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor="github" className="block text-sm font-medium text-gray-700 rounded-md">
        GitHub
      </label>
      <input
        type="text"
        id="github"
        name="github"
        value={github}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 rounded-md">
        X(Twitter)
      </label>
      <input
        type="text"
        id="twitter"
        name="twitter"
        value={twitter}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="zenn" className="block text-sm font-medium text-gray-700 rounded-md">
        Zenn
      </label>
      <input
        type="text"
        id="zenn"
        name="zenn"
        value={zenn}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="qiita" className="block text-sm font-medium text-gray-700 rounded-md">
        Qiita
      </label>
      <input
        type="text"
        id="qiita"
        name="qiita"
        value={qiita}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="atcoder" className="block text-sm font-medium text-gray-700 rounded-md">
        AtCoder
      </label>
      <input
        type="text"
        id="atcoder"
        name="atcoder"
        value={atcoder}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default SnsAccounts;
