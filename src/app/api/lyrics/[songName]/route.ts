import { db } from "@/firebase/db";
import { NextResponse } from "next/server";

// Get lyrics for a song
export async function GET(
  req: Request,
  context: { params: { songName: string } }
) {
  try {
    const { songName } = await context.params;

    const lyricsSnapshot = await db.collection("lyrics")
    .where("songName", "==", songName)
    .limit(1)
    .get();

    if (lyricsSnapshot.empty) {
      return NextResponse.json({ error: "Aucun lyrics trouvés pour cette chanson" }, { status: 404 });
    }

    const doc = lyricsSnapshot.docs[0];

    return NextResponse.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    console.error('Failed to get lyrics:', error);

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
