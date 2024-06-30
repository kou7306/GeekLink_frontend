"use client";
import React from "react";
import { User } from "./options";
import Image from "next/image";
import { FaGithub, FaTwitter } from "react-icons/fa";

interface ProfileCardProps {
  user: User;
  isMe: boolean;
  onEdit?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isMe, onEdit }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg grid grid-cols-3 gap-6">
      <div className="flex flex-col items-center">
        <Image
          className="w-64 h-64 object-cover rounded-full mb-4"
          src={user.image_url || "/default-profile.png"}
          alt={user.name}
          width={256}
          height={256}
        />
        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
        <div className="flex space-x-4">
          {user.github && (
            <a href={`https://github.com/${user.github}`} className="text-black" aria-label="GitHub">
              <FaGithub size={30} />
            </a>
          )}
          {user.twitter && (
            <a href={`https://x.com/${user.twitter}`} className="text-blue-400" aria-label="Twitter">
              <FaTwitter size={30} />
            </a>
          )}
          {user.zenn && (
            <a href={`https://zenn.dev/${user.zenn}`} className="text-blue-600" aria-label="Zenn">
              <Image src="/zenn-icon.svg" alt="Zenn" width={30} height={30} />
            </a>
          )}
          {user.qiita && (
            <a href={`https://qiita.com/${user.qiita}`} className="text-green-500" aria-label="Qiita">
              <Image src="/qiita-icon.png" alt="Qiita" width={30} height={30} />
            </a>
          )}
          {user.atcoder && (
            <a
              href={`https://atcoder.jp/users/${user.atcoder}`}
              className="text-purple-500"
              aria-label="AtCoder"
            >
              <Image src="/atcoder-icon.png" alt="AtCoder" width={30} height={30} />
            </a>
          )}
        </div>
        {isMe && (
          <button onClick={onEdit} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            編集
          </button>
        )}
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-gray-600">
              <strong>職業:</strong> {user.occupation}
            </p>
            <p className="text-gray-600">
              <strong>場所:</strong> {user.place}
            </p>
            <p className="text-gray-600">
              <strong>性別:</strong> {user.sex}
            </p>
            <p className="text-gray-600">
              <strong>年齢:</strong> {user.age}
            </p>
          </div>
          {user.affiliation && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-gray-600">
                <strong>所属:</strong> {user.affiliation}
              </p>
            </div>
          )}
          {user.faculty && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-gray-600">
                <strong>学部:</strong> {user.faculty}
              </p>
            </div>
          )}
          {user.graduate && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-gray-600">
                <strong>卒業見込み:</strong> {user.graduate}
              </p>
            </div>
          )}
          {user.portfolio && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-gray-600">
                <strong>ポートフォリオ:</strong>{" "}
                <a href={user.portfolio} className="text-blue-500">
                  {user.portfolio}
                </a>
              </p>
            </div>
          )}
          {user.desired_occupation && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-gray-600">
                <strong>目指している職種:</strong> {user.desired_occupation}
              </p>
            </div>
          )}
          {user.experience && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">経験</h3>
              <ul className="list-disc list-inside">
                {user.experience.map((exp, index) => (
                  <li key={index} className="text-gray-700">
                    {exp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">TOP3</h3>
            <ul className="list-disc list-inside">
              {user.top_teches.map((tech, index) => (
                <li key={index} className="text-gray-700">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">技術スタック</h3>
            <ul className="list-disc list-inside">
              {user.teches.map((tech, index) => (
                <li key={index} className="text-gray-700">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          {user.hobby && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">趣味</h3>
              <p className="text-gray-700">{user.hobby}</p>
            </div>
          )}
          {user.editor && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">好きなエディター</h3>
              <p className="text-gray-700">{user.editor}</p>
            </div>
          )}
          {user.qualification && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">資格</h3>
              <ul className="list-disc list-inside">
                {user.qualification.map((qual, index) => (
                  <li key={index} className="text-gray-700">
                    {qual}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {user.message && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">一言</h3>
              <p className="text-gray-700">{user.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
