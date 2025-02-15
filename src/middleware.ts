import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = `${process.env.VERCEL_URL}`;

export async function middleware(req: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await axios.post(`${API_URL}/verify-token`, { sessionCookie });
    return NextResponse.next();
  } catch (error) {
    console.error('Unauthorized', error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
