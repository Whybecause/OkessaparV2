import Error from "@/components/ui/error";
import axios from 'axios';

// Error handler for server components
export const handleErrorServer = (error: unknown, message: string) => {
  if (axios.isAxiosError(error)) {
    console.error(message, error?.response?.data?.error);
    return <Error error={error?.response?.data?.error} />;
  } else {
    console.error("Unexpected error:", error);
    return <Error error={"Une erreur inattendue est survenue"} />;
  }
};
