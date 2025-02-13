"use client";
import { ArrowLeftIcon } from "lucide-react";

const BackButton = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      onClick={handleBack}
      className="cursor-pointer group flex items-center justify-center w-10 h-10 rounded-full hover:bg-white transition"
    >
      <ArrowLeftIcon
        className=" group-hover:text-black "
        onClick={handleBack}
      />
    </div>
  );
};

export default BackButton;
