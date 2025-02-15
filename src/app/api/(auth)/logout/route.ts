import { NextResponse } from "next/server";

// Logout
export async function POST() {
  try {
    const response = NextResponse.json({ message: "Déconnexion réussie" });

    // Supprime le cookie en réglant max-age à 0 et path `/`
    response.cookies.set("session", "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (error) {
    console.error('Error login out user:', error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
