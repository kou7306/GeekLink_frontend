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
import { getQiitaActivity } from "../../utils/getQiitaActivity";

interface ActivityProps {
  uuid: string;
}

// Activityコンポーネント
const Activity: React.FC<ActivityProps> = ({ uuid }) => {
  const [yearlyContribution, setYearlyContribution] = useState<number[]>([]);
  const [monthlyContributionInfo, setMonthlyContributionInfo] = useState<any[]>(
    []
  );
  const [yearlyQiitaPosts, setYearlyQiitaPosts] = useState<number[]>([]); // Qiitaの年間投稿数
  const [monthlyQiitaActivity, setMonthlyQiitaActivity] = useState<any[]>([]); // Qiitaの月間の投稿情報
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態の管理

  useEffect(() => {
    const fetchData = async () => {
      if (uuid) {
        // GitHub年間コントリビューションを取得
        const yearlyData = await getYearlyContribution(uuid);
        setYearlyContribution(yearlyData);

        // GitHub更新以来のコントリビューションを取得
        const contributionsSinceLastUpdate =
          await getContributionsSinceLastUpdate(uuid);

        if (Array.isArray(contributionsSinceLastUpdate)) {
          setYearlyContribution(contributionsSinceLastUpdate);
        } else {
          setYearlyContribution((prev) => {
            const updatedData = [...prev]; // 前のデータをコピー
            updatedData[updatedData.length - 1] += contributionsSinceLastUpdate; // 最後の値に加算
            return updatedData;
          });
        }

        // GitHubの月別コントリビューション詳細を取得
        const monthlyContributionInfo = await getMonthlyContributionInfo(uuid);
        setMonthlyContributionInfo(monthlyContributionInfo.logs);

        // Qiitaの年間投稿数を取得
        const qiitaActivity = await getQiitaActivity(uuid);
        setYearlyQiitaPosts(qiitaActivity.monthlyPostCounts);

        // Qiitaの月間の投稿情報を取得
        const monthlyQiitaActivity = qiitaActivity.postDetails;
      }
      setLoading(false); // ローディング完了
    };

    fetchData();
  }, [uuid]);

  if (loading) {
    return <div>Loading...</div>; // ローディング中の表示
  }

  const activityData = [
    {
      kind: "github",
      data: monthlyContributionInfo,
    },
    {
      kind: "qiita",
      data: monthlyQiitaActivity,
    },
  ];

  // グラフ用データを作成
  const graphData = [
    {
      kind: "github",
      data: yearlyContribution,
    },
    {
      kind: "qiita",
      data: yearlyQiitaPosts,
    },
  ];

  return (
    <div>
      <h2>年間コントリビューション数</h2>
      {/* GitHubとQiitaの両方のデータをActivityLogGraphに渡す */}
      <ActivityLogGraph propsArray={graphData} />

      <h2>GitHub月別コントリビューション詳細</h2>
      <ActivityLog activities={activityData} />
    </div>
  );
};

export default Activity;
