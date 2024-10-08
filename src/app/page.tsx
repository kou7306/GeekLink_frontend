"use client";
import { getUuidFromCookie } from "@/actions/users";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import TimeLineContainer from "@/components/timeline/TimeLineContainer";
import {
  ageToIndex,
  desiredOccupationToIndex,
  experienceToIndex,
  graduateToIndex,
  occupationToIndex,
  placeToIndex,
  techToIndex,
} from "@/utils/mapping";
import { User } from "@supabase/supabase-js";
import Loading from "@/components/core/Loading";
import TimeLine from "@/components/TimeLine";
import RightSide from "@/components/RightSide";
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

  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [enteredHobby, setEnteredHobby] = useState("");
  const [selectedFirstTechs, setSelectedFirstTechs] = useState<string[]>([]);
  const [selectedOccupations, setSelectedOccupations] = useState<string[]>([]);
  const [selectedGraduates, setSelectedGraduates] = useState<string[]>([]);
  const [selectedDesiredOccupations, setSelectedDesiredOccupations] = useState<
    string[]
  >([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [uuid, setUuid] = useState<string>("");
  const [users, setUsers] = useState<UsersResponse | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const user_id = await getUuidFromCookie();
      // console.log("user_id", user_id);
      if (user_id) {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/user/check-user-exists`, {
            user_id,
          })
          .then((response) => {
            console.log(response.data.exists);
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

  useEffect(() => {
    const fetchUsers = async () => {
      const uuid = await getUuidFromCookie();
      console.log(uuid);
      if (uuid) {
        setUuid(uuid);
      }
    };

    fetchUsers();
  }, []); // 初回マウント時に実行する

  useEffect(() => {
    const fetchAndSetData = async () => {
      const uuid = await getUuidFromCookie();
      if (!uuid) return; // UUIDが存在しない場合は実行しない

      const CACHE_KEY = `suggestData_${uuid}`;
      const CACHE_EXPIRY_KEY = `cacheExpiry_${uuid}`;
      const CACHE_DURATION = 24 * 60 * 60 * 1000; // 有効期限を1日に設定

      // キャッシュを確認
      const cachedData: string | null = localStorage.getItem(CACHE_KEY);
      const cacheExpiry: string | null = localStorage.getItem(CACHE_EXPIRY_KEY);

      if (
        cachedData &&
        cacheExpiry &&
        new Date().getTime() < parseInt(cacheExpiry)
      ) {
        // キャッシュが有効であればそれを使用
        console.log("Using cached data");
        setUsers(JSON.parse(cachedData));
      } else {
        // キャッシュが存在しないor有効期限が切れている場合はAPIを呼び出す
        const response: Response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/suggest/all?uuid=${uuid}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: UsersResponse = await response.json();

        // データをキャッシュに保存し、有効期限を設定
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(
          CACHE_EXPIRY_KEY,
          (new Date().getTime() + CACHE_DURATION).toString()
        );

        console.log(data);
        setUsers(data);
      }
    };

    fetchAndSetData();
  }, [uuid]);

  return (
    <>
      {userExists && users ? (
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Box sx={{ width: "60%" }}>
            <TimeLineContainer />
          </Box>
          <Box sx={{
            width: "40%",
            position: "fixed",
            right: 0,
            overflowY: "auto",
          }}>
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
