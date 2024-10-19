"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ages,
  places,
  technologies,
  occupations,
  User,
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
import toast from "react-hot-toast";
import { getUuidFromCookie } from "@/actions/users";
import { UploadImage } from "@/app/image/UploadImage";

interface ProfileEditFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [profile, setProfile] = useState<User>(user);
  const [selectedTech, setSelectedTech] = useState<string[]>(profile.teches);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(
    profile.experience ? profile.experience : []
  );
  const [qualifications, setQualifications] = useState<string[]>(
    profile.qualification ? profile.qualification : []
  );
  const [top_teches, setTopTech] = useState<string[]>(profile.top_teches);

  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isTopTecnologyModalOpen, setIsTopTecnologyModalOpen] = useState(false);
  const [showQualificationInput, setShowQualificationInput] =
    useState<boolean>(false);
  const [showGithubInput, setShowGithubInput] = useState(false);
  const [showTwitterInput, setShowTwitterInput] = useState(false);
  const [showZennInput, setShowZennInput] = useState(false);
  const [showQiitaInput, setShowQiitaInput] = useState(false);
  const [showAtCoderInput, setShowAtCoderInput] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const uuid = await getUuidFromCookie();
      if (uuid) {
        setProfile((prev) => {
          const updatedProfile = { ...prev, user_id: uuid };
          return updatedProfile;
        });
      }
    };

    fetchUsers();
  }, []);

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

  const handleSnsIDChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    platform: string
  ) => {
    const { value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [`${platform}`]: value,
    }));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    platform: string
  ) => {
    if (e.key === "Enter") {
      handleIconClick(platform);
    }
  };

  const handleConfirm = (platform: string) => {
    handleIconClick(platform);
  };

  const toggleTechModal = () => setIsTechModalOpen(!isTechModalOpen);
  const toggleExperienceModal = () =>
    setIsExperienceModalOpen(!isExperienceModalOpen);

  const openTopTechModal = () => {
    setIsTechModalOpen(false);
    setIsTopTecnologyModalOpen(true);
  };
  const closeTopTechModal = () => setIsTopTecnologyModalOpen(false);

  const handleSelectTech = (tech: string) => {
    setSelectedTech((prevSelectedTech) => {
      const isAlreadySelected = prevSelectedTech.includes(tech);
      if (isAlreadySelected) {
        setTopTech((prevTopTeches) => prevTopTeches.filter((t) => t !== tech));
        return prevSelectedTech.filter((t) => t !== tech);
      } else {
        return [...prevSelectedTech, tech];
      }
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

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    e.preventDefault();
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

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       if (e.target?.result) {
  //         setProfile((prevProfile) => ({
  //           ...prevProfile,
  //           userIcon: e.target?.result as string,
  //         }));
  //       }
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile = {
      ...profile,
      top_tech: top_teches[0],
      teches: selectedTech,
      experience: selectedExperiences,
      qualification: qualifications,
      top_teches: top_teches,
    };

    onSave(updatedProfile);
  };

  const [file, setFile] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleUpload = async () => {
    console.log("Uploading image...");
    try {
      const url = await UploadImage(file);
      console.log("Uploaded image URL: ", url);
      // setUploadedUrl(url);
      setProfile((prevProfile) => ({
        ...prevProfile,
        image_url: `https://vettovaznwdhefdeeglu.supabase.co/storage/v1/object/public/UserImage/${url}`,
      }));
      console.log("test test test");
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div className="min-h-screen my- flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-12 text-text">プロフィール設定</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl p-16 bg-sub_base shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="flex flex-col items-center col-span-1 p-12">
          <label htmlFor="upload-button">
            <Image
              src={profile.image_url || "/user.svg"}
              alt="Icon"
              width={128}
              height={128}
              className="rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            onClick={handleUpload}
            className="mt-4 bg-secondary hover:bg-hover_blue text-white py-2 px-4 rounded"
          >
            Upload
          </button>
          {/* <div className="flex space-x-4 mt-4">
            <div onClick={() => handleIconClick("github")}>
              <FaGithub size={30} />
            </div>
            <div onClick={() => handleIconClick("twitter")}>
              <FaTwitter size={30} />
            </div>
            <div onClick={() => handleIconClick("zenn")}>
              <Image
                src="/zenn-icon.svg"
                alt="Zenn Icon"
                width={30}
                height={30}
              />
            </div>
            <div onClick={() => handleIconClick("qiita")}>
              <Image
                src="/qiita-icon.png"
                alt="Qiita Icon"
                width={30}
                height={30}
              />
            </div>
            <div onClick={() => handleIconClick("atcoder")}>
              <Image
                src="/atcoder-icon.png"
                alt="AtCoder Icon"
                width={30}
                height={30}
              />
            </div>
          </div> */}
          {showGithubInput && (
            <div className="flex items-center mt-4">
              <div className="flex items-center border rounded-md">
                <span className="bg-gray-200 px-4 py-2">
                  https://github.com/
                </span>
                <input
                  type="text"
                  value={profile.github}
                  onChange={(e) => handleSnsIDChange(e, "github")}
                  onKeyDown={(e) => handleKeyPress(e, "github")}
                  className="flex-1 px-4 py-2 border-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleConfirm("github")}
                className="ml-2 px-4 py-2 bg-gray-600 hover:bg-gray-800 text-white rounded-md"
              >
                ◎
              </button>
            </div>
          )}
          {showTwitterInput && (
            <div className="flex items-center mt-4">
              <div className="flex items-center border rounded-md">
                <span className="bg-gray-200 px-4 py-2">https://x.com/</span>
                <input
                  type="text"
                  value={profile.twitter}
                  onChange={(e) => handleSnsIDChange(e, "twitter")}
                  onKeyDown={(e) => handleKeyPress(e, "twitter")}
                  className="flex-1 px-4 py-2 border-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleConfirm("twitter")}
                className="ml-2 px-4 py-2 bg-gray-600 hover:bg-gray-800 text-white rounded-md"
              >
                ◎
              </button>
            </div>
          )}
          {showZennInput && (
            <div className="flex items-center mt-4">
              <div className="flex items-center border rounded-md">
                <span className="bg-gray-200 px-4 py-2">https://zenn.dev/</span>
                <input
                  type="text"
                  value={profile.zenn}
                  onChange={(e) => handleSnsIDChange(e, "zenn")}
                  onKeyDown={(e) => handleKeyPress(e, "zenn")}
                  className="flex-1 px-4 py-2 border-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleConfirm("zenn")}
                className="ml-2 px-4 py-2 bg-gray-600 hover:bg-gray-800 text-white rounded-md"
              >
                ◎
              </button>
            </div>
          )}
          {showQiitaInput && (
            <div className="flex items-center mt-4">
              <div className="flex items-center border rounded-md">
                <span className="bg-gray-200 px-4 py-2">
                  https://qiita.com/
                </span>
                <input
                  type="text"
                  value={profile.qiita}
                  onChange={(e) => handleSnsIDChange(e, "qiita")}
                  onKeyDown={(e) => handleKeyPress(e, "qiita")}
                  className="flex-1 px-4 py-2 border-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleConfirm("qiita")}
                className="ml-2 px-4 py-2 bg-gray-600 hover:bg-gray-800 text-white rounded-md"
              >
                ◎
              </button>
            </div>
          )}
          {showAtCoderInput && (
            <div className="flex items-center mt-4">
              <div className="flex items-center border rounded-md">
                <span className="bg-gray-200 px-4 py-2">
                  https://atcoder.jp/users/
                </span>
                <input
                  type="text"
                  value={profile.atcoder}
                  onChange={(e) => handleSnsIDChange(e, "atcoder")}
                  onKeyDown={(e) => handleKeyPress(e, "atcoder")}
                  className="flex-1 px-4 py-2 border-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleConfirm("atcoder")}
                className="ml-2 px-4 py-2 bg-gray-600 hover:bg-gray-800 text-white rounded-md"
              >
                ◎
              </button>
            </div>
          )}
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <NameInput
              name={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <SexSelect sex={profile.sex} onChange={handleChange} />
            <AgeSelect age={profile.age} onChange={handleChange} ages={ages} />
            <PlaceSelect
              place={profile.place}
              onChange={handleChange}
              places={places}
            />
            <OccupationSelect
              occupation={profile.occupation}
              onChange={handleChange}
              occupations={occupations}
            />
            {profile.occupation !== "IT企業エンジニア" &&
              profile.occupation !== "フリーランスエンジニア" &&
              profile.occupation !== "その他" &&
              profile.occupation !== "" && (
                <>
                  <GraduateSelect
                    graduate={profile.graduate}
                    onChange={(e) =>
                      setProfile({ ...profile, graduate: e.target.value })
                    }
                  />
                  <FacultySelect
                    faculty={profile.faculty}
                    onChange={(e) =>
                      setProfile({ ...profile, faculty: e.target.value })
                    }
                  />
                  <DesireOccupationSelect
                    desire_occupation={profile.desired_occupation}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        desired_occupation: e.target.value,
                      })
                    }
                  />
                </>
              )}
            <HobbyInput
              hobby={profile.hobby}
              onChange={(e) =>
                setProfile({ ...profile, hobby: e.target.value })
              }
            />
            <AffiliationInput
              affiliation={profile.affiliation}
              onChange={(e) =>
                setProfile({ ...profile, affiliation: e.target.value })
              }
            />
            <EditorSelect
              editor={profile.editor}
              onChange={(e) =>
                setProfile({ ...profile, editor: e.target.value })
              }
            />
            <PortfolioInput
              portfolio={profile.portfolio}
              onChange={(e) =>
                setProfile({ ...profile, portfolio: e.target.value })
              }
            />
            <MessageInput
              message={profile.message}
              onChange={(e) =>
                setProfile({ ...profile, message: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={toggleTechModal}
                className="bg-gray-600 hover:bg-gray-800 text-white py-2 px-4 rounded-md"
              >
                技術を選択
              </button>
              <button
                type="button"
                onClick={openTopTechModal}
                className="bg-gray-600 hover:bg-gray-800 text-white py-2 px-4 rounded-md"
              >
                Top 3を選択
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {top_teches.map((tech, index) => (
                <span
                  key={index}
                  className="bg-primary text-white rounded-full px-4 py-1"
                >
                  {index + 1}位. {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTech.map((tech, index) => (
                <span
                  key={index}
                  className="bg-primary text-white rounded-full px-4 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleExperienceModal}
              className="bg-gray-600 hover:bg-gray-800 text-white py-2 px-4 rounded-md"
            >
              経験を複数選択
            </button>
            <div className="flex flex-wrap gap-2">
              {selectedExperiences.map((experience, index) => (
                <span
                  key={index}
                  className="bg-primary text-white rounded-full px-4 py-1"
                >
                  {experience}
                </span>
              ))}
            </div>
            {showQualificationInput ? (
              <QualificationInput onAddQualification={handleAddQualification} />
            ) : (
              <button
                type="button"
                onClick={handleShowQualificationInput}
                className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                資格を追加
              </button>
            )}
            <ul className="flex gap-2 flex-wrap mb-4">
              {qualifications.map((qualification, index) => (
                <li
                  key={index}
                  className="bg-primary text-white rounded-full px-4 py-1"
                >
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
          </div>
        </div>
        <div className="col-span-3 flex justify-center mt-6 space-x-4">
          <button
            type="submit"
            className="bg-secondary hover:bg-hover_blue text-white font-bold py-2 px-4 rounded"
          >
            登録
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            キャンセル
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
        top_teches={top_teches}
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
};

export default ProfileEditForm;
