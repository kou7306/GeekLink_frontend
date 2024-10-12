"use client";
import SignOutButton from "@/components/auth/SignOutButton";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { getUuidFromCookie } from "@/actions/users";
import axios from "axios";
import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const [image, setImage] = useState("/img/default_icon.png");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchImage = async () => {
      const userId = await getUuidFromCookie();
      if (userId) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/image/`
          );
          if (response.data && response.data !== "") {
            setImage(response.data);
          } else {
            setImage("/img/default_icon.png");
          }
        } catch (error) {
          console.error("Error fetching user image:", error);
          setImage("/img/default_icon.png");
        }
      }
    };
    fetchImage();
  }, []);

  const isActive = (path: string) => pathname === path;

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
        <div className="flex items-center space-x-2">
          <IconButton 
            onClick={handleClick} 
            sx={{ padding: 0 }}  // 余計な余白を排除
          >
            <Image
              src={image}
              alt="User Icon"
              width={40}  // サイズ調整
              height={40} // サイズ調整
              style={{ cursor: 'pointer', borderRadius: '50%' }}  // アイコンを丸くする場合
            />
          </IconButton>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{
            mt: 1,
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link 
              href="/my-page" 
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <FaUser 
                className="mr-2" 
                style={{ fontSize: '20px' }}
              />
              <span style={{ fontSize: '18px' }}>マイページ</span>
            </Link>
          </MenuItem>
          <MenuItem 
            onClick={handleClose} 
            sx={{ justifyContent: 'center' }}
          >
            <SignOutButton />
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
