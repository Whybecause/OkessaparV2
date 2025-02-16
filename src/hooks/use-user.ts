import { useEffect, useState } from "react";
import axios from "axios";

// Check if user auth (for client side components)
export const useUser = () => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/is-valid-session");
        setUser(response.data || false);
      } catch (error) {
        console.error(error);
        setUser(false);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};
