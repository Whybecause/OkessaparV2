import { useEffect, useState } from "react";
import axios from "axios";

// Check if user auth (for client side components)
export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/login");
        setUser(response.data.user || null);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};
