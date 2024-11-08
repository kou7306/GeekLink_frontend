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
    <div className="fixed inset-0 bg-sub_base bg-opacity-50 flex items-center justify-center z-50">
     <div className="border border-primary rounded-lg shadow-lg p-6 max-w-xs w-full text-center relative bg-sub_base">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 whitespace-nowrap">
          おめでとうございます！
        </h2>
        <p className="text-mg mb-2 whitespace-nowrap">
          ログインボーナスを獲得しました
        </p>

        {lifeAdded !== undefined && (
          <p className="text-lg mt-2 whitespace-nowrap">ライフ: {lifeAdded}</p>
        )}

        {coinsAdded !== undefined && (
          <p className="text-lg mt-2 whitespace-nowrap">コイン: {coinsAdded}</p>
        )}

        <button
          className="mt-4 bg-primary text-text rounded-md px-4 py-2 hover:bg-hover_blue whitespace-nowrap"
          onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default BonusPopup;
