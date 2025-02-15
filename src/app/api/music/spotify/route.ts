import { NextResponse } from "next/server";

import { errorServer } from "@/utils/error-server";
import { db } from "@/firebase/db";

export type SelectedSpotify = {
  id: string;
  name: string;
  type: string; // Used for iframe url "album" or "track"
  release_date: string;
  album_type: string // Used to know if its a "single" or "album"
  album_name: string; // can be the same as name if its an album that is saved
};

// GET spotify trackIds and albumIds from db
// We only store the ones we want to be displayed on /music
export async function GET() {
  try {
    const docRef = await db.collection("music").doc("spotify").get();
    const docData = docRef.data();

    const data: SelectedSpotify[] = docData?.data || [];

    // Sort by newest
    data.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

    return NextResponse.json(data);

  } catch (error) {
    return errorServer('Failed to get spotify trackIds:', error, 500);
  }
}
