"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { getUuidFromCookie } from "@/actions/users";

export default function GithubCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [uuid, setUuid] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUuid = async () => {
      const fetchedUuid = await getUuidFromCookie();
      setUuid(fetchedUuid);
    };
    fetchUuid();
  }, []);

  useEffect(() => {
    const code = searchParams.get("code");
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    if (code && uuid) {
      axios
        .post(`${api_url}/github/callback`, { uuid, code })
        .then((response) => {
          router.push("/");
        })
        .catch((error) => {
          console.error("Error saving GitHub token:", error);
        });
    }
  }, [searchParams, uuid]);

  return <div>Processing GitHub Authentication...</div>;
}
