import React from "react";
import InfoCard from "./info-card";
import Error from "./ui/error";
import Spinner from "./ui/spinner";

interface AsyncDataProps<T> {
  data?: T[];
  isLoading: boolean;
  error?: string | null;
  noResultMessage: string;
  children: React.ReactNode;
}

const AsyncData = <T,>({
  data,
  isLoading,
  error,
  noResultMessage,
  children,
} : AsyncDataProps<T>) => {
  if (isLoading) {
    return <Spinner />;
  } else if (error) {
    return <Error error={error} />;
  } else if (!data || data?.length === 0) {
    return <InfoCard message={noResultMessage} />;
  } else {
    return <>{children}</>;
  }
};

export default AsyncData;
