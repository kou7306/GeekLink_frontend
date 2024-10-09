import { getUuidFromCookie } from "@/actions/users";
import TeamRecruitmentPage from "@/components/team-recruitments/TeamRecruitmentsPage";

async function fetchEvents(eventType: "EVENT" | "HACKATHON") {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/type/${eventType}`, {
    method: "GET",
    mode: "cors",
    next: {
      revalidate: 600, // 10分
    },
  });
  const events = await response.json();
  return events;
}

async function fetchCurrentUserEvents(ownerId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/owner/${ownerId}`, {
    method: "GET",
    mode: "cors",
    next: {
      revalidate: 600, // 10分
    },
  });
  const events = await response.json();
  return events;
}

export default async function Page() {
  const hackathonEvents = await fetchEvents("HACKATHON");
  const eventEvents = await fetchEvents("EVENT");
  const currentUserUuid = await getUuidFromCookie();
  if (!currentUserUuid) {
    return null;
  }
  const currentUserEvents = await fetchCurrentUserEvents(currentUserUuid);

  return (
    <TeamRecruitmentPage
      hackathonEvents={hackathonEvents}
      eventEvents={eventEvents}
      currentUserEvents={currentUserEvents}
    />
  );
}
