"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import ProfileCard from "@/components/profile/ProfileCard";
import { User } from "@/components/profile/options";
import Loading from "@/components/core/Loading";
import { getUuidFromCookie } from "@/actions/users";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  const uuid = params.uuid;
  const router = useRouter();

  useEffect(() => {
    const checkAndRedirect = async () => {
      const cookieUuid = await getUuidFromCookie();
      if (uuid === cookieUuid) {
        router.push("/my-page");
      } else if (uuid) {
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/profile/get-profile/${uuid}`)
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    };

    checkAndRedirect();
  }, [uuid, router]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <ProfileCard user={user} isMe={false} />
    </div>
  );
};

export default UserProfile;
