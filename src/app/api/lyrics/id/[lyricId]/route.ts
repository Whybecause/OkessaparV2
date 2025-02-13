import { db } from "@/firebase/db";
import { checkAuth } from "@/utils/check-auth-server";
import { errorServer } from "@/utils/error-server";
import { NextResponse } from "next/server";

type LyricUpdate = {
  songName: string;
  content: string;
  slug: string;
}

// Update a lyric
export async function PATCH(
  req: Request,
  context: { params: Promise<{ lyricId: string }> }
) {
  try {
    await checkAuth();

    const { lyricId } = await context.params;

    if (!lyricId) {
      return NextResponse.json(
        { error: "Missing lyricId" },
        { status: 400 }
      )
    }

    const body = await req.json();

    const { songName, content } = body;

    const updatedSlug = songName.trim().toLowerCase().replace(/\s+/g, "-");

    if (!songName || !content) {
      return NextResponse.json(
        { error: "Tous les champs sont requis " },
        { status: 400 }
      )
    }

    const updatedLyric: LyricUpdate = {
      songName,
      slug: updatedSlug,
      content
    }

    const lyricRef = db.collection("lyrics").doc(lyricId);

    const data = {
      ...updatedLyric,
      id: lyricId
    }

    await lyricRef.update(updatedLyric);
    return NextResponse.json(
      data,
      { status: 200 }
    );
  } catch (error) {
    return errorServer('Erreur lors de la modification du show', error, 500);
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ lyricId: string }> }
) {
  try {
    await checkAuth();

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
    return errorServer('Failed to delete lyrics', error, 500);
  }
}
