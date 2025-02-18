import { NextResponse } from "next/server";

export const applyCors = (req: Request, res: NextResponse) => {
  const origin = req.headers.get("origin") || req.headers.get("host") || req.headers.get("x-forwarded-host");

  if (origin !== process.env.HOST_URL) {
    return NextResponse.json({ error: "Forbidden"}, { status: 403 });
  }

  res.headers.set("Access-Control-Allow-Origin", `https://${process.env.HOST_URL}`);
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return res;
}
