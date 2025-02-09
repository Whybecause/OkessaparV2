import React from "react";

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <>
    <div className="p-4 text-center">
      <p className="text-red-500">{error}</p>
    </div>
  </>
  )
}

export default Error;
