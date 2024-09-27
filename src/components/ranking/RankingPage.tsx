"use client";

import React, { useState } from "react";
import RankingTabs from "./RankingTabs";
import RankingPanels from "./RankingPanels";

const RankingPage = () => {
  const [value, setValue] = useState("1");
  return (
    <>
      <RankingTabs value={value} setValue={setValue} />
      <RankingPanels value={value} />
    </>
  );
};

export default RankingPage;
