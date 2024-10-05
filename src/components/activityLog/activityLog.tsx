"use client";
import React, { useState, useEffect } from "react";
import {
  getYearlyContribution,
  getContributionsSinceLastUpdate,
} from "../../utils/getActivity";
import ActivityLogGraph from "./ActivityLogGraph";

interface ActivityLogProps {
  uuid: string;
}

// ActivityLogコンポーネント
const ActivityLog: React.FC<ActivityLogProps> = ({ uuid }) => {
  const [yearlyContribution, setYearlyContribution] = useState<number[]>([]);
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

        // logs が配列で返される場合、length を取得して最後の値に加算
        if (Array.isArray(contributionsSinceLastUpdate)) {
          const newContributionCount = contributionsSinceLastUpdate.length;
          console.log(contributionsSinceLastUpdate.length);
          setYearlyContribution((prev) => {
            const updatedData = [...prev]; // 前のデータをコピー
            updatedData[updatedData.length - 1] += newContributionCount; // 最後の値に加算
            return updatedData;
          });
        }
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
    </div>
  );
};

export default ActivityLog;
