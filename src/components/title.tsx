const Title = ({ title, icon }: { title: string; icon: React.ReactNode }) => {
  return (
    <>
      <h1 className="w-full py-8 text-center flex justify-center items-center gap-2">
        <span aria-hidden="true" className="mt-1">
          {icon}
        </span>
        {title}
      </h1>
    </>
  );
};

export default Title;
