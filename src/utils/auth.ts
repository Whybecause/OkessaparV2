import { createHash } from "crypto";

import { auth } from "@/lib/firebase/db";
import { getRedisClient } from "@/lib/redis/redis";
import { getSessionCookie } from "./get-session-cookie";


export const isValidSessionCookie = async (
  sessionCookie: string | undefined,
): Promise<boolean> => {
  if (!sessionCookie) {
    return false;
  }

  const sessionKey = createHash("sha256").update(sessionCookie).digest("hex");
  const redis = getRedisClient();

  // Free plan so dont use in dev
  if (process.env.NODE_ENV === "production") {
    const hasCachedSession = await redis.get(sessionKey);
    if (hasCachedSession) {
      return true;
    }
  }

  try {
    await auth.verifySessionCookie(sessionCookie, true);
    if (process.env.NODE_ENV === "production") {
      await redis.set(sessionKey, "true", { ex: 60 * 60 * 24 * 5 });
    }
    return true;
  } catch (error) {
    console.error("Session not valid", error);
    return false;
  }
}

// Protect api routes
export const checkAuth = async () => {
  const sessionCookie = await getSessionCookie();
  const isValidSession = await isValidSessionCookie(sessionCookie);
  if (!isValidSession) {
    throw new Error("Unauthorized");
  }
  return;
}
