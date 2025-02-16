import { NextResponse } from "next/server";

import { isValidSessionCookie } from "@/utils/auth";
import { getSessionCookie } from "@/utils/get-session-cookie";

// Used in middleware to protect pages
export async function POST(req: Request) {
  const { sessionCookie } = await req.json();
  const isValidSession = await isValidSessionCookie(sessionCookie);
  return NextResponse.json(isValidSession);
}

// Used in client to know if user is auth or not
export async function GET() {
  const sessionCookie = await getSessionCookie();
  const isValidSession = await isValidSessionCookie(sessionCookie);
  return NextResponse.json(isValidSession);
}
