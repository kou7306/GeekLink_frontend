import { Box, Typography } from "@mui/material";
import React from "react";
import UsersRanking from "../UsersRanking";
import UsersRankings from "./UsersRankings";

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
        <UsersRankings />
      </TabPanel>
      {/* 週間 */}
      <TabPanel value={value} index="2">
        <UsersRankings />
      </TabPanel>
      {/* 月間 */}
      <TabPanel value={value} index="3">
        <UsersRankings />
      </TabPanel>
    </>
  );
};

export default RankingPanels;
