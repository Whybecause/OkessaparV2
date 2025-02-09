import { auth } from "@/firebase/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Login user
export async function POST(
  req: Request,
) {
  try {
    const { token } = await req.json();
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const userRecord = await auth.getUser(uid);
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const sessionCookie = await auth.createSessionCookie(token.toString(), { expiresIn })

    const cookieStore = await cookies();
    cookieStore.set({
      name: "session",
      value: sessionCookie,
      maxAge: expiresIn / 1000, // Convertir en secondes
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ user: userRecord }, { status: 200 });
  } catch (error) {
    console.error('Error logging user:', error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}

// Get current user
export async function GET() {
  try {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await auth.getUser(decodedToken.uid);

    return NextResponse.json({ user: userRecord }, { status: 200 });
  } catch (error) {
    console.error('Failed to get user', error);
    return NextResponse.json({ error: "Session invalide" }, { status: 401 });
  }
}
