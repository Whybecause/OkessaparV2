import { NextResponse } from "next/server";

import { getSessionCookie, isValidSessionCookie } from "@/utils/auth";

// Used in client to know if user is auth or not
export async function GET() {
  const sessionCookie = await getSessionCookie();
  const isValidSession = await isValidSessionCookie(sessionCookie);
  return NextResponse.json(isValidSession);
}
