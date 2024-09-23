"use client";

import React, { useState } from "react";
import TeamRecruitmentTabs from "./TeamRecruitmentTabs";
import TeamRecruitmentPanels from "./TeamRecruitmentPanels";

const TeamRecruitmentPage = () => {
  const [value, setValue] = useState("1");
  return (
    <>
      <TeamRecruitmentTabs value={value} setValue={setValue} />
      <TeamRecruitmentPanels value={value} />
    </>
  );
};

export default TeamRecruitmentPage;
