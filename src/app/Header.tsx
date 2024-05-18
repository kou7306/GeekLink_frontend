import React from "react";
import { FaHeart, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-99">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <a href="/" className="flex items-center">
            <span className="text-accent">GeekLink</span>
          </a>
        </div>
        <nav className="flex space-x-6">
          <a href="/login" className="text-black hover:text-accent">
            ログイン
          </a>
          <a href="/sign-up" className="text-black hover:text-accent">
            サインアップ
          </a>
          <a href="/conversation" className="text-black hover:text-accent">
            メッセージ
          </a>
          <a href="/random-match" className="text-black hover:text-accent">
            ランダムマッチ
          </a>
        </nav>
        <div className="flex space-x-1">
          <a
            href="/my-page"
            className="text-black hover:text-gray-700 flex items-center hover:text-accent"
          >
            <FaUser className="mr-1 hover:text-accent" />
            マイページ
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
