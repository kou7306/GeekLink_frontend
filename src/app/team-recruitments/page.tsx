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

export default async function Page() {
  const hackathonEvents = await fetchEvents("HACKATHON");
  const eventEvents = await fetchEvents("EVENT");

  return <TeamRecruitmentPage hackathonEvents={hackathonEvents} eventEvents={eventEvents} />;
}
