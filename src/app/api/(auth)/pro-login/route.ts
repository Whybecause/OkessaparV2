import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const PASSWORD = process.env.PRO_PASSWORD || "";

// Login pro
export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (password === PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set({
        name: "pro-auth",
        value: PASSWORD,
        maxAge: 60 * 60 * 24, // 1 jour
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  } catch (error) {
    console.error("Error logging pro user:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
