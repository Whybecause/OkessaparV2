import { auth } from "@/lib/firebase/db";
import { NextResponse } from "next/server";

type FirebaseAuthError = {
  code: string;
  message: string;
};

// Register user: calling this route only create the admin account
export async function POST() {
  try {
    let existingUser;

    // Check if account already exists
    try {
      existingUser = await auth.getUserByEmail(process.env.ADMIN_EMAIL!);
    } catch (error: unknown) {
      const err = error as FirebaseAuthError;
      if (err.code === 'auth/user-not-found') {
        existingUser = null;
      } else {
        throw error;
      }
    }

    if (existingUser) {
      return NextResponse.json({ status: 200 })
    }

    // Otherwise create account
    await auth.createUser({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error('Error creating new user:', error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}

