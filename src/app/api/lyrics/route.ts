import { NextResponse } from "next/server";
import { db } from "@/firebase/db";
import { Delta } from "quill";

export type Lyrics = {
  id?: string;
  songName: string;
  content: Delta;
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
      }
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to get song names:', error);

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();
    const { songName, content } = body;

    if (!songName || !content) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const querySnapshot = await db.collection("lyrics")
      .where("songName", "==", songName).get();

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: "Ce titre de chanson existe déjà" },
        { status: 409 }
      )
    }

    const newLyric: Lyrics = {
      songName,
      content,
    };

    const docRef = await db.collection("lyrics").add(newLyric);

    const createdLyric = { id: docRef.id, ...newLyric }

    return NextResponse.json(
      createdLyric,
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create lyric', error);

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
