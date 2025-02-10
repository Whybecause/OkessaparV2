import { db } from "@/firebase/db";
import { NextResponse } from "next/server";

type LyricUpdate = {
  songName: string;
  content: string;
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ lyricId: string }> }
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

    const updatedLyric: LyricUpdate = {
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
  context: { params: Promise<{ lyricId: string }> }
) {
  try {
    const { lyricId } = await context.params;

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

    const lyricOrder = lyricDoc.data()?.order;

    const batch = db.batch();

    const lyricsQuery = db.collection("lyrics")
      .where("order", ">", lyricOrder)
      .orderBy("order");

    const lyricsSnapshot = await lyricsQuery.get();

    if (!lyricsSnapshot.empty) {
      // Update order in lyrics
      lyricsSnapshot.forEach(doc => {
        const lyricData = doc.data();
        const updatedOrder = lyricData.order - 1;
        const lyricRefToUpdate = db.collection("lyrics").doc(doc.id);

        batch.update(lyricRefToUpdate, { order: updatedOrder })
      });
    }

    // Delete the lyric
    batch.delete(lyricRef);

    const counterRef = await db.collection("lyricsOrderCounter").doc('count');
    const counterDoc = await counterRef.get();
    const currentCount = counterDoc.data()?.count;

    // Update the order counter
    batch.update(counterRef, { count: currentCount - 1 });

    // Perform all operations safely
    await batch.commit();

    return NextResponse.json(lyricRef);
  } catch (error) {
    console.error('Failed to delete lyrics:', error);

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
