// app/my-page/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
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
import { FaGithub, FaTwitter } from "react-icons/fa";

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
    name: "", // 名前
    sex: "", // 性別
    age: 0, // 年齢
    place: "", // 在住
    techs: [], // スキル
    topTechs: [], // トップスキル
    occupation: "", // 職業
    imageUrl: "", // 画像URL
    hobby: "", // 趣味
    editor: "", // エディタ
    affiliation: "", // 所属
    qualification: [], // 資格
    message: "", // メッセージ
    portfolio: "", // ポートフォリオ
    graduate: "", // 卒業年度
    desiredOccupation: "", // 希望職種
    faculty: "", // 学部
    experience: [], // 経験
    githubID: "", // GitHub ID
    twitterID: "", // Twitter ID
    zennID: "", // Zenn ID
    qiitaID: "", // Qiita ID
    atcoderID: "", // AtCoder ID
  });

  const [showGithubInput, setShowGithubInput] = useState(false);
  const [showTwitterInput, setShowTwitterInput] = useState(false);
  const [showZennInput, setShowZennInput] = useState(false);
  const [showQiitaInput, setShowQiitaInput] = useState(false);
  const [showAtCoderInput, setShowAtCoderInput] = useState(false);

  const handleIconClick = (platform: string) => {
    switch (platform) {
      case "github":
        setShowGithubInput(!showGithubInput);
        break;
      case "twitter":
        setShowTwitterInput(!showTwitterInput);
        break;
      case "zenn":
        setShowZennInput(!showZennInput);
        break;
      case "qiita":
        setShowQiitaInput(!showQiitaInput);
        break;
      case "atcoder":
        setShowAtCoderInput(!showAtCoderInput);
        break;
    }
  };

  const handleSnsIDChange = (e: React.ChangeEvent<HTMLInputElement>, platform: string) => {
    const { value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [`${platform}ID`]: value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, platform: string) => {
    if (e.key === "Enter") {
      handleIconClick(platform);
    }
  };

  const handleConfirm = (platform: string) => {
    handleIconClick(platform);
  };

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            userIcon: e.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(event.target.files[0]);
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
        <div className="flex flex-col items-center mb-4">
          <label htmlFor="upload-button">
            <Image
              src={profile.imageUrl}
              alt="Icon"
              width={150}
              height={150}
              className="rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="upload-button"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>
          <div className="flex justify-center space-x-4 mb-4">
            <div onClick={() => handleIconClick("github")}>
              <FaGithub size={30} />
            </div>
            <div onClick={() => handleIconClick("twitter")}>
              <FaTwitter size={30} />
            </div>
            <div onClick={() => handleIconClick("zenn")}>
              <Image src="/zenn-icon.svg" alt="Zenn Icon" width={30} height={30} />
            </div>
            <div onClick={() => handleIconClick("qiita")}>
              <Image src="/qiita-icon.png" alt="Qiita Icon" width={30} height={30} />
            </div>
            <div onClick={() => handleIconClick("atcoder")}>
              <Image src="/atcoder-icon.png" alt="AtCoder Icon" width={30} height={30} />
            </div>
          </div>

          {showGithubInput && (
            <div className="flex items-center mb-2">
              <div className="flex items-center border rounded-md">
                <span className="bg-gray-200 px-4 py-2">https://github.com/</span>
                <input
                  type="text"
                  value={profile.githubID}
                  onChange={(e) => handleSnsIDChange(e, "github")}
                  onKeyDown={(e) => handleKeyPress(e, "github")}
                  className="flex-1 px-4 py-2 border-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleConfirm("github")}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                ◎
              </button>
            </div>
          )}
          {showTwitterInput && (
            <div className="flex items-center mb-2">
              <div className="flex items-center border rounded-md">
                <span className="bg-gray-200 px-4 py-2">https://twitter.com/</span>
                <input
                  type="text"
                  value={profile.twitterID}
                  onChange={(e) => handleSnsIDChange(e, "twitter")}
                  onKeyDown={(e) => handleKeyPress(e, "twitter")}
                  className="flex-1 px-4 py-2 border-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleConfirm("twitter")}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                ◎
              </button>
            </div>
          )}
          {showZennInput && (
            <div className="flex items-center mb-2">
              <div className="flex items-center border rounded-md">
                <span className="bg-gray-200 px-4 py-2">https://zenn.dev/</span>
                <input
                  type="text"
                  value={profile.zennID}
                  onChange={(e) => handleSnsIDChange(e, "zenn")}
                  onKeyDown={(e) => handleKeyPress(e, "zenn")}
                  className="flex-1 px-4 py-2 border-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleConfirm("zenn")}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                ◎
              </button>
            </div>
          )}
          {showQiitaInput && (
            <div className="flex items-center mb-2">
              <div className="flex items-center border rounded-md">
                <span className="bg-gray-200 px-4 py-2">https://qiita.com/</span>
                <input
                  type="text"
                  value={profile.qiitaID}
                  onChange={(e) => handleSnsIDChange(e, "qiita")}
                  onKeyDown={(e) => handleKeyPress(e, "qiita")}
                  className="flex-1 px-4 py-2 border-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleConfirm("qiita")}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                ◎
              </button>
            </div>
          )}
          {showAtCoderInput && (
            <div className="flex items-center mb-2">
              <div className="flex items-center border rounded-md">
                <span className="bg-gray-200 px-4 py-2">https://atcoder.jp/users/</span>
                <input
                  type="text"
                  value={profile.atcoderID}
                  onChange={(e) => handleSnsIDChange(e, "atcoder")}
                  onKeyDown={(e) => handleKeyPress(e, "atcoder")}
                  className="flex-1 px-4 py-2 border-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleConfirm("atcoder")}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                ◎
              </button>
            </div>
          )}

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

          {profile.occupation !== "IT企業エンジニア" &&
            profile.occupation !== "フリーランスエンジニア" &&
            profile.occupation !== "その他" &&
            profile.occupation !== "" && (
              <div className="space-y-8">
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
              </div>
            )}

          <TechSelection
            toggleModal={toggleTechModal}
            openTopTechModal={openTopTechModal}
            topTech={topTech}
            selectedTech={selectedTech}
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

          <PortfolioInput
            portfolio={profile.portfolio}
            onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
          />
          <MessageInput
            message={profile.message}
            onChange={(e) => setProfile({ ...profile, message: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            登録
          </button>
        </div>
      </form>
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
      <ExperienceModal
        isOpen={isExperienceModalOpen}
        experiences={experienceOptions}
        selectedExperiences={selectedExperiences}
        onSelect={handleSelectExperience}
        onClose={toggleExperienceModal}
      />
    </div>
  );
}
