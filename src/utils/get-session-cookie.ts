import { cookies } from "next/headers";

// Not included in utils/auth.ts because getSession is used by middleware in edge runtime
// and if getSession is in a file that imports functions
// that are not compatible in the edge runtime
// (like @/firebase/db which is imported in utils/auth, then -> error)
export const getSessionCookie = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  return sessionCookie;
}
