// BonusPopup.tsx
import React from "react";

interface BonusPopupProps {
  lifeAdded?: number;
  coinsAdded?: number;
  userData: {
    life: number;
    coin: number;
    last_login_date: Date;
    total_login_count: number;
    login_streak: number;
  } | null; // userDataがnullの場合も考慮
  onClose: () => void;
}

const BonusPopup: React.FC<BonusPopupProps> = ({
  lifeAdded,
  coinsAdded,
  userData,
  onClose,
}) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border border-gray-300 rounded-lg shadow-lg p-6 z-50">
      <h2 className="text-xl font-bold">おめでとうございます！</h2>
      <p className="mt-2">ログインボーナスを獲得しました！</p>
      <p className="mt-2">ライフ: {lifeAdded}</p>
      <p className="mt-2">コイン: {coinsAdded}</p>
      {/* <p className="mt-2">連続ログイン日数: {userData.login_streak}</p> */}
      <button
        className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        onClick={onClose}
      >
        閉じる
      </button>
    </div>
  );
};

export default BonusPopup;
