"use client";

import { getUuidFromCookie } from "@/actions/users";
import ChangeAvatarPage from "@/components/rpg/ChangeAvatarPage";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

interface AvatarData {
  current_avatar: string;
}

interface ItemsData {
  items: string[];
}

const getCurrentAvatar = async (userId: string): Promise<AvatarData> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avatar/${userId}`, {
    cache: "no-store",
  });
  return response.json();
};

const getUserItems = async (userId: string): Promise<ItemsData> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rpg/item/${userId}`, {
    cache: "no-store",
  });
  return response.json();
};

export default function Page() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>();
  const [currentAvatarData, setCurrentAvatarData] = useState<AvatarData>({ current_avatar: "" });
  const [userItemsData, setUserItemsData] = useState<ItemsData>({ items: [] });

  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      const [avatarData, itemsData] = await Promise.all([
        getCurrentAvatar(userId),
        getUserItems(userId),
      ]);
      setCurrentAvatarData(avatarData);
      setUserItemsData(itemsData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId]);

  useEffect(() => {
    const fetchUuid = async () => {
      const uuid = await getUuidFromCookie();
      if (!uuid) {
        router.push("/login");
        return;
      }
      setUserId(uuid);
    };
    fetchUuid();
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (!userId) {
    return null;
  }

  return (
    <ChangeAvatarPage
      userId={userId}
      currentAvatarData={currentAvatarData}
      userItemsData={userItemsData}
      onAvatarUpdate={fetchData}
    />
  );
}
