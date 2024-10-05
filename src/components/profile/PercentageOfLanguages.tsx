import { getUuidFromCookie } from "@/actions/users";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LanguageGraph from "./LanguageGraph";

const PercentageOfLanguages = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["percentageOfLanguages"],
    queryFn: async () => {
      const uuid = await getUuidFromCookie();
      if (!uuid) {
        return [];
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/github/lang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uuid }),
        }
      );
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <LanguageGraph GitHubLanguages={data} />
    </Box>
  );
};

export default PercentageOfLanguages;
