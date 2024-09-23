import { Box, Typography } from "@mui/material";
import React from "react";

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
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <>
      {/* デイリー */}
      <TabPanel value={value} index="1">
        Item One
      </TabPanel>
      {/* 週間 */}
      <TabPanel value={value} index="2">
        Item Two
      </TabPanel>
      {/* 月間 */}
      <TabPanel value={value} index="3">
        Item Three
      </TabPanel>
    </>
  );
};

export default RankingPanels;
