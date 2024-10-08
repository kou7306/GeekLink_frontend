"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/components/profile/options";
import ProfileCard from "@/components/profile/ProfileCard";
import { getUuidFromCookie } from "@/actions/users";
import toast from "react-hot-toast";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import Loading from "@/components/core/Loading";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMe, setIsMe] = useState<boolean>(false);

  const params = useParams();
  const paramUuid = params.uuid as string;

  useEffect(() => {
    const fetchProfile = async () => {
      let userId: string;

      if (paramUuid === "my") {
        const uuid = await getUuidFromCookie();
        if (!uuid) {
          throw new Error("UUID not found in cookie");
        }
        userId = uuid;
        setIsMe(true);
      } else {
        userId = paramUuid;
        setIsMe(false);
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/get-profile/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchProfile();
  }, [paramUuid]);

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
    <div className="min-h-screen bg-gray-100 mt-10">
      {isEditing ? (
        <ProfileEditForm
          user={user}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileCard user={user} isMe={isMe} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default ProfilePage;
