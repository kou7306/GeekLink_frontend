// app/my-page/page.tsx
"use client";

import React, { useState } from "react";
import {
  ages,
  places,
  technologies,
  occupations,
  ProfileForm,
  experienceOptions,
} from "@/components/profile/options";
import { TechModal } from "@/components/profile/TechModal";
import { TopTechModal } from "@/components/profile/TopTechModal";
import NameInput from "@/components/profile/NameInput";
import SexSelect from "@/components/profile/SexSelect";
import AgeSelect from "@/components/profile/AgeSelect";
import PlaceSelect from "@/components/profile/PlaceSelect";
import OccupationSelect from "@/components/profile/OccupationSelect";
import TechSelection from "@/components/profile/TechSelect";
import HobbyInput from "@/components/profile/HobbyInput";
import FacultySelect from "@/components/profile/FacultySelect";
import GraduateSelect from "@/components/profile/GraduateSelect";
import EditorSelect from "@/components/profile/EditorSelect";
import ExperienceSelect from "@/components/profile/ExperienceSelect";
import ExperienceModal from "@/components/profile/ExperienceModal";
import AffiliationInput from "@/components/profile/AffiliationInput";
import PortfolioInput from "@/components/profile/PortfolioInput";
import MessageInput from "@/components/profile/MessageInput";
import QualificationInput from "@/components/profile/QualificationInput";
import DesireOccupationSelect from "@/components/profile/DesireOccupationSelect";

export default function ProfileInitialization() {
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isTopTecnologyModalOpen, setIsTopTecnologyModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [topTech, setTopTech] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [showQualificationInput, setShowQualificationInput] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileForm>({
    name: "",
    sex: "",
    age: 0,
    place: "",
    techs: [],
    topTechs: [],
    occupation: "",
    hobby: "",
    editor: "",
    affiliation: "",
    qualification: [],
    message: "",
    portfolio: "",
    graduate: "",
    desiredOccupation: "",
    faculty: "",
  });

  const toggleTechModal = () => setIsTechModalOpen(!isTechModalOpen);
  const toggleExperienceModal = () => setIsExperienceModalOpen(!isExperienceModalOpen);

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

  const handleSelectExperience = (experience: string) => {
    setSelectedExperiences((prev) => {
      const isAlreadySelected = prev.includes(experience);
      if (isAlreadySelected) {
        return prev.filter((t) => t !== experience);
      }
      return [...prev, experience];
    });
  };

  const handleAddQualification = (qualification: string) => {
    setQualifications([...qualifications, qualification]);
    setShowQualificationInput(false);
  };

  const handleShowQualificationInput = () => {
    setShowQualificationInput(true);
  };

  const handleRemoveQualification = (index: number) => {
    setQualifications((prev) => prev.filter((_, i) => i !== index));
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
      const newValue = name === "age" ? parseInt(value, 10) : value;
      setProfile((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // profile の設定を更新する
    setProfile((prevProfile) => ({
      ...prevProfile,
      techs: selectedTech,
      topTechs: topTech,
      experience: selectedExperiences,
      qualification: qualifications,
    }));
    // 更新したプロファイルをコンソールに出力
    console.log("Profile Data:", { profile });
  };

  return (
    <div className="min-h-screen my-4 bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">プロフィール設定</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white shadow-xl rounded-lg">
        <div className="space-y-8">
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

          <TechSelection
            toggleModal={toggleTechModal}
            openTopTechModal={openTopTechModal}
            topTech={topTech}
            selectedTech={selectedTech}
          />

          <TechModal
            isOpen={isTechModalOpen}
            technologies={technologies}
            selectedTech={selectedTech}
            onSelect={handleSelectTech}
            onClose={toggleTechModal}
            onNext={openTopTechModal}
          />
          <TopTechModal
            isOpen={isTopTecnologyModalOpen}
            selectedTech={selectedTech}
            topTech={topTech}
            onClose={closeTopTechModal}
            onTopSelect={handleTopSelect}
          />

          <HobbyInput
            hobby={profile.hobby}
            onChange={(e) => setProfile({ ...profile, hobby: e.target.value })}
          />
          <AffiliationInput
            affiliation={profile.affiliation}
            onChange={(e) => setProfile({ ...profile, affiliation: e.target.value })}
          />

          <ul className="flex gap-2 flex-wrap mb-4">
            {qualifications.map((qualification, index) => (
              <li key={index} className="bg-blue-300 text-white rounded-full px-4 py-1">
                {qualification}
                <button
                  onClick={() => handleRemoveQualification(index)}
                  className=" hover:text-red-700 ml-4"
                >
                  ✖︎
                </button>
              </li>
            ))}
          </ul>
          {showQualificationInput ? (
            <QualificationInput onAddQualification={handleAddQualification} />
          ) : (
            <button
              onClick={handleShowQualificationInput}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              資格を追加
            </button>
          )}

          <EditorSelect
            editor={profile.editor}
            onChange={(e) => setProfile({ ...profile, editor: e.target.value })}
          />

          <ExperienceSelect
            toggleModal={toggleExperienceModal}
            selectedExperiences={selectedExperiences}
          />
          <ExperienceModal
            isOpen={isExperienceModalOpen}
            experiences={experienceOptions}
            selectedExperiences={selectedExperiences}
            onSelect={handleSelectExperience}
            onClose={toggleExperienceModal}
          />

          <PortfolioInput
            portfolio={profile.portfolio}
            onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
          />
          <MessageInput
            message={profile.message}
            onChange={(e) => setProfile({ ...profile, message: e.target.value })}
          />

          <GraduateSelect
            graduate={profile.graduate}
            onChange={(e) => setProfile({ ...profile, graduate: e.target.value })}
          />
          <FacultySelect
            faculty={profile.faculty}
            onChange={(e) => setProfile({ ...profile, faculty: e.target.value })}
          />
          <DesireOccupationSelect
            desireOccupation={profile.desiredOccupation}
            onChange={(e) => setProfile({ ...profile, desiredOccupation: e.target.value })}
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
