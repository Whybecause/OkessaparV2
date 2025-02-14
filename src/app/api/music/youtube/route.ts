import { NextResponse } from "next/server";

import { errorServer } from "@/utils/error-server";
import { db } from "@/firebase/db";
import { SelectedYoutubeProps } from "../../admin/music/youtube/route";


// GET youtube videos data from db
// We only store the ones we want to be displayed on /music
export async function GET() {
  try {
    const docRef = await db.collection("music").doc("youtube").get();
    const docData = docRef.data();

    const data: SelectedYoutubeProps[] = docData?.data || [];

    // Sort by newest
    data.sort((a, b) => new Date(b.publisedAt).getTime() - new Date(a.publisedAt).getTime());

    return NextResponse.json(data);

  } catch (error) {
    return errorServer('Failed to get youtube data from db:', error, 500);
  }
}
