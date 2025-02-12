import { NextResponse } from "next/server";

import { db } from "@/firebase/db";
import { checkAuth } from "@/utils/check-auth-server";
import { errorServer } from "@/utils/error-server";

export type LyricProps = {
  id: string;
  songName: string;
  content: string;
  order: number;
  slug: string;
}

// Get all songName
export async function GET() {
  try {
    const lyrics = await db.collection("lyrics").get();

    const data = lyrics.docs.map((doc) => {
      const docData = doc.data();

      return {
        id: doc.id,
        songName: docData.songName,
        order: docData.order,
        slug: docData.slug,
      }
    });

    const sortedData = data.sort((a, b) => a.order - b.order);

    return NextResponse.json(sortedData);
  } catch (error) {
    return errorServer('Failed to get song names:', error, 500);
  }
}

// Update lyric.order when reordered with drag and drop
export async function PATCH(
  req: Request
) {
  try {
    await checkAuth();

    const body = await req.json();

    const batch = db.batch();

    body.forEach((lyric: LyricProps) => {
      const docRef = db.collection("lyrics").doc(lyric.id!);
      batch.update(docRef, { order: lyric.order });
    });

    await batch.commit();
    return NextResponse.json({ status: 201 });
  }
  catch (error) {
    return errorServer('Erreur lors de la modification des lyrics', error, 500);
  }
}

// Add new lyric
export async function POST(
  req: Request
) {
  try {
    await checkAuth();

    const body = await req.json();
    const { songName, content } = body;

    if (!songName || !content) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const slug = songName.trim().toLowerCase().replace(/\s+/g, "-");

    const querySnapshot = await db.collection("lyrics")
      .where("slug", "==", slug).get();

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: "Ce titre de chanson existe déjà" },
        { status: 409 }
      )
    }

    // Handle counter so we can display lyrics and rearrange them with dnd based on their order
    const counterRef = await db.collection("lyricsOrderCounter").get();
    let newOrder = 1;

    if (counterRef.empty) {
      await db.collection("lyricsOrderCounter").doc('count').set({ count: 1 });
    } else {
      newOrder = counterRef.docs[0].get('count') + 1;
      await db.collection("lyricsOrderCounter").doc('count').set({ count: newOrder });
    }

    const newLyric = {
      songName,
      content,
      order: newOrder,
      slug
    };

    const docRef = await db.collection("lyrics").add(newLyric);

    const createdLyric: LyricProps = { id: docRef.id, ...newLyric }

    return NextResponse.json(
      createdLyric,
      { status: 201 }
    );
  } catch (error) {
    return errorServer('Failed to create lyrics', error, 500);
  }
}
