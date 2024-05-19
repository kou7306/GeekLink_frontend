"use client";
import { getUuidFromCookie } from "@/actions/users";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const characters = [
    {
      id: 0,
      name: "Asuka",
      url: "/img/AsukaSouryu.jpg",
      place: "東京都",
      techs: ["React", "TypeScript"],
    },
    {
      id: 1,
      name: "Gendo Ikari",
      url: "/img/GendoIkari.jpg",
      place: "福井県",
      techs: ["Vue", "JavaScript"],
    },
    {
      id: 2,
      name: "Kaoru Nagisa",
      url: "/img/KaoruNagisa.jpg",
      place: "大阪府",
      techs: ["Angular", "JavaScript"],
    },
    {
      id: 3,
      name: "Rei Ayanami",
      url: "/img/Rei.jpg",
      place: "東京都",
      techs: ["React", "TypeScript"],
    },
    {
      id: 4,
      name: "Shinji Ikari",
      url: "/img/ShinjiIkari.jpg",
      place: "東京都",
      techs: ["React", "TypeScript"],
    },
    {
      id: 5,
      name: "Mari Makinami",
      url: "/img/GendoIkari.jpg",
      place: "北海道",
      techs: ["Svelte", "JavaScript"],
    },
    {
      id: 6,
      name: "Kensuke Aida",
      url: "/img/GendoIkari.jpg",
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
      url: "/img/GendoIkari.jpg",
      place: "東京都",
      techs: ["Angular", "JavaScript"],
    },
    {
      id: 9,
      name: "Misato Katsuragi",
      url: "/img/GendoIkari.jpg",
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
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const user_id = await getUuidFromCookie();
      // console.log("user_id", user_id);
      if (user_id) {
        axios
          .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/check`, { user_id })
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
                <div className="relative w-full h-40">
                  <Image
                    src={character.url}
                    layout="fill"
                    objectFit="cover"
                    alt={character.name}
                    className="rounded-lg"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-center">{character.name}</h2>
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
                <div className="relative w-full h-40">
                  <Image
                    src={character.url}
                    layout="fill"
                    objectFit="cover"
                    alt={character.name}
                    className="rounded-lg"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-center">{character.name}</h2>
                <ul className="text-center flex justify-center space-x-2 list-none p-0">
                  {character.techs && character.techs.map((tech, index) => <li key={index}>{tech}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Home;
