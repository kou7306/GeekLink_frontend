import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FollowUser } from "../profile/options";

type Props = {
  user: FollowUser;
};

const IconField: React.FC<Props> = ({ user }) => {
  // デフォルト画像のパスを指定
  const defaultImage = "/user.svg";
  return (
    <Link href={`/my-page/${user.user_id}`}>
      <div className="flex flex-col items-center m-8 p-4 border rounded-lg shadow-lg w-64 transform transition-transform hover:scale-105 hover:shadow-2xl">
        <div className="relative">
          {/* image が null の場合にデフォルト画像を使用 */}
          <Image
            src={user.image_url || defaultImage}
            alt={user.name}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div className="text-center mt-2 text-lg font-semibold">
          {user.name}
        </div>
      </div>
    </Link>
  );
};

export default IconField;
