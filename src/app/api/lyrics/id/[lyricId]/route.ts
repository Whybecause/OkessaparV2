import { db } from "@/firebase/db";
import { NextResponse } from "next/server";
import { Lyrics } from "../../route";


export async function PATCH(
  req: Request,
  context: { params: { lyricId: string } }
) {
  try {
    const { lyricId } = await context.params;

    if (!lyricId) {
      return NextResponse.json(
        { error: "Missing lyricId" },
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

    const lyricRef = db.collection("lyrics").doc(lyricId);

    await lyricRef.update(updatedLyric);
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

export async function DELETE(
  req: Request,
  context: { params: { lyricId: string } }
) {
  try {
    const { lyricId } = await context.params;
    console.log('ID =', lyricId);

    if (!lyricId) {
      return NextResponse.json(
        { error: "Missing lyricId" },
        { status: 400 }
      )
    }

    const lyricRef = db.collection("lyrics").doc(lyricId)
    const lyricDoc = await lyricRef.get();

    if (!lyricDoc.exists) {
      return NextResponse.json(
        { error: "Lyric not found" },
        { status: 404 }
      );
    }

    await lyricRef.delete();
    return NextResponse.json(lyricRef);
  } catch (error) {
    console.error('Failed to delete lyrics:', error);

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
