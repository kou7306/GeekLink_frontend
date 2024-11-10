"use client";
import { getUuidFromCookie } from "@/actions/users";
import TeamRecruitmentPage from "@/components/team-recruitments/TeamRecruitmentsPage";
import { useState, useEffect } from "react";

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
  const [hackathonEvents, setHackathonEvents] = useState([]);
  const [eventEvents, setEventEvents] = useState([]);
  const [currentUserEvents, setCurrentUserEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hackathonEvents = await fetchEvents("HACKATHON");
        const eventEvents = await fetchEvents("EVENT");
        const currentUserUuid = await getUuidFromCookie();
        setHackathonEvents(hackathonEvents);
        setEventEvents(eventEvents);
        if (currentUserUuid) {
          const currentUserEvents = await fetchCurrentUserEvents(
            currentUserUuid
          );
          setCurrentUserEvents(currentUserEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <TeamRecruitmentPage
      hackathonEvents={hackathonEvents}
      eventEvents={eventEvents}
      currentUserEvents={currentUserEvents}
    />
  );
}
