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
      await axios.post(
        "/api/pro-login",
        JSON.stringify({ password })
      );
      router.refresh();
    } catch (err) {
      setError("Mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="p-8 flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-4">Entrer le mot de passe</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
          <Input
            type="password"
            placeholder="Mot de passe"
            className="border rounded p-2 text-black
              "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={loading} type="submit">Valider</Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </main>
    </div>
  );
}
