"use client";
import { useState } from "react";
import TinderCard from "react-tinder-card";

export default function Home() {
  const characters = [
    {
      name: "Asuka",
      url: "/img/AsukaSouryu.jpg",
    },
    {
      name: "Gendo Ikari",
      url: "/img/GendoIkari.jpg",
    },
    {
      name: "Kaoru Nagisa",
      url: "/img/KaoruNagisa.jpg",
    },
    {
      name: "Rei Ayanami",
      url: "/img/ReiAyanami.jpeg",
    },
    {
      name: "Shinji Ikari",
      url: "/img/ShinjiIkari.jpg",
    },
  ];

  const [lastDirection, setLastDirection] = useState("");

  const swiped = (direction: string, nameToDelete: string) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>Random-match</h1>
      <div className="w-[90vw] max-w-[260px] h-[300px]">
        {characters.map((character) => (
          <TinderCard
            className="absolute"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="relative bg-white w-80 max-w-[260px] h-[300px] shadow-[0px_0px_60px_0px_rgba(0,0,0,0.30)] rounded-[20px] bg-cover bg-center"
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
    </div>
  );
}
