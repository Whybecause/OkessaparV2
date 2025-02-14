import { cookies } from "next/headers";
import { auth } from "@/firebase/db";

let cachedSession: true | null = null;

// Check if user auth (for server side components)
// (useUser hook for client side component)
export const getSessionCookie = async () => {
  if (cachedSession) return cachedSession; // Utilise la version en cache

  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    await auth.verifySessionCookie(sessionCookie, true);
    cachedSession = true;
    return cachedSession;
  } catch (error) {
    console.error(error);
    cachedSession = null;
    return cachedSession;
  }
}

// Protect api routes
export const checkAuth = async () => {
  const isAuth = await getSessionCookie();
  if (!isAuth) {
    throw new Error("Unauthorized");
  }
  return;
}
