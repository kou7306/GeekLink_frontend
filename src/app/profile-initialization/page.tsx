// app/profile-initialization/page.tsx
"use client";

import React, { useState } from "react";
import { ages, residences, technologies, jobTitles } from "./options";

interface ProfileForm {
  name: string;
  gender: string;
  age: number;
  residence: string;
  technology: string;
  jobTitle: string;
}

export default function ProfileSetup() {
  const [profile, setProfile] = useState<ProfileForm>({
    name: "",
    gender: "",
    age: 0,
    residence: "",
    technology: "",
    jobTitle: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === "age" ? parseInt(value, 10) : value;
    setProfile((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile Data:", profile);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">プロフィール初期設定</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white shadow-xl rounded-lg">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="p-2 block mt-1 w-full border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              性別
            </label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="mt-1 block w-full"
            >
              <option value="">選択してください</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              年齢
            </label>
            <select name="age" value={profile.age} onChange={handleChange} className="mt-1 block w-full">
              <option value="">選択してください</option>
              {ages.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="residence" className="block text-sm font-medium text-gray-700">
              在住
            </label>
            <select
              name="residence"
              value={profile.residence}
              onChange={handleChange}
              className="mt-1 block w-full"
            >
              <option value="">選択してください</option>
              {residences.map((residence) => (
                <option key={residence} value={residence}>
                  {residence}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="technology" className="block text-sm font-medium text-gray-700">
              技術
            </label>
            <select
              name="technology"
              value={profile.technology}
              onChange={handleChange}
              className="mt-1 block w-full"
            >
              <option value="">選択してください</option>
              {technologies.map((technology) => (
                <option key={technology} value={technology}>
                  {technology}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
              職種
            </label>
            <select
              name="jobTitle"
              value={profile.jobTitle}
              onChange={handleChange}
              className="mt-1 block w-full"
            >
              <option value="">選択してください</option>
              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
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
