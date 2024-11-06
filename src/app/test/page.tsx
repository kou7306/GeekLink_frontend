"use client";
import React from "react";
import BonusPopup from "@/components/BonusPopup";

const TestPage: React.FC = () => {
  // テストデータの定義
  const testBonusData = {
    lifeAdded: 3,
    coinsAdded: 150,
    userData: {
      login_streak: "5", // 連続ログイン日数
      last_login_date: new Date().toLocaleDateString(), // 最後のログイン日
    },
  };

  const handleClosePopup = () => {
    console.log("ポップアップを閉じました");
    // ポップアップを閉じる処理（必要に応じて）
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">テストページ</h1>
      {/* BonusPopupを表示 */}
      <BonusPopup
        lifeAdded={testBonusData.lifeAdded}
        coinsAdded={testBonusData.coinsAdded}
        userData={testBonusData.userData} // userDataを渡す
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default TestPage;
