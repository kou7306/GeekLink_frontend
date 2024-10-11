"use client";
import { getUuidFromCookie } from "@/actions/users";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import TimeLineContainer from "@/components/timeline/TimeLineContainer";
import Loading from "@/components/core/Loading";
import RightSide from "@/components/top-page/RightSide";
import LeftSide from "@/components/top-page/LeftSide";
import { Box } from "@mui/material";

interface Profile {
  user_id: string;
  created_at: Date;
  name: string;
  sex: string;
  age: string;
  place: string;
  top_tech: string;
  top_teches: string[];
  teches: string[];
  hobby?: string;
  occupation?: string;
  affiliation?: string;
  qualification: string[];
  editor?: string;
  github?: string;
  twitter?: string;
  qiita?: string;
  zenn?: string;
  atcoder?: string;
  message?: string;
  updated_at: Date;
  portfolio?: string;
  graduate?: string;
  desired_occupation?: string;
  faculty?: string;
  experience: string[];
  image_url?: string;
}

interface UsersResponse {
  samePlaceUsers: Profile[];
  sameAgeUsers: Profile[];
  sameGraduateYearUsers: Profile[];
  sameJobTypeUsers: Profile[];
  sameTopTechUsers: Profile[];
  sortedUsers: { user: Profile; score: number }[];
}

const Home = () => {
  const [userExists, setUserExists] = useState(null);
  const [uuid, setUuid] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const user_id = await getUuidFromCookie();
      if (user_id) {
        setUuid(user_id);
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/user/check-user-exists`, {
            user_id,
          })
          .then((response) => {
            setUserExists(response.data.exists);
            if (!response.data.exists) {
              router.push("/profile-initialization");
            }
          })
          .catch((error) => console.error("Error:", error));
      } else {
        router.push("/login");
      }
    };

    fetchUsers();
  }, [router]);

  return (
    <>
      {userExists ? (
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Box
            sx={{
              width: "20%", // 左サイドの幅を25%に設定
              position: "fixed",
              left: 0,
              overflowY: "auto", // スクロール可能にする
              backgroundColor: "#ffffff",
              height: "100vh",
            }}
          >
            <LeftSide />
          </Box>
          <Box
            sx={{
              width: "55%", // タイムラインの幅を40%に設定
              marginLeft: "20%", // 左サイドの幅と同じ値を指定してスペースを開ける
              padding: 2, // 必要に応じてパディングを追加
              overflowY: "auto", // タイムライン部分もスクロール可能にする
              height: "100vh",
            }}
          >
            <TimeLineContainer />
          </Box>
          <Box
            sx={{
              width: "25%", // 右サイドの幅を25%に設定
              overflowY: "auto", // スクロール可能にする
              position: "fixed",
              right: 0,
              height: "100vh",
            }}
          >
            <RightSide />
          </Box>
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
