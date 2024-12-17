import { getUuidFromCookie } from "@/actions/users";
import TeamRecruitmentPage from "@/components/team-recruitments/TeamRecruitmentsPage";

async function fetchEvents(eventType: "EVENT" | "HACKATHON") {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/events/type/${eventType}`, {
    next: {
      revalidate: 600, // 10分
    },
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
  }

  const events = await response.json();
  return events;
}

async function fetchCurrentUserEvents(ownerId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/events/owner/${ownerId}`, {
    method: "GET",
    mode: "cors",
    next: {
      revalidate: 600, // 10分
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  const events = await response.json();
  return events;
}

export default async function Page() {
  let hackathonEvents = [];
  let eventEvents = [];
  let currentUserEvents = [];

  try {
    hackathonEvents = await fetchEvents("HACKATHON");
  } catch (error) {
    console.error("Error fetching hackathon events:", error);
  }

  try {
    eventEvents = await fetchEvents("EVENT");
  } catch (error) {
    console.error("Error fetching event events:", error);
  }

  try {
    const currentUserUuid = await getUuidFromCookie();
    currentUserEvents = currentUserUuid
      ? await fetchCurrentUserEvents(currentUserUuid)
      : [];
  } catch (error) {
    console.error("Error fetching current user events:", error);
  }

  return (
    <TeamRecruitmentPage
      hackathonEvents={hackathonEvents}
      eventEvents={eventEvents}
      currentUserEvents={currentUserEvents}
    />
  );
}
