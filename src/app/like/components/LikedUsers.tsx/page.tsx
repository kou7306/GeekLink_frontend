import IconField from "@/components/like/IconField";
import React from "react";

const LikedUsers = () => {
  const characters = [
    {
      name: "Asuka",
      image: "/img/AsukaSouryu.jpg",
      user_id: "1",
      imageURL: "/img/AsukaSouryu.jpg",
      age: 14,
      sex: "female",
      place: "東京都",
      occupation: "学部3年生",
      top_teches: ["Python", "JavaScript", "React"],
    },
    {
      name: "Gendo Ikari",
      image: "/img/GendoIkari.jpg",
      user_id: "2",
      imageURL: "/img/GendoIkari.jpg",
      age: 48,
      sex: "male",
      place: "東京都",
      occupation: "学生エンジニア",
      top_teches: ["Java", "C++", "Python"],
    },
    {
      name: "Kaoru Nagisa",
      imageURL: "/img/KaoruNagisa.jpg",
    },
    {
      name: "Rei Ayanami",
      imageURL: "/img/Rei.jpg",
    },
    {
      name: "Shinji Ikari",
      imageURL: "/img/ShinjiIkari.jpg",
    },
  ];
  return (
    <>
      <div className="flex justify-center  py-4">
        {characters.map((character, index) => (
          <IconField
            key={index}
            name={character.name}
            image={character.imageURL}
          />
        ))}
      </div>
    </>
  );
};

export default LikedUsers;
