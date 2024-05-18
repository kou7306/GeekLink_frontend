import Chat from "@/components/chat/Chat";

const Page = ({ params }: { params: any }) => {
  return (
    <div className="hidden h-full lg:block lg:pl-80">
      <Chat params={params} />
    </div>
  );
};

export default Page;
