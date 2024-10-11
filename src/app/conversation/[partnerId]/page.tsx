"use client";
import Chat from "@/components/chat/Chat";
import UserList from "@/components/chat/UserList";

const Page = ({ params }: { params: any }) => {
  return (
    <div className="hidden h-full lg:block lg:pl-96">
      <UserList />
      <Chat params={params} />
    </div>
  );
};

export default Page;
