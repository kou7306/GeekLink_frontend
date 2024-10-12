"use client";
import { getUuidFromCookie } from "@/actions/users";
import Loading from "@/components/core/Loading";
import TeamRecruitmentPage from "@/components/team-recruitment/TeamRecruitmentPage";
import React, { useEffect, useState } from "react";

async function fetchEventById(eventId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }
  return response.json();
}

export default function Page({
  params,
}: {
  params: { teamRecruitmentId: string };
}) {
  const [event, setEvent] = useState(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event by ID
        const fetchedEvent = await fetchEventById(params.teamRecruitmentId);
        setEvent(fetchedEvent);

        // Fetch user ID from cookies
        const userId = (await getUuidFromCookie()) ?? null;
        setCurrentUserId(userId);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.teamRecruitmentId]); // Dependency array to trigger when teamRecruitmentId changes

  if (loading) return <Loading />;

  return event ? (
    <TeamRecruitmentPage event={event} currentUserId={currentUserId} />
  ) : (
    <div>Error: Event not found</div>
  );
}
