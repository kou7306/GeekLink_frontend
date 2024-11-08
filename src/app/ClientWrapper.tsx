"use client";
import React, { useEffect, useState } from "react";
import { getLoginBonus } from "@/utils/getLoginBonus";
import BonusPopup from "@/components/BonusPopup";

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showBonusPopup, setShowBonusPopup] = useState(false);
  const [bonusData, setBonusData] = useState<any | null>(null); // 取得したボーナスデータを格納
  const [isFirstVisit, setIsFirstVisit] = useState(false); // 今日初めてのアクセスかどうか

  useEffect(() => {
    // 現在の日付を取得 (YYYY-MM-DD 形式)
    const today = new Date().toISOString().split("T")[0];
    const lastAccessDate = localStorage.getItem("lastAccessDate");

    console.log("最終アクセス日:", lastAccessDate);

    // 初回アクセスの場合の処理
    if (!lastAccessDate || lastAccessDate !== today) {
      // 初回アクセスならば、最終アクセス日をローカルストレージに保存
      localStorage.setItem("lastAccessDate", today);
      setIsFirstVisit(true); // 初回アクセスフラグを設定
    }
    // 初回アクセスの場合
    if (isFirstVisit) {
      // ログインボーナスを取得
      getLoginBonus()
        .then((data: any) => {
          setBonusData(data); // ボーナスデータを設定
          setShowBonusPopup(true); // ポップアップを表示
          console.log("ボーナスデータ:", data);
        })
        .catch((error) => {
          console.error("ボーナス取得エラー:", error);
        });
    } else {
      setBonusData(null); // ボーナスデータをリセット
      setShowBonusPopup(false); // ポップアップを閉じる
    }
  }, [isFirstVisit]);

  const handleClosePopup = () => {
    setShowBonusPopup(false); // ポップアップを閉じる
    setBonusData(null); // ボーナスデータをリセット（必要に応じて）
    setIsFirstVisit(false); // 初回アクセスフラグをリセット
  };

  return (
    <>
      {showBonusPopup && bonusData && (
        <BonusPopup
          lifeAdded={bonusData.lifeAdded}
          coinsAdded={bonusData.coinsAdded}
          userData={bonusData.userData}
          onClose={handleClosePopup}
        />
      )}
      {children}
    </>
  );
};

export default ClientWrapper;
