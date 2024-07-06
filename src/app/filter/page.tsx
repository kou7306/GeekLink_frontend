"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  indexToAge,
  indexToPlace,
  indexToTech,
  indexToOccupation,
  indexToGraduate,
  indexToDesiredOccupation,
  indexToExperience,
} from "@/utils/mapping";
import FilteredUsers from "./FilteredUsers";
import { User } from "@/components/profile/options";

const Filter = () => {
  const searchParams = useSearchParams();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const parseQueryParam = (param: string | null) => {
      if (!param) return [];
      return param.split(",");
    };

    const fetchFilteredUsers = async () => {
      const placesParam = searchParams.get("places");
      const agesParam = searchParams.get("ages");
      const techsParam = searchParams.get("techs");
      const occupationsParam = searchParams.get("occupations");
      const graduatesParam = searchParams.get("graduates");
      const desiredOccupationsParam = searchParams.get("desiredOccupations");
      const experiencesParam = searchParams.get("experiences");
      const hobbyParam = searchParams.get("hobby");

      const places = parseQueryParam(placesParam).map((index) => indexToPlace(parseInt(index)));
      const ages = parseQueryParam(agesParam).map((index) => indexToAge(parseInt(index)));
      const techs = parseQueryParam(techsParam).map((index) => indexToTech(parseInt(index)));
      const occupations = parseQueryParam(occupationsParam).map((index) =>
        indexToOccupation(parseInt(index))
      );
      const graduates = parseQueryParam(graduatesParam).map((index) => indexToGraduate(parseInt(index)));
      const desiredOccupations = parseQueryParam(desiredOccupationsParam).map((index) =>
        indexToDesiredOccupation(parseInt(index))
      );
      const experiences = parseQueryParam(experiencesParam).map((index) =>
        indexToExperience(parseInt(index))
      );

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/filter-users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            places,
            ages,
            hobby: hobbyParam || "",
            top_teches: techs,
            occupations,
            graduate: graduates,
            desired_occupation: desiredOccupations,
            experience: experiences,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching filtered users:", error);
      }
    };

      fetchFilteredUsers();
  }, [searchParams]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-8">検索結果</h2>
      {filteredUsers.length === 0 ? (
        <div className="text-center mt-4">条件に合ったユーザーが見つかりませんでした</div>
      ) : (
        <FilteredUsers users={filteredUsers} />
      )}
    </div>
  );
};

export default Filter;
