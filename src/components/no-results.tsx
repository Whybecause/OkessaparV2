const NoResults = ({ message = "" }: { message: string }) => {
  return (
    <div className="flex mt-6">
      <div className="max-w-4xl mx-auto flex flex-col bg-gray-900/50 p-8 rounded-md gap-y-4">
        <p className="break-all">{message}</p>
      </div>
    </div>
  );
};

export default NoResults;
