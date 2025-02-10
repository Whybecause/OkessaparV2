import { getSessionCookie } from "./get-session-cookie";

// Protect api routes
export const checkAuth = async () => {
  const isAuth = await getSessionCookie();
  if (!isAuth) {
    throw new Error("Unauthorized");
  }
  return;
}
