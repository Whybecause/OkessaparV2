import { db } from "@/lib/firebase/db";
import { errorServer } from "@/utils/error-server";
import { NextRequest, NextResponse } from "next/server";


// Get lyrics for a song
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const filter = new URL(req.url, 'http://localhost:3000').searchParams.get('filter');

  if (!slug) {
    return NextResponse.json({
      error: "Slug manquant",
    }, { status: 400 })
  }

  try {
    // Si on entre manuellement le slug dans l'url, format it to remove spaces and add "-"
    const formattedSlug = slug.trim().toLowerCase().replace(/\s+/g, "-");

    const lyricRef = await db.collection("lyrics")
      .where("slug", "==", formattedSlug as string)
      .limit(1)
      .get()

    if (lyricRef.empty) {
      return NextResponse.json({
        error: "Lyrics non trouvés",
      }, { status: 404 })
    }

    const doc = lyricRef.docs[0];
    const lyricData = doc.data();

    if (filter === 'songName') {
      return NextResponse.json({ songName: lyricData.songName });
    }

    return NextResponse.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    return errorServer('API: Failed to get lyrics for slug:', error, 500)
  }
}
