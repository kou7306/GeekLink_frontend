import CreateEventForm from "@/components/team-recruitments/CreateEventForm";

export default function CreateEventPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">新しいイベントを作成</h1>
      <CreateEventForm />
    </div>
  );
}
