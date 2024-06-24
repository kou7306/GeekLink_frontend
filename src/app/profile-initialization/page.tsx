// app/profile-initialization/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ages, places, technologies, occupations, User } from "@/components/profile/options";
import { TechModal } from "@/components/profile/TechModal";
import { TopTechModal } from "@/components/profile/TopTechModal";
import NameInput from "@/components/profile/NameInput";
import SexSelect from "@/components/profile/SexSelect";
import AgeSelect from "@/components/profile/AgeSelect";
import PlaceSelect from "@/components/profile/PlaceSelect";
import OccupationSelect from "@/components/profile/OccupationSelect";
import TechSelection from "@/components/profile/TechSelect";
import { getUuidFromCookie } from "@/actions/users";
import toast from "react-hot-toast";

export default function Profile() {
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isTopTecnologyModalOpen, setIsTopTecnologyModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [top_teches, setTopTech] = useState<string[]>([]);
  const [profile, setProfile] = useState<User>({
    user_id: "",
    name: "",
    sex: "",
    age: "",
    place: "",
    teches: [],
    top_teches: [],
    occupation: "",
    editor: "",
    affiliation: "",
    hobby: "",
    image_url: "",
    qualification: [],
    message: "",
    portfolio: "",
    graduate: "",
    desiredOccupation: "",
    faculty: "",
    experience: [],
    github: "",
    twitter: "",
    zenn: "",
    qiita: "",
    atcoder: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const uuid = await getUuidFromCookie();
      if (uuid) {
        setProfile((prev) => ({ ...prev, user_id: uuid }));
      }
    };

    fetchUsers();
  }, []);

  const toggleModal = () => setIsTechModalOpen(!isTechModalOpen);
  const openTopTechModal = () => {
    setIsTechModalOpen(false);
    setIsTopTecnologyModalOpen(true);
  };
  const closeTopTechModal = () => setIsTopTecnologyModalOpen(false);

  const handleSelectTech = (tech: string) => {
    setSelectedTech((prev) => {
      const isAlreadySelected = prev.includes(tech);
      if (isAlreadySelected) {
        return prev.filter((t) => t !== tech);
      }
      return [...prev, tech];
    });
  };

  const handleTopSelect = (tech: string) => {
    setTopTech((prev: string[]) => {
      const isAlreadySelected = prev.includes(tech);
      // すでに選択されている場合は除去し、選択されていない場合は追加（ただし3つまで）
      const newTopTech = isAlreadySelected
        ? prev.filter((t) => t !== tech) // 選択解除
        : prev.length < 3
        ? [...prev, tech] // 新規追加
        : prev; // 変更なし

      return newTopTech;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "tech") {
      // select multiple のための特別なハンドリング
      const options = (e.target as HTMLSelectElement).options;
      const values: string[] = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          values.push(options[i].value);
        }
      }
      setProfile((prev) => ({ ...prev, tech: values }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile = {
      ...profile,
      teches: selectedTech,
      top_teches: top_teches,
    };
    setProfile(updatedProfile);

    console.log("Profile to be updated:", updatedProfile);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        toast.success("プロフィールを更新しました");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen my-4 bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">プロフィール初期設定</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white shadow-xl rounded-lg">
        <div className="space-y-6">
          <NameInput
            name={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <SexSelect sex={profile.sex} onChange={handleChange} />
          <AgeSelect age={profile.age} onChange={handleChange} ages={ages} />
          <PlaceSelect place={profile.place} onChange={handleChange} places={places} />
          <OccupationSelect
            occupation={profile.occupation}
            onChange={handleChange}
            occupations={occupations}
          />
          <div>
            <TechSelection
              toggleModal={toggleModal}
              openTopTechModal={openTopTechModal}
              top_teches={top_teches}
              selectedTech={selectedTech}
            />
          </div>
          <TechModal
            isOpen={isTechModalOpen}
            technologies={technologies}
            selectedTech={selectedTech}
            onClose={toggleModal}
            onSelect={handleSelectTech}
            onNext={openTopTechModal}
          />
          <TopTechModal
            isOpen={isTopTecnologyModalOpen}
            selectedTech={selectedTech}
            top_teches={top_teches}
            onClose={closeTopTechModal}
            onTopSelect={handleTopSelect}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
