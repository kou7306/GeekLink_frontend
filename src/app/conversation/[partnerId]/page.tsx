"use client";
import Chat from "@/components/chat/Chat";
import { useSearchParams } from "next/navigation";
import UserList from "@/components/chat/UserList";

const Page = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  return (
    <div className="hidden h-full lg:block lg:pl-96">
      {/* <div className="fixed top-18 bg-white p-4 shadow-md w-full z-99 text-2xl">
        {name}
      </div> */}
      <UserList />
      <Chat params={params} />
    </div>
  );
};

export default Page;
