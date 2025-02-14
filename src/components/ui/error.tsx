import React from "react";
import MotionDiv from "../motion-div";

interface ErrorProps {
  error: string | null;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <MotionDiv className="flex mt-6">
      <div className="max-w-4xl mx-auto flex flex-col bg-gray-900/50 p-8 rounded-md gap-y-4">
        <p className="text-red-500">{error}</p>
      </div>
    </MotionDiv>
  );
};

export default Error;
