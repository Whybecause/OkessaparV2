import { NextResponse } from "next/server";

// To include in catch return in api
export const errorServer = (message: string, error: unknown, status: number ) => {
  console.error(message, error);
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return NextResponse.json(
    { error: errorMessage },
    { status }
  );
}
