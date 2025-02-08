"use client";
import { ArrowLeftIcon } from "lucide-react";

const BackButton = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <ArrowLeftIcon className="hover:cursor-pointer" onClick={handleBack} />
  );
};

export default BackButton;
