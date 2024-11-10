"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { getUuidFromCookie } from "@/actions/users";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [uuid, setUuid] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUuid = async () => {
      const fetchedUuid = await getUuidFromCookie();
      setUuid(fetchedUuid);
    };
    fetchUuid();
  }, []); // 依存配列を空にすることで、useEffectは初回レンダリング時のみ実行される

  useEffect(() => {
    const code = searchParams.get("code");
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    if (code) {
      axios
        .post(api_url + "/qiita/callback", { uuid, code })
        .then((response) => {
          router.push("/"); // 認証成功後にホームに戻る
        })
        .catch((error) => {
          console.error("Error saving token:", error);
        });
    }
  }, [searchParams]);

  return <div>Processing Qiita Authentication...</div>;
}
