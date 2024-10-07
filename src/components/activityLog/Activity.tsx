"use client";
import React, { useState, useEffect } from "react";
import {
  getYearlyContribution,
  getContributionsSinceLastUpdate,
  getMonthlyContributionInfo,
  getContributionsInfoSinceLastUpdate,
} from "../../utils/getGithubActivity";
import ActivityLogGraph from "./ActivityLogGraph";
import ActivityLog from "./ActivityLog";

interface ActivityProps {
  uuid: string;
}

// Activityコンポーネント
const Activity: React.FC<ActivityProps> = ({ uuid }) => {
  const [yearlyContribution, setYearlyContribution] = useState<number[]>([]);
  const [monthlyContributionInfo, setMonthlyContributionInfo] = useState<any[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態の管理

  useEffect(() => {
    const fetchData = async () => {
      if (uuid) {
        // 年間コントリビューションを取得
        const yearlyData = await getYearlyContribution(uuid);
        setYearlyContribution(yearlyData);

        // 更新以来のコントリビューションを取得
        const contributionsSinceLastUpdate =
          await getContributionsSinceLastUpdate(uuid);

        if (Array.isArray(contributionsSinceLastUpdate)) {
          // yearlyContributionを全て更新
          setYearlyContribution(contributionsSinceLastUpdate);
        } else {
          console.log(contributionsSinceLastUpdate);
          setYearlyContribution((prev) => {
            const updatedData = [...prev]; // 前のデータをコピー
            updatedData[updatedData.length - 1] += contributionsSinceLastUpdate; // 最後の値に加算
            return updatedData;
          });
        }

        console.log(contributionsSinceLastUpdate);

        // 月の詳細のコントリビューション情報を取得
        const monthlyContributionInfo = await getMonthlyContributionInfo(uuid);
        setMonthlyContributionInfo(monthlyContributionInfo.logs);

        // 更新以来のコントリビューション情報を取得
        const contributionsInfoSinceLastUpdate =
          await getContributionsInfoSinceLastUpdate(uuid);

        // contributionsInfoSinceLastUpdateが配列の場合にのみ連結
        if (Array.isArray(contributionsInfoSinceLastUpdate)) {
          setMonthlyContributionInfo((prev) => [
            ...prev,
            ...contributionsInfoSinceLastUpdate,
          ]);
        }
        console.log(contributionsInfoSinceLastUpdate);
      }
      setLoading(false); // ローディング完了
    };

    fetchData();
  }, [uuid]);

  if (loading) {
    return <div>Loading...</div>; // ローディング中の表示
  }

  return (
    <div>
      <h2>年間コントリビューション数</h2>
      <ActivityLogGraph kind="github" data={yearlyContribution} />
      <ActivityLog kind="github" data={monthlyContributionInfo} />
    </div>
  );
};

export default Activity;
