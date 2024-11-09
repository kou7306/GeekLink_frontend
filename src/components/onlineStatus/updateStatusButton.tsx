"use client";
import React, { useState, useEffect } from "react";
import { getUuidFromCookie } from "@/actions/users";
import { User } from "@/types/user";

const UpdateStatusButton: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [uuid, setUuid] = useState<string | null>(null);
  const [data, setData] = useState(""); // 意気込みの入力データ
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showMotivationPopup, setShowMotivationPopup] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = await getUuidFromCookie();
      if (userId) {
        try {
          setUuid(userId);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/get-profile/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchProfile();
  }, []);

  const updateStatus = async (motivation?: string) => {
    if (uuid) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/update-work-status`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uuid, motivation }),
          }
        );
        if (response.ok) {
          if (!user?.online) {
            alert("作業を開始しました");
          } else {
            alert("作業を終了しました");
          }
          setUser(
            (prevUser) => prevUser && { ...prevUser, online: !prevUser.online }
          );
        } else {
          setResponseMessage("ステータス更新に失敗しました");
        }
      } catch (error) {
        console.error("Error updating status:", error);
        setResponseMessage("エラーが発生しました");
      }
    }
  };

  const handleStartClick = () => {
    setShowMotivationPopup(true);
  };

  const handleEndClick = () => {
    setShowConfirmationPopup(true);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {user?.online ? (
        <button
          onClick={handleEndClick}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          作業を終了
        </button>
      ) : (
        <button
          onClick={handleStartClick}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          作業を開始
        </button>
      )}

      {showMotivationPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-sub_base p-6 rounded-lg shadow-lg space-y-4">
            <h3 className="text-lg font-semibold">
              意気込みを入力してください
            </h3>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="意気込みを入力"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary text-black"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  if (data.trim()) {
                    updateStatus(data);
                    setShowMotivationPopup(false);
                  } else {
                    alert("意気込みを入力してください");
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary"
              >
                開始する
              </button>
              <button
                onClick={() => setShowMotivationPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmationPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-sub_base p-6 rounded-lg shadow-lg space-y-4">
            <p className="text-lg">本当に終了しますか？</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  updateStatus();
                  setShowConfirmationPopup(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                はい
              </button>
              <button
                onClick={() => setShowConfirmationPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}

      {responseMessage && (
        <p className="mt-4 text-center text-lg font-semibold text-gray-700">
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default UpdateStatusButton;
