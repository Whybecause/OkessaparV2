import { cookies } from "next/headers";

import { auth } from "@/firebase/db";

// Check if user auth (for server side components)
// (useUser hook for client side component)
export const getSessionCookie = async () => {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    await auth.verifySessionCookie(sessionCookie, true);
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}
