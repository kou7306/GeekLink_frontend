import SignOutButton from "@/components/auth/SignOutButton";
import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <a href="/" className="flex items-center">
            <span className="text-primary">GeekLink</span>
          </a>
        </div>
        <nav className="flex space-x-6">
          <a href="/conversation" className="text-black hover:text-primary">
            メッセージ
          </a>
          <a href="/group-list" className="text-black hover:text-primary">
            グループ
          </a>
          <a href="/suggest-users" className="text-black hover:text-primary">
            おすすめユーザー
          </a>
          <a href="/like" className="text-black hover:text-primary">
            いいね
          </a>
        </nav>
        <div className="flex space-x-1 hover:text-primary">
          <a
            href="/my-page"
            className="text-black hover:text-primary flex items-center bg-secondary text-black py-2 px-4 rounded"
          >
            <FaUser className="mr-2 " />
            マイページ
          </a>
          <div className="ml-8">
            <SignOutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
