import { Box } from "@mui/material";
import React from "react";
import UsersRankings from "./UsersRankings";
import { useQuery } from "@tanstack/react-query";
import { RankingData } from "../../../types/ranking";

type Props = {
  value: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: string;
  value: string;
}

const RankingPanels = ({ value }: Props) => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["ranking"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ranking/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Ranking");
      }
      return response.json();
    },
  });

  const dailyRanking: RankingData = data?.daily || { activity: [], contribution: [], star: [], qiita: [] };
  const weeklyRanking: RankingData = data?.weekly || { activity: [], contribution: [], star: [], qiita: [] };
  const monthlyRanking: RankingData = data?.monthly || { activity: [], contribution: [], star: [], qiita: [] };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    );
  }

  return (
    <>
      {/* デイリー */}
      <TabPanel value={value} index="1">
        <UsersRankings data={dailyRanking} />
      </TabPanel>
      {/* 週間 */}
      <TabPanel value={value} index="2">
        <UsersRankings data={weeklyRanking} />
      </TabPanel>
      {/* 月間 */}
      <TabPanel value={value} index="3">
        <UsersRankings data={monthlyRanking} />
      </TabPanel>
    </>
  );
};

export default RankingPanels;
