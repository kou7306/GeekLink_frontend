"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/components/profile/options";
import ProfileCard from "@/components/profile/ProfileCard";
import { getUuidFromCookie } from "@/actions/users";
import toast from "react-hot-toast";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import Loading from "@/components/core/Loading";

const MyPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = await getUuidFromCookie();
      if (userId) {
        try {
          setUuid(userId);
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/get-profile/${userId}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUser: User) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/update-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.status === 200) {
        toast.success("プロフィールを更新しました");
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        toast.error("プロフィールの更新に失敗しました");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("プロフィールの更新に失敗しました");
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="bg-white min-h-screen py-10">
      {isEditing ? (
        <ProfileEditForm
          user={user}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileCard user={user} isMe={true} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default MyPage;
