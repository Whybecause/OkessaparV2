import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { getProSessionCookie } from "@/utils/auth";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const proSession = await getProSessionCookie();

  if (!proSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filename } = await context.params;

  // Sécurise le chemin pour éviter les traversals
  const fileName = path.basename(filename);
  const filePath = path.join(process.cwd(), "private-files", fileName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "Ce fichier n'existe pas" },
      { status: 404 }
    );
  }

  const fileBuffer = fs.readFileSync(filePath);
  const uint8Array = new Uint8Array(fileBuffer);

  return new NextResponse(uint8Array, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
