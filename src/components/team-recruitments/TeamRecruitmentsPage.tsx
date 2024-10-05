"use client";

import React, { useState } from "react";
import TeamRecruitmentTabs from "./TeamRecruitmentsTabs";
import TeamRecruitmentPanels from "./TeamRecruitmentsPanels";
import Options from "./Options";
import { Event } from "@/types/event";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

interface TeamRecruitmentPageProps {
  hackathonEvents: Event[];
  eventEvents: Event[];
}

const TeamRecruitmentPage = ({ hackathonEvents, eventEvents }: TeamRecruitmentPageProps) => {
  const [value, setValue] = useState("1");
  return (
    <>
      {/* タブ */}
      <TeamRecruitmentTabs value={value} setValue={setValue} />
      {/* ソートと検索のアイコン */}
      <Options />
      {/* チーム募集 */}
      <TeamRecruitmentPanels value={value} hackathonEvents={hackathonEvents} eventEvents={eventEvents} />
      <Link href="/team-recruitments/create">
        <button
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaPlus />
        </button>
      </Link>
    </>
  );
};

export default TeamRecruitmentPage;
