import { List } from "@mui/material";
import React from "react";
import Team from "./Team";
import { useQuery } from "@tanstack/react-query";
import ComponentLoading from "../core/ComponentLoading";

const EventsPage = () => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(
        // TODO:最新3件の募集を取得するAPIを作成・変更予定⇒このルートだと全てのイベントを取ってきてしまう
        `${process.env.NEXT_PUBLIC_API_URL}/events/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch NewEvents");
      }
      return response.json();
    },
  });

  const events: any[] = data;

  if (isPending) return <ComponentLoading />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <List disablePadding>
      {events.map((item) => (
        <Team item={item} key={item.id} />
      ))}
    </List>
  );
};

export default EventsPage;
