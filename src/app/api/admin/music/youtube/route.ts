import { NextResponse } from "next/server";
import { z } from "zod";

import { checkAuth } from "@/utils/check-auth-server";
import { errorServer } from "@/utils/error-server";
import { db } from "@/firebase/db";

export interface YouTubeVideoProps {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    channelTitle: string;
  };
};

export interface SelectedYoutubeProps {
  id: string;
  title: string;
  publisedAt: string;
  imageUrl: string;
}

const OKESSAPAR_YOUTUBE_ID = "UCjeEtfJO2NhwegNFxcvb7bw";

// Get videos from youtube
export async function GET() {
  try {
    await checkAuth();

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet,id&channelId=${OKESSAPAR_YOUTUBE_ID}&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`
    );

    const youtubeResponse = await response.json();
    const data = youtubeResponse.items;

    return NextResponse.json(
      data,
      { status: 200 }
    );

  } catch (error) {
    return errorServer('Failed to get tracks from spotify', error, 500);
  }
}

const schema = z.array(
  z.object({
    id: z.string().min(1, "id is required"),
    title: z.string().min(1, "title is required"),
    publisedAt: z.string().min(1, "publisedAt is required"),
    imageUrl: z.string().min(1, "imageUrl is required"),
  })
);

// Add/remove youtube videos in db
export async function PATCH(
  req: Request
) {
  try {
    await checkAuth();

    const body = await req.json();

    // Validation des champs du body avec Zod
    schema.parse(body);

    const videoRef = db.collection("music").doc("youtube");
    await videoRef.set({ data: body });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map((issue) => issue.message) },
        { status: 400 }
      )
    }
    return errorServer('Failed to update youtube videos', error, 500);
  }
}
