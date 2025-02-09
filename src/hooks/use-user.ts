import axios from "axios";
import { useEffect, useState } from "react";

import { handleErrorClient } from "@/lib/handleErrorClient";


export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/login");
        setUser(response.data.user || null);
      } catch (error) {
        setUser(null);
        handleErrorClient(error);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};
