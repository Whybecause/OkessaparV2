import { getRedisClient } from "@/lib/redis/redis";
import { getSessionCookie } from "@/utils/auth";
import { errorServer } from "@/utils/error-server";
import { createHash } from "crypto";
import { NextResponse } from "next/server";

// Logout
export async function POST() {
  try {
    const sessionCookie = await getSessionCookie();
    if (!sessionCookie) {
      return NextResponse.json({ message: "No session found" });
    }

    const sessionKey = createHash("sha256").update(sessionCookie).digest("hex");
    const redis = getRedisClient();
    await redis.del(sessionKey);

    const response = NextResponse.json({ message: "Déconnexion réussie" });

    // Supprime le cookie en réglant max-age à 0 et path `/`
    response.cookies.set("session", "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (error) {
    return errorServer("Logout error:", error, 500);
  }
}
