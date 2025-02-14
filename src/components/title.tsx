const Title = ({ title }: { title: string }) => {
  return (
    <>
      <h1 className="w-full py-8 text-center flex justify-center items-center gap-2">
        {title}
      </h1>
    </>
  );
};

export default Title;
