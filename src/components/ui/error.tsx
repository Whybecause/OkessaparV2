import React from "react";
import Container from "./container";

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Container>
    <div className="p-4 text-center">
      <p className="text-red-500">{error}</p>
    </div>
  </Container>
  )
}

export default Error;
