"use client";
import SignOutButton from "@/components/auth/SignOutButton";
import { usePathname } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <a href="/" className="flex items-center">
            <span className="text-primary">GeekLink</span>
          </a>
        </div>
        <nav className="flex space-x-6">
          <a
            href="/conversation"
            className={`text-black hover:text-primary ${
              isActive("/conversation") ? "text-primary" : ""
            }`}
          >
            メッセージ
          </a>
          <a
            href="/group-list"
            className={`text-black hover:text-primary ${
              isActive("/group-list") ? "text-primary" : ""
            }`}
          >
            グループ
          </a>
          <a
            href="/team-recruitments"
            className={`text-black hover:text-primary ${
              isActive("/team-recruitments") ? "text-primary" : ""
            }`}
          >
            イベント
          </a>
          <a
            href="/ranking"
            className={`text-black hover:text-primary ${
              isActive("/ranking") ? "text-primary" : ""
            }`}
          >
            ランキング
          </a>
          <a
            href="/suggest-users"
            className={`text-black hover:text-primary ${
              isActive("/suggest-users") ? "text-primary" : ""
            }`}
          >
            おすすめユーザー

          </a>
        </nav>
        <div className="flex space-x-1 hover:text-primary">
          <a
            href="/my-page"
            className={`text-black hover:text-primary flex items-center bg-secondary text-black py-2 px-4 rounded ${
              isActive("/my-page") ? "text-primary" : ""
            }`}
          >
            <FaUser className="mr-2 " />
            マイページ
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
