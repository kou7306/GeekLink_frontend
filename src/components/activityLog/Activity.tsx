"use client";
import React, { useState, useEffect } from "react";
import {
  getYearlyContribution,
  getContributionsSinceLastUpdate,
  getMonthlyContributionInfo,
} from "../../utils/getGithubActivity";
import ActivityLogGraph from "./ActivityLogGraph";
import ActivityLog from "./ActivityLog";
import { Box, Typography, Paper } from "@mui/material";
import { getQiitaActivity } from "../../utils/getQiitaActivity";
import { getGeekLinkActivity } from "../../utils/getGeekLinkActivity";
import ComponentLoading from "../core/ComponentLoading";

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
  const [yearlyGeekLinkActivity, setYearlyGeekLinkActivity] = useState<
    number[]
  >([]); // GeekLinkの年間投稿数
  const [monthlyGeekLinkActivity, setMonthlyGeekLinkActivity] = useState<any[]>(
    []
  ); // GeekLinkの月間の投稿情報
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
        setMonthlyQiitaActivity(monthlyQiitaActivity);

        // アプリ内の年間のデータを取得
        const geekLinkActivity = await getGeekLinkActivity(uuid);
        setYearlyGeekLinkActivity(geekLinkActivity.monthlyActivityCounts);

        // アプリ内の月間のデータを取得
        const monthlyGeekLinkActivity = geekLinkActivity.activities;
        setMonthlyGeekLinkActivity(monthlyGeekLinkActivity);
      }
      setLoading(false); // ローディング完了
    };

    fetchData();
  }, [uuid]);

  if (loading) {
    return <ComponentLoading />; // ローディング中の表示
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
    {
      kind: "geeklink",
      data: monthlyGeekLinkActivity,
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
    {
      kind: "geeklink",
      data: yearlyGeekLinkActivity,
    },
  ];

  return (
    <Box mx={8}>
      {/* 全体を1つのPaperで囲む */}
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* 見出し */}
        <Typography variant="h5" component="h1" gutterBottom margin={4}>
          アクティビティー
        </Typography>

        {/* 年間コントリビューションのグラフ */}
        <Box
          my={4}
          display={"flex"}
          justifyContent={"center"}
          mx={24}
          bgcolor={"warning.main"}
        >
          <ActivityLogGraph propsArray={graphData} />
        </Box>

        {/* 月間コントリビューションのログ */}
        <Box>
          <ActivityLog activities={activityData} />
        </Box>
      </Paper>
    </Box>
  );
};

export default Activity;
