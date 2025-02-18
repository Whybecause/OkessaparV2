import axios from "axios";
import toast from "react-hot-toast";

import Error from "@/components/ui/error";

export const getError = (error: unknown): string => {
  let errorMessage;

  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Erreur HTTP spécifique (ex: 400, 404, 500)
      errorMessage = error.response.data?.error || "Une erreur est survenue.";
    } else if (error.request) {
      // Problème de réseau (pas de réponse du serveur)
      errorMessage = "Problème de connexion. Veuillez vérifier votre réseau.";
    } else {
      // Erreur de la requête elle-même
      errorMessage = "Une erreur est survenue dans la requête.";
    }
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    // Erreurs non liées à axios
    errorMessage = "Une erreur inconnue est survenue.";
  }

  return errorMessage;
};

// Error handler for client component
export const toastError = (error: unknown) => {
  const errorMessage = getError(error);
  toast.error(errorMessage);
};

// Error handler for front server components
export const handleErrorServer = (error: unknown, message: string) => {
  const errorMessage = getError(error);
  console.error(`${message} : ${errorMessage}`);
  return <Error error={errorMessage} />

};
