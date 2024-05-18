// components/SnsIDModal.tsx
import React from 'react';
import { ProfileForm } from './options';

interface SnsIDModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SnsIDModal: React.FC<SnsIDModalProps> = ({ isOpen, onClose, profile, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">SNS ID 入力</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="GitHub ID"
            value={profile.githubID}
            name="githubID"
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Twitter ID"
            value={profile.twitterID}
            name="twitterID"
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Zenn ID"
            value={profile.zennID}
            name="zennID"
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Qiita ID"
            value={profile.qiitaID}
            name="qiitaID"
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="AtCoder ID"
            value={profile.atcoderID}
            name="atcoderID"
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default SnsIDModal;
