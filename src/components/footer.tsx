"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { LogOut } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { handleErrorClient } from "@/utils/handleErrorClient";
import { Button } from "./ui/button";

const Footer = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/logout");
      window.location.reload();
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="flex w-full border-t border-gray-500 p-4">
      <div className="w-full flex justify-start">
        <p className="text-gray-300">© 2025 Okessapar</p>
      </div>
      {user && (
        <div className="w-full flex justify-end gap-x-4">
          <Button>
            <Link href="/admin">Admin</Link>
          </Button>
          <Button onClick={handleLogout} disabled={isLoading}>
            <LogOut />
          </Button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
