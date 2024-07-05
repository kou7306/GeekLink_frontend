"use client";
import { getUuidFromCookie } from "@/actions/users";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterSearch from "@/components/modal/FilterSearch";

const Home = () => {
  const characters = [
    {
      id: 0,
      name: "Asuka",
      url: "/img/pi.jpg",
      place: "東京都",
      techs: ["React", "TypeScript"],
    },
    {
      id: 1,
      name: "Gendo Ikari",
      url: "/img/ima.jpg",
      place: "福井県",
      techs: ["Vue", "JavaScript"],
    },
    {
      id: 2,
      name: "Kaoru Nagisa",
      url: "/img/hu.png",
      place: "大阪府",
      techs: ["Angular", "JavaScript"],
    },
    {
      id: 3,
      name: "Rei Ayanami",
      url: "/img/light.jpg",
      place: "東京都",
      techs: ["React", "TypeScript"],
    },
    {
      id: 4,
      name: "Shinji Ikari",
      url: "/img/poke.png",
      place: "東京都",
      techs: ["React", "TypeScript"],
    },
    {
      id: 5,
      name: "Mari Makinami",
      url: "/img/cat.png",
      place: "北海道",
      techs: ["Svelte", "JavaScript"],
    },
    {
      id: 6,
      name: "Kensuke Aida",
      url: "/img/ka.png",
      place: "福岡県",
      techs: ["React", "TypeScript"],
    },
    {
      id: 7,
      name: "Toji Suzuhara",
      url: "/img/GendoIkari.jpg",
      place: "千葉県",
      techs: ["Vue", "JavaScript"],
    },
    {
      id: 8,
      name: "Ritsuko Akagi",
      url: "/img/AsukaSouryu.jpg",
      place: "東京都",
      techs: ["Angular", "JavaScript"],
    },
    {
      id: 9,
      name: "Misato Katsuragi",
      url: "/img/KaoruNagisa.jpg",
      place: "愛知県",
      techs: ["React", "TypeScript"],
    },
    {
      id: 10,
      name: "Kaji Ryoji",
      url: "/img/GendoIkari.jpg",
      place: "京都府",
      techs: ["Svelte", "JavaScript"],
    },
    {
      id: 11,
      name: "Hikari Horaki",
      url: "/img/GendoIkari.jpg",
      place: "奈良県",
      techs: ["Vue", "JavaScript"],
    },
  ];

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
      {userExists ? (
        <div>
          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            居住地が近いお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {characters.map((character) => (
              <div
                key={character.id}
                className="flex-none w-64 bg-primary rounded-lg p-4 shadow-md relative"
              >
                <div className="flex justify-center items-center relative w-40 h-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src={character.url}
                    layout="fill"
                    objectFit="cover"
                    alt={character.name}
                    className="rounded-full"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-center">
                  {character.name}
                </h2>
                <p className="text-center">{character.place}</p>
              </div>
            ))}
          </div>

          <p className="flex justify-start text-2xl font-bold text-center mt-8 ml-8">
            技術スタックが似ているお相手
          </p>
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {characters.map((character) => (
              <div
                key={character.id}
                className="flex-none w-64 bg-primary rounded-lg p-4 shadow-md relative"
              >
                <div className="flex justify-center items-center relative w-40 h-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src={character.url}
                    layout="fill"
                    objectFit="cover"
                    alt={character.name}
                    className="rounded-full"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-center">
                  {character.name}
                </h2>
                <ul className="text-center flex justify-center space-x-2 list-none p-0">
                  {character.techs &&
                    character.techs.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                </ul>
              </div>
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
