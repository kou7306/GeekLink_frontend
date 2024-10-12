"use client";
import React, { useState } from "react";
import SignOutButton from "@/components/auth/SignOutButton";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ポップアップの状態を管理

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
        <div className="relative">
          <button
            onClick={handleMenuToggle}
            className="flex items-center justify-center bg-primary text-text p-2 rounded-full"
          >
            <FaUser className="text-xl" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-sub_base shadow-lg rounded-lg py-4 z-50">
              <div className="flex flex-col items-center text-center">
                <a
                  href="/my-page"
                  className="block px-6 py-3 my-3 text-sm bg-primary text-black  rounded"
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
