import { db } from "@/firebase/db";
import { NextResponse } from "next/server";
import { Lyrics } from "../route";

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

export async function PATCH(
  req: Request,
  context: { params: { songName: string } }
) {
  try {
    const { songName } = await context.params;

    if (!songName) {
      return NextResponse.json(
        { error: "Missing songName" },
        { status: 400 }
      )
    }

    const body = await req.json();
    const { songName: updatedSongName, content } = body;

    if (!updatedSongName || !content) {
      return NextResponse.json(
        { error: "Tous les champs sont requis " },
        { status: 400 }
      )
    }

    const updatedLyric: Lyrics = {
      songName: updatedSongName,
      content
    }

    const lyricsSnapshot = await db.collection("lyrics")
      .where("songName", "==", songName)
      .limit(1)
      .get();

    const docRef = db.collection("lyrics").doc(lyricsSnapshot.docs[0].id);

    await docRef.update(updatedLyric);
    return NextResponse.json(
      updatedLyric,
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la modification du show', error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
