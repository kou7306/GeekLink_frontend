"use client";

import { getUuidFromCookie } from "@/actions/users";
import ShopPageClient from "@/components/rpg/ShopPageClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserCoin {
  coin: string;
}

interface UserItems {
  items: string[];
}

const getUserCoin = async (userId: string): Promise<UserCoin> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rpg/coin/${userId}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
};

const getUserItems = async (userId: string): Promise<UserItems> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rpg/costume/${userId}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
};

export default function Page() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>();
  const [userCoin, setUserCoin] = useState<UserCoin>({ coin: "0" });
  const [userItems, setUserItems] = useState<UserItems>({ items: [] });

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
    const fetchData = async () => {
      if (!userId) return;

      try {
        const [coinData, itemsData] = await Promise.all([
          getUserCoin(userId),
          getUserItems(userId),
        ]);

        setUserCoin(coinData);
        setUserItems(itemsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  if (!userId) {
    return null;
  }

  return (
    <ShopPageClient userId={userId} userCoin={userCoin} userItems={userItems} />
  );
}
