"use client";
import { getUuidFromCookie } from "@/actions/users";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterSearch from "@/components/modal/FilterSearch";
import { User } from "@supabase/supabase-js";

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
  const [placeUsers, setplaceUsers] = useState<Profile[] | null>(null);
  const [ageUsers, setageUsers] = useState<Profile[] | null>(null);
  const [graduateUsers, setgraduateUsers] = useState<Profile[] | null>(null);
  const [jobUsers, setjobUsers] = useState<Profile[] | null>(null);
  const [sortUsers, setsortUsers] = useState<Profile[] | null>(null);

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
            console.log(response.data.exists)
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

      if (cachedData && cacheExpiry && new Date().getTime() < parseInt(cacheExpiry)) {
        // キャッシュが有効であればそれを使用
        console.log("Using cached data");
        setUsers(JSON.parse(cachedData));
      } else {
        // キャッシュが存在しないor有効期限が切れている場合はAPIを呼び出す
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggest/all?uuid=${uuid}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: UsersResponse = await response.json();

        // データをキャッシュに保存し、有効期限を設定
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_EXPIRY_KEY, (new Date().getTime() + CACHE_DURATION).toString());

        console.log(data);
        setUsers(data);
      }
    };

    fetchAndSetData();
  }, [uuid]);

  const handlePlaceClick = (place: string) => {
    console.log(place);
    setSelectedPlaces((prevSelectedPlaces) =>
      prevSelectedPlaces.includes(place)
        ? prevSelectedPlaces.filter((p) => p !== place)
        : [...prevSelectedPlaces, place]
    );
    console.log(selectedPlaces);
  };

  const handleAgeClick = (age: string) => {
    const ageNumber = age.replace("歳", "");
    console.log(ageNumber);
    setSelectedAges((prevSelectedAges) =>
      prevSelectedAges.includes(ageNumber)
        ? prevSelectedAges.filter((a) => a !== ageNumber)
        : [...prevSelectedAges, ageNumber]
    );
    console.log(selectedAges);
  };

  const onChangeHobby = (hobby: string) => {
    console.log(hobby);
    setEnteredHobby(hobby);
    console.log(enteredHobby);
  };

  const handleFirstTechClick = (firstTech: string) => {
    console.log(firstTech);
    setSelectedFirstTechs((prevSelectedFirstTechs) =>
      prevSelectedFirstTechs.includes(firstTech)
        ? prevSelectedFirstTechs.filter((f) => f !== firstTech)
        : [...prevSelectedFirstTechs, firstTech]
    );
    console.log(selectedFirstTechs);
  };

  const handleOccupationClick = (occupation: string) => {
    console.log(occupation);
    setSelectedOccupations((prevSelectedOccupations) =>
      prevSelectedOccupations.includes(occupation)
        ? prevSelectedOccupations.filter((o) => o !== occupation)
        : [...prevSelectedOccupations, occupation]
    );
    console.log(selectedOccupations);
  };

  const handleGraduateClick = (graduateOption: string) => {
    console.log(graduateOption);
    setSelectedGraduates((prevSelectedGraduates) =>
      prevSelectedGraduates.includes(graduateOption)
        ? prevSelectedGraduates.filter((g) => g !== graduateOption)
        : [...prevSelectedGraduates, graduateOption]
    );
    console.log(selectedGraduates);
  };
  const handleDesiredOccupationClick = (desiredOccupationOption: string) => {
    console.log(desiredOccupationOption);
    setSelectedDesiredOccupations((prevSelectedDesiredOccupations) =>
      prevSelectedDesiredOccupations.includes(desiredOccupationOption)
        ? prevSelectedDesiredOccupations.filter(
            (d) => d !== desiredOccupationOption
          )
        : [...prevSelectedDesiredOccupations, desiredOccupationOption]
    );
    console.log(selectedDesiredOccupations);
  };
  const handleExperienceClick = (experienceOption: string) => {
    console.log(experienceOption);
    setSelectedExperiences((prevSelectedExperiences) =>
      prevSelectedExperiences.includes(experienceOption)
        ? prevSelectedExperiences.filter((e) => e !== experienceOption)
        : [...prevSelectedExperiences, experienceOption]
    );
    console.log(selectedExperiences);
  };

  return (
    <>
      <FilterSearch
        handlePlaceClick={handlePlaceClick}
        selectedPlaces={selectedPlaces}
        handleAgeClick={handleAgeClick}
        selectedAges={selectedAges}
        onChangeHobby={onChangeHobby}
        enteredHobby={enteredHobby}
        handleFirstTechClick={handleFirstTechClick}
        selectedFirstTechs={selectedFirstTechs}
        handleOccupationClick={handleOccupationClick}
        selectedOccupations={selectedOccupations}
        handleGraduateClick={handleGraduateClick}
        selectedGraduates={selectedGraduates}
        handleDesiredOccupationClick={handleDesiredOccupationClick}
        selectedDesiredOccupations={selectedDesiredOccupations}
        handleExperienceClick={handleExperienceClick}
        selectedExperiences={selectedExperiences}
      />
      {userExists && users ? (
        <div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            総合的な一致度が高いお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.sortedUsers.map((user) => (
              <a
                key={user.user.user_id}
                href={`/other/${user.user.user_id}`}
                className="flex-none w-64 bg-primary rounded-lg p-4 shadow-md relative"
              >
                <div className="flex justify-center items-center relative w-40 h-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src={user.user.image_url ?? '/user.svg'}
                    layout="fill"
                    objectFit="cover"
                    alt={user.user.name}
                    className="rounded-full"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-center">
                  {user.user.name}
                </h2>
                <ul className="text-center flex justify-center space-x-2 list-none p-0">
                  {user.user.top_teches &&
                    user.user.top_teches.map((tech: string) => (
                      <li key={tech}>{tech}</li>
                    ))}
                </ul>
              </a>
            ))}
          </div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            技術スタックが一致しているお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.sameTopTechUsers.map((user) => (
              <a
                key={user.user_id}
                href={`/other/${user.user_id}`}
                className="flex-none w-64 bg-primary rounded-lg p-4 shadow-md relative"
              >
                <div className="flex justify-center items-center relative w-40 h-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src={user.image_url ?? '/user.svg'}
                    layout="fill"
                    objectFit="cover"
                    alt={user.name}
                    className="rounded-full"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-center">
                  {user.name}
                </h2>
                <p className="text-center">{user.top_tech}</p>
              </a>
            ))}
          </div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            居住地が近いお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.samePlaceUsers.map((user) => (
              <a
                key={user.user_id}
                href={`/other/${user.user_id}`}
                className="flex-none w-64 bg-primary rounded-lg p-4 shadow-md relative z-0"
              >
                <div className="flex justify-center items-center relative w-40 h-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src={user.image_url ?? '/user.svg'}
                    layout="fill"
                    objectFit="cover"
                    alt={user.name}
                    className="rounded-full"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-center">
                  {user.name}
                </h2>
                <p className="text-center">{user.place}</p>
              </a>
            ))}
          </div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            年齢が同じお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.sameAgeUsers.map((user) => (
              <a
                key={user.user_id}
                href={`/other/${user.user_id}`}
                className="flex-none w-64 bg-primary rounded-lg p-4 shadow-md relative"
              >
                <div className="flex justify-center items-center relative w-40 h-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src={user.image_url ?? '/user.svg'}
                    layout="fill"
                    objectFit="cover"
                    alt={user.name}
                    className="rounded-full"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-center">
                  {user.name}
                </h2>
                <p className="text-center">{user.age}</p>
              </a>
            ))}
          </div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            卒業年度が同じお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.sameGraduateYearUsers.map((user) => (
              <a
                key={user.user_id}
                href={`/other/${user.user_id}`}
                className="flex-none w-64 bg-primary rounded-lg p-4 shadow-md relative"
              >
                <div className="flex justify-center items-center relative w-40 h-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src={user.image_url ?? '/user.svg'}
                    layout="fill"
                    objectFit="cover"
                    alt={user.name}
                    className="rounded-full"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-center">
                  {user.name}
                </h2>
                <p className="text-center">{user.graduate}</p>
              </a>
            ))}
          </div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            希望職種が同じお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.sameJobTypeUsers.map((user) => (
              <a
                key={user.user_id}
                href={`/other/${user.user_id}`}
                className="flex-none w-64 bg-primary rounded-lg p-4 shadow-md relative"
              >
                <div className="flex justify-center items-center relative w-40 h-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src={user.image_url ?? '/user.svg'}
                    layout="fill"
                    objectFit="cover"
                    alt={user.name}
                    className="rounded-full"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-center">
                  {user.name}
                </h2>
                <p className="text-center">{user.desired_occupation}</p>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Home;
