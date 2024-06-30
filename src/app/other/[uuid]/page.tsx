"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import ProfileCard from "@/components/profile/ProfileCard";
import { User } from "@/components/profile/options";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  const uuid = params.uuid;

  useEffect(() => {
    if (uuid) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/profile/get-profile/${uuid}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [uuid]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <ProfileCard user={user} isMe={false} />
    </div>
  );
};

export default UserProfile;
