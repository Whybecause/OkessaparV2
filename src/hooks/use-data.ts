import { useEffect, useState } from "react"
import axios from "axios";

export const useData = <T,>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        if (response.status !== 200 || response.data?.error) {
          setError(`Error (${response.data.status}): ${response.data?.error}` || `Erreur serveur (${response.data.status})`);
          return;
        }

        const results = Array.isArray(response.data) ? response.data : [response.data];

        setData(results as T[]);
      } catch (error: unknown) {
        console.error("Erreur lors de l'appel API :", error);

        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(`Error (${error.status}): ${error.response.data?.error}` || `Erreur serveur (${error.response.status})`);
          } else if (error.request) {
            setError("Problème de connexion. Veuillez vérifier votre réseau.");
          }
          else {
            setError("Une erreur inattendue est survenue.");
          }
        } else {
          setError("Une erreur inattendue est survenue.")
        }
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, isLoading, error }
}
