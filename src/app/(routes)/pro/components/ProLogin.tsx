"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post("/api/pro-login", JSON.stringify({ password }));
      router.refresh();
    } catch (err) {
      setError("Mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="p-8 flex flex-col items-center max-w-lg w-full bg-gray-900/20 rounded-xl mx-auto">
        <h2 className="text-lg text-gray-300 font-semibold mb-4">
          Entrer le mot de passe
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 max-w-sm w-full"
        >
          <Input
            type="password"
            placeholder="Mot de passe"
            className="border rounded p-2 text-black
              "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={loading} type="submit">
            Valider
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </main>
    </div>
  );
}
