import Recruitments from "@/components/team-recruitments/Recruitments";
import { Box, Typography } from "@mui/material";

async function fetchEventsByKeyword(keyword: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/events/search/${keyword}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const events = await response.json();
  return events;
}

const SearchPage = async (params: { searchParams: { keyword: string } }) => {
  const keyword = params.searchParams.keyword;

  const events = await fetchEventsByKeyword(keyword);
  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {keyword} の検索結果
      </Typography>
      <Recruitments events={events} />
    </Box>
  );
};

export default SearchPage;
