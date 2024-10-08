import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  name: string;
  image: string | null; // image が null の場合に備えて型を変更
  isLiked?: boolean;
  sex: string;
  place: string;
  topTech: string;
};

const IconField: React.FC<Props> = ({
  id,
  name,
  image,
  isLiked = false,
  sex,
  place,
  topTech,
}) => {
  // デフォルト画像のパスを指定
  const defaultImage = "/img/default_icon.png"; // public フォルダに配置されたデフォルト画像

  return (
    <Link href={`/my-page/${id}`}>
      <div className="flex flex-col items-center m-8 p-4 border rounded-lg shadow-lg w-64 transform transition-transform hover:scale-105 hover:shadow-2xl">
        <div className="relative">
          {/* image が null の場合にデフォルト画像を使用 */}
          <Image
            src={image || defaultImage}
            alt={name}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full"
          />
          <button className="absolute top-0 right-0 mt-1 mr-1 bg-white rounded-full p-1">
            <svg
              className={`w-4 h-4 ${
                isLiked ? "text-red-500" : "text-gray-500"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
          </button>
        </div>
        <div className="text-center mt-2 text-lg font-semibold">{name}</div>
        <div className="text-center text-sm text-gray-600">{sex}</div>
        <div className="text-center text-sm text-gray-600">{place}</div>
        <div className="text-center mt-1 text-sm text-blue-500">{topTech}</div>
      </div>
    </Link>
  );
};

export default IconField;
