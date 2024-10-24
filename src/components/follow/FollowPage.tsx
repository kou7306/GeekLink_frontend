import { Box, createTheme, Tab, Tabs, ThemeProvider } from "@mui/material";
import { useSearchParams } from "next/navigation";
import MutualUsers from "./MutualUsers";
import FollowUsers from "./FollowUsers";
import FollowerUsers from "./FollowerUsers";
import { FollowUser } from "../profile/options";

type FollowPageProps = {
  data: {
    follows: FollowUser[];
    followsNum: number;
    followers: FollowUser[];
    followersNum: number;
  };
  isMe: boolean;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#22d3ee",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem", // タブの文字サイズを大きくする
          padding: "1rem", // タブのパディングを増やす
        },
      },
    },
  },
});

const FollowPage = ({ data, isMe }: FollowPageProps) => {
  const value = useSearchParams().get("tab") || "follows";

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("tab", newValue);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, "", newUrl);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{ color: "#22d3ee" }}
        >
          <Tab label="フォロー中" value="follows" />
          {isMe && <Tab label="相互フォロー" value="mutual" />}
          <Tab label="フォロワー" value="followers" />
        </Tabs>
      </Box>
      {data && value === "follows" && <FollowUsers follows={data.follows} />}
      {data && value === "mutual" && isMe && (
        <MutualUsers follows={data.follows} followers={data.followers} />
      )}
      {data && value === "followers" && (
        <FollowerUsers followers={data.followers} />
      )}
    </ThemeProvider>
  );
};

export default FollowPage;
