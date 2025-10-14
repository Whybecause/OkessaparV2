const Title = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="py-12 text-center flex flex-col justify-center items-center">
      <h1 className="z-10 w-full ">{title}</h1>
      {description && <p className="text-md text-gray-500">{description}</p>}
    </div>
  );
};

export default Title;
