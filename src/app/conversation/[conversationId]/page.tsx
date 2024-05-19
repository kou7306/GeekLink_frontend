"use client";
import Chat from "@/components/chat/Chat";
import UserList from "@/components/chat/UserList";
import { useSearchParams } from "next/navigation";

const Page = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  return (
    <div className="flex h-full mt-20">
      <UserList />
      {/* <div className="fixed top-18 bg-white p-4 shadow-md w-full z-99 text-2xl">
        {name}
      </div> */}
      <div className="flex-1">
        <Chat params={params} />
      </div>
    </div>
  );
};

export default Page;
