import axios from 'axios';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import Error from "@/components/ui/error";


// Error handler for client component
export const handleErrorClient = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      // Erreur HTTP spécifique (ex: 400, 404, 500)
      const errorMessage = error.response.data?.error || "Une erreur est survenue.";
      toast.error(errorMessage);
    } else if (error.request) {
      // Problème de réseau (pas de réponse du serveur)
      toast.error("Problème de connexion. Veuillez vérifier votre réseau.");
    } else {
      // Erreur de la requête elle-même
      toast.error("Une erreur est survenue dans la requête.");
    }
  }
  else if (typeof error === "string") {
    toast.error(error);
  }
  else {
    // Erreurs non liées à axios
    toast.error("Une erreur inconnue est survenue.");
  }
};

// Error handler for front server components
export const handleErrorServer = (error: unknown, message: string) => {
  if (axios.isAxiosError(error)) {
    console.error(message, error?.response?.data?.error);
    return <Error error={error?.response?.data?.error} />;
  } else {
    console.error("Unexpected error:", error);
    return <Error error={"Une erreur inattendue est survenue"} />;
  }
};
