// components/profile/SnsAccounts.tsx
import React from "react";

interface SnsAccountsProps {
  githubID: string;
  twitterID: string;
  zennID: string;
  qiitaID: string;
  atcoderID: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SnsAccounts: React.FC<SnsAccountsProps> = ({ githubID, twitterID, zennID, qiitaID, atcoderID, onChange }) => {
  return (
    <div>
      <label htmlFor="githubID" className="block text-sm font-medium text-gray-700 rounded-md">
        GitHub
      </label>
      <input
        type="text"
        id="githubID"
        name="githubID"
        value={githubID}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="twitterID" className="block text-sm font-medium text-gray-700 rounded-md">
        X(Twitter)
      </label>
      <input
        type="text"
        id="twitterID"
        name="twitterID"
        value={twitterID}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="zennID" className="block text-sm font-medium text-gray-700 rounded-md">
        Zenn
      </label>
      <input
        type="text"
        id="zennID"
        name="zennID"
        value={zennID}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="qiitaID" className="block text-sm font-medium text-gray-700 rounded-md">
        Qiita
      </label>
      <input
        type="text"
        id="qiitaID"
        name="qiitaID"
        value={qiitaID}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="atcoderID" className="block text-sm font-medium text-gray-700 rounded-md">
        AtCoder
      </label>
      <input
        type="text"
        id="atcoderID"
        name="atcoderID"
        value={atcoderID}
        onChange={onChange}
        className="mt-1 px-2 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default SnsAccounts;
