import Chat from "@/components/chat/Chat";

const Page = ({ params }: { params: any }) => {
  return (
    <div className="bg-accent">
      <Chat params={params} />
    </div>
  );
};

export default Page;
