import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Logout
export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "session",
      value: "",
      maxAge: 0,
      httpOnly: true,
      secure: true
    });
    const response = NextResponse.json({ message: "Déconnexion réussie" });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error login out user:', error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
