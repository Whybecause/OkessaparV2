"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { handleErrorClient } from "@/utils/handleErrorClient";
import { Button } from "./ui/button";

const Footer = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/logout");
      router.refresh();
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer>
      <div className="border-t p-4 text-center">
        <p>© 2025 Okessapar</p>
      </div>
      {user && (
        <div className="text-center p-4">
          <Button onClick={handleLogout} disabled={isLoading}>
            <LogOut />
          </Button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
