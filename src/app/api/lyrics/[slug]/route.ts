import { db } from "@/lib/firebase/db";
import { NextResponse } from "next/server";


// Get lyrics for a song
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    // Si on entre manuellement le slug dans l'url, format it to remove spaces and add "-"
    const formattedSlug = slug.trim().toLowerCase().replace(/\s+/g, "-");

    const lyricsSnapshot = await db.collection("lyrics")
    .where("slug", "==", formattedSlug)
    .limit(1)
    .get();

    if (lyricsSnapshot.empty) {
      return NextResponse.json({ error: "Cette chanson n'existe pas" }, { status: 404 });
    }

    const doc = lyricsSnapshot.docs[0];

    return NextResponse.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    console.error('API: Failed to get lyrics for slug:', error);

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
