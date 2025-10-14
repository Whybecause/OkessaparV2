import { auth } from "@/lib/firebase/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Login user
export async function POST(
  req: Request,
) {
  try {
    const { token } = await req.json();
    await auth.verifyIdToken(token);

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 jours en ms

    const sessionCookie = await auth.createSessionCookie(token.toString(), { expiresIn })
    const cookieStore = await cookies();
    cookieStore.set({
      name: "session",
      value: sessionCookie,
      maxAge: expiresIn / 1000, // 5 jours en secondes
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error logging user:', error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
