import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
};

export const handleError = (error: unknown) => {
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
  } else {
    // Erreurs non liées à axios
    toast.error("Une erreur inconnue est survenue.");
  }
};
