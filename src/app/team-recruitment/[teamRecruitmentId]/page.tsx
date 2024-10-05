import { getUuidFromCookie } from "@/actions/users";
import TeamRecruitmentPage from "@/components/team-recruitment/TeamRecruitmentPage";
import React from "react";

async function fetchEventById(eventId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`, {
    method: "GET",
    mode: "cors",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }
  return response.json();
}

export default async function Page({ params }: { params: { teamRecruitmentId: string } }) {
  const event = await fetchEventById(params.teamRecruitmentId);
  const currentUserId = (await getUuidFromCookie()) ?? null;
  return <TeamRecruitmentPage event={event} currentUserId={currentUserId} />;
}
