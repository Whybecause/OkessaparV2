import { auth } from "@/firebase/db";
import { NextResponse } from "next/server";

// Register user
export async function POST() {
  try {
    const userRecord = await auth.createUser({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });

    const token = await auth.createCustomToken(userRecord.uid);

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error('Error creating new user:', error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}

