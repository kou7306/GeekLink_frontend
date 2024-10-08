"use client";
import React, { useEffect, useState } from "react";
import FilterSearch from "../modal/FilterSearch";
import {
  ageToIndex,
  desiredOccupationToIndex,
  experienceToIndex,
  graduateToIndex,
  occupationToIndex,
  placeToIndex,
  techToIndex,
} from "@/utils/mapping";
import { useRouter } from "next/navigation";
import { getUuidFromCookie } from "@/actions/users";
import Loading from "../core/Loading";
import UserCard from "./UserCard";
import { Profile } from "../../types/user";

interface UsersResponse {
  samePlaceUsers: Profile[];
  sameAgeUsers: Profile[];
  sameGraduateYearUsers: Profile[];
  sameJobTypeUsers: Profile[];
  sameTopTechUsers: Profile[];
  sortedUsers: { user: Profile; score: number }[];
}

type Props = {
  isUserIdExist: boolean;
};

const UsersPage = ({ isUserIdExist = false }: Props) => {
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
      const uuid = await getUuidFromCookie();
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

        setUsers(data);
      }
    };

    fetchAndSetData();
  }, [uuid]);

  const handlePlaceClick = (place: string) => {
    setSelectedPlaces((prevSelectedPlaces) =>
      prevSelectedPlaces.includes(place)
        ? prevSelectedPlaces.filter((p) => p !== place)
        : [...prevSelectedPlaces, place]
    );
  };

  const handleAgeClick = (age: string) => {
    const ageNumber = age.replace("歳", "");
    setSelectedAges((prevSelectedAges) =>
      prevSelectedAges.includes(ageNumber)
        ? prevSelectedAges.filter((a) => a !== ageNumber)
        : [...prevSelectedAges, ageNumber]
    );
  };

  const onChangeHobby = (hobby: string) => {
    setEnteredHobby(hobby);
  };

  const handleFirstTechClick = (firstTech: string) => {
    setSelectedFirstTechs((prevSelectedFirstTechs) =>
      prevSelectedFirstTechs.includes(firstTech)
        ? prevSelectedFirstTechs.filter((f) => f !== firstTech)
        : [...prevSelectedFirstTechs, firstTech]
    );
  };

  const handleOccupationClick = (occupation: string) => {
    setSelectedOccupations((prevSelectedOccupations) =>
      prevSelectedOccupations.includes(occupation)
        ? prevSelectedOccupations.filter((o) => o !== occupation)
        : [...prevSelectedOccupations, occupation]
    );
  };

  const handleGraduateClick = (graduateOption: string) => {
    setSelectedGraduates((prevSelectedGraduates) =>
      prevSelectedGraduates.includes(graduateOption)
        ? prevSelectedGraduates.filter((g) => g !== graduateOption)
        : [...prevSelectedGraduates, graduateOption]
    );
  };
  const handleDesiredOccupationClick = (desiredOccupationOption: string) => {
    setSelectedDesiredOccupations((prevSelectedDesiredOccupations) =>
      prevSelectedDesiredOccupations.includes(desiredOccupationOption)
        ? prevSelectedDesiredOccupations.filter(
            (d) => d !== desiredOccupationOption
          )
        : [...prevSelectedDesiredOccupations, desiredOccupationOption]
    );
  };
  const handleExperienceClick = (experienceOption: string) => {
    setSelectedExperiences((prevSelectedExperiences) =>
      prevSelectedExperiences.includes(experienceOption)
        ? prevSelectedExperiences.filter((e) => e !== experienceOption)
        : [...prevSelectedExperiences, experienceOption]
    );
  };
  const handleSearch = () => {
    const placesQuery = selectedPlaces.map(placeToIndex).join(",");
    const agesQuery = selectedAges.map(ageToIndex).join(",");
    const techsQuery = selectedFirstTechs.map(techToIndex).join(",");
    const occupationsQuery = selectedOccupations
      .map(occupationToIndex)
      .join(",");
    const graduatesQuery = selectedGraduates.map(graduateToIndex).join(",");
    const desiredOccupationsQuery = selectedDesiredOccupations
      .map(desiredOccupationToIndex)
      .join(",");
    const experiencesQuery = selectedExperiences
      .map(experienceToIndex)
      .join(",");

    const query = `places=${placesQuery}&ages=${agesQuery}&hobby=${enteredHobby}&techs=${techsQuery}&occupations=${occupationsQuery}&graduates=${graduatesQuery}&desiredOccupations=${desiredOccupationsQuery}&experiences=${experiencesQuery}`;

    router.push(`/filter?${query}`);
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
        onSearch={handleSearch}
      />
      {isUserIdExist && users ? (
        <div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            総合的な一致度が高いお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.sortedUsers.length > 0 ? (
              users.sortedUsers.map((user) => (
                <UserCard
                  key={user.user.user_id}
                  user={user.user}
                  chipOption="overAll"
                />
              ))
            ) : (
              <p className="text-center mt-4 ml-8">該当者がいません</p>
            )}
          </div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            技術スタックが一致しているお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.sameTopTechUsers.length > 0 ? (
              users.sameTopTechUsers.map((user) => (
                <UserCard
                  key={user.user_id}
                  user={user}
                  chipOption="sameTech"
                />
              ))
            ) : (
              <p className="text-center mt-4 ml-8">該当者がいません</p>
            )}
          </div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            居住地が近いお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.samePlaceUsers.length > 0 ? (
              users.samePlaceUsers.map((user) => (
                <UserCard
                  key={user.user_id}
                  user={user}
                  chipOption="samePlace"
                />
              ))
            ) : (
              <p className="text-center mt-4 ml-8">該当者がいません</p>
            )}
          </div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            年齢が同じお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.sameAgeUsers.length > 0 ? (
              users.sameAgeUsers.map((user) => (
                <UserCard key={user.user_id} user={user} chipOption="sameAge" />
              ))
            ) : (
              <p className="text-center mt-4 ml-8">該当者がいません</p>
            )}
          </div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            卒業年度が同じお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.sameGraduateYearUsers.length > 0 ? (
              users.sameGraduateYearUsers.map((user) => (
                <UserCard
                  key={user.user_id}
                  user={user}
                  chipOption="sameGraduate"
                />
              ))
            ) : (
              <p className="text-center mt-4 ml-8">該当者がいません</p>
            )}
          </div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            希望職種が同じお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {users.sameJobTypeUsers.length > 0 ? (
              users.sameJobTypeUsers.map((user) => (
                <UserCard
                  key={user.user_id}
                  user={user}
                  chipOption="sameDesiredOccupation"
                />
              ))
            ) : (
              <p className="text-center mt-4 ml-8">該当者がいません</p>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UsersPage;
