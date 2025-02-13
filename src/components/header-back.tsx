import BackButton from "./back-button";

const HeaderBack = ({ title }: { title: string }) => {
  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-center relative sm:gap-4">
        <div className="flex-shrink-0 self-start sm:self-auto">
          <BackButton />
        </div>

        <h1 className="text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl truncate">
          {title}
        </h1>
      </div>
    </div>
  );
};
export default HeaderBack;
