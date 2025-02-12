import { auth } from "@/firebase/db";
import { NextResponse } from "next/server";

// Used in middleware to check sessionCookie
export async function POST(req: Request) {
  try {
    const { sessionCookie } = await req.json();

    if (!sessionCookie) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await auth.getUser(decodedToken.uid);
    return NextResponse.json({ user: userRecord }, { status: 200 });
  } catch (error) {
    console.error('Session invalide', error);
    return NextResponse.json({ error: "Session invalide" }, { status: 401 });
  }
}
