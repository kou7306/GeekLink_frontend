import React from "react";
import Recruitment from "./Recruitment";
import { Box } from "@mui/material";
import Link from "next/link";
import { Event } from "@/types/event";

interface RecruitmentsProps {
  events: Event[];
}

const Recruitments = ({events }: RecruitmentsProps) => {

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {events.map((event) => (
          <Box key={event.id} sx={{ flexBasis: "calc(50% - 1rem)" }}>
            <Link href={`/team-recruitment/${event.id}`}>
              <Recruitment event={event} />
            </Link>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Recruitments;
