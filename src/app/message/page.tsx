import Link from "next/link";
import Image from "next/image";
import React from "react";

const Page = () => {
  const characters = [
    {
      id: 0,
      name: "Asuka",
      url: "/img/AsukaSouryu.jpg",
      language: "TypeScript",
      age: 20,
      gender: "woman",
    },
    {
      id: 1,
      name: "Gendo Ikari",
      url: "/img/GendoIkari.jpg",
      language: "TypeScript",
      age: 34,
      gender: "man",
    },
    {
      id: 2,
      name: "Kaoru Nagisa",
      url: "/img/KaoruNagisa.jpg",
      language: "Go",
      age: 19,
      gender: "man",
    },
    {
      id: 3,
      name: "Rei Ayanami",
      url: "/img/ReiAyanami.jpeg",
      language: "Go",
      age: 22,
      gender: "female",
    },
    {
      id: 4,
      name: "Shinji Ikari",
      url: "/img/ShinjiIkari.jpg",
      language: "TypeScript",
      age: 20,
      gender: "man",
    },
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="font-bold mb-4">トーク一覧</div>
      <div id="character-list">
        {characters.map((character) => (
          <Link key={character.id} href={`message/${character.id}`}>
            <div className="flex items-start mb-4 cursor-pointer">
              <div>
                <div className="w-20 h-20 relative">
                  <Image
                    src={character.url}
                    alt={character.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="text-xs text-gray-500 text-center">
                  <div className="mt-1">{character.language}</div>
                  <div>
                    {character.age}歳 / {character.gender}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start mt-2 ml-5">
                <div className="font-semibold text-lg">{character.name}</div>
                <div className="text-gray-500 text-sm my-2">こんにちは</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
