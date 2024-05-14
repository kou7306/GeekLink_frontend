// app/profile-setup/page.tsx
"use client";

import React, { useState } from "react";

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
              {Array.from({ length: 66 }, (_, i) => (
                <option key={i} value={i + 15}>
                  {i + 15}
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
              {[
                "北海道",
                "青森県",
                "岩手県",
                "宮城県",
                "秋田県",
                "山形県",
                "福島県",
                "茨城県",
                "栃木県",
                "群馬県",
                "埼玉県",
                "千葉県",
                "東京都",
                "神奈川県",
                "新潟県",
                "富山県",
                "石川県",
                "福井県",
                "山梨県",
                "長野県",
                "岐阜県",
                "静岡県",
                "愛知県",
                "三重県",
                "滋賀県",
                "京都府",
                "大阪府",
                "兵庫県",
                "奈良県",
                "和歌山県",
                "鳥取県",
                "島根県",
                "岡山県",
                "広島県",
                "山口県",
                "徳島県",
                "香川県",
                "愛媛県",
                "高知県",
                "福岡県",
                "佐賀県",
                "長崎県",
                "熊本県",
                "大分県",
                "宮崎県",
                "鹿児島県",
                "沖縄県",
              ].map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
              <option value="海外">海外</option>
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
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Ruby">Ruby</option>
              <option value="PHP">PHP</option>
              <option value="React">React</option>
              <option value="Angular">Angular</option>
              <option value="Vue.js">Vue.js</option>
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
              <option value="high-school-1">高校生１年生</option>
              <option value="high-school-2">高校生２年生</option>
              <option value="high-school-3">高校生３年生</option>
              <option value="technical-school-1">高専１年生</option>
              <option value="technical-school-2">高専２年生</option>
              <option value="technical-school-3">高専３年生</option>
              <option value="technical-school-4">高専４年生</option>
              <option value="technical-school-5">高専５年生</option>
              <option value="university-1">大学生１年生</option>
              <option value="university-2">大学生２年生</option>
              <option value="university-3">大学生３年生</option>
              <option value="university-4">大学生４年生</option>
              <option value="college-1">専門学校１年生</option>
              <option value="college-2">専門学校２年生</option>
              <option value="it-company">IT企業エンジニア</option>
              <option value="freelance">フリーランスエンジニア</option>
              <option value="other">その他</option>
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
