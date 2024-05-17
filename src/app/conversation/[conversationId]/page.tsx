import Chat from "@/components/chat/Chat";

const Page = ({ params }: { params: any }) => {
  return (
    <div>
      <Chat params={params} />
    </div>
  );
};

export default Page;
