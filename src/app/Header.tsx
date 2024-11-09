"use client";
import React, { useState, useEffect } from "react";
import SignOutButton from "@/components/auth/SignOutButton";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { getUuidFromCookie } from "@/actions/users";
import { User } from "@/types/user";
import UpdateStatusButton from "@/components/onlineStatus/updateStatusButton";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ポップアップの状態を管理
  const [user, setUser] = useState<User | null>(null);
  const [uuid, setUuid] = useState<string | null>(null);

  // ユーザーのプロフィールを取得
  useEffect(() => {
    const fetchProfile = async () => {
      const userId = await getUuidFromCookie();
      if (userId) {
        try {
          setUuid(userId);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/get-profile/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchProfile();
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev); // メニューの表示/非表示をトグル
  };

  return (
    <header className="bg-sub_base shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <a href="/" className="flex items-center">
            <span className="text-primary">GeekLink</span>
          </a>
        </div>
        <nav className="flex space-x-6">
          <a
            href="/conversation"
            className={`text-text hover:text-primary ${
              isActive("/conversation") ? "text-primary" : ""
            }`}
          >
            メッセージ
          </a>
          <a
            href="/group-list"
            className={`text-text hover:text-primary ${
              isActive("/group-list") ? "text-primary" : ""
            }`}
          >
            グループ
          </a>
          <a
            href="/team-recruitments"
            className={`text-text hover:text-primary ${
              isActive("/team-recruitments") ? "text-primary" : ""
            }`}
          >
            イベント
          </a>
          <a
            href="/ranking"
            className={`text-text hover:text-primary ${
              isActive("/ranking") ? "text-primary" : ""
            }`}
          >
            ランキング
          </a>
          <a
            href="/suggest-users"
            className={`text-text hover:text-primary ${
              isActive("/suggest-users") ? "text-primary" : ""
            }`}
          >
            おすすめユーザー
          </a>
        </nav>
        <div className="relative flex items-center space-x-4">
          {" "}
          {/* アイコンとボタンを横並びにする */}
          <button
            onClick={handleMenuToggle}
            className="flex items-center justify-center bg-primary text-text p-2 rounded-full"
          >
            <FaUser className="text-xl" />
          </button>
          <UpdateStatusButton />
          {isMenuOpen && (
            <div className="absolute right-0 top-14 mt-2 w-48 bg-sub_base shadow-lg rounded-lg py-4 z-50">
              <div className="flex flex-col items-center text-center">
                <a
                  href="/my-page"
                  className="block px-8 py-3 my-3 text-sm bg-primary text-black rounded"
                >
                  マイページ
                </a>
                <SignOutButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
