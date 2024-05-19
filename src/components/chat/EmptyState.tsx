const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-secondary">
      <div className="text-center items-center flex flex-col">
        <h3 className="mt-2 ml-12 text-2xl font-semibold text-text">
          Select a chat to start messaging
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
