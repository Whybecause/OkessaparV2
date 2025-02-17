import { NextResponse } from "next/server";

// import axios from "axios";

// import { getSessionCookie } from "./utils/get-session-cookie";

// const API_URL = `${process.env.API_URL}`;

export async function middleware() {
  return NextResponse.next();
  // try {
  //   const sessionCookie = await getSessionCookie();

  //   if (!sessionCookie) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }

  //   const { data: isValidSession} = await axios.post(`${API_URL}/is-valid-session`, { sessionCookie });
  //   if (!isValidSession) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }

    // return NextResponse.next();
  // } catch (error) {
  //   console.error('Middleware error', error);
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
}

export const config = {
  matcher: ["/admin", "/admin/music", "/admin/shows", "/admin/lyrics"],
};
