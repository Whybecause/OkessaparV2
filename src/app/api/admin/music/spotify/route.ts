import { NextResponse } from "next/server";
import { z } from "zod";

import { checkAuth } from "@/utils/auth";
import { errorServer } from "@/utils/error-server";
import { db } from "@/lib/firebase/db";
import { applyCors } from "@/utils/cors";

export interface SpotifyTrack {
  artists: { id: string; name: string }[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface SpotifyAlbum {
  album_type: string;
  total_tracks: number;
  is_playable: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: { id: string; name: string }[];
  album_group: string;
}

export type SpotifyAlbumWithTracks = {
  album: SpotifyAlbum;
  tracks: SpotifyTrack[];
};

const OKESSAPAR_SPOTIFY_ID = "1n8P1ZPMaY61KWcfTG7l1Z";

const getAccessToken = async () => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();

  if (data.error) {
    throw new Error(`Failed to get token from Spotify: ${data.error}`);
  }
  const token = data.access_token;

  return token || "";
}

const getAlbums = async (token: string): Promise<SpotifyAlbum[]> => {
  const albumRes = await fetch(
    `https://api.spotify.com/v1/artists/${OKESSAPAR_SPOTIFY_ID}/albums?market=FR&limit=50`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const albumsData = await albumRes.json();

  if (albumsData.error) {
    throw new Error(`Failed to get albums from spotify: ${albumsData.error.message}`);
  }

  return albumsData.items || [];
}

const getTracksByAlbum = async (token: string, albumId: string): Promise<SpotifyTrack[]> => {
  const trackRes = await fetch(
    `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const tracksData = await trackRes.json();
  if (tracksData.error) {
    throw new Error(`Failed to get tracks from spotify: ${tracksData.error.message}`);
  }
  return tracksData.items || [];
}

// Get tracks from spotify
export async function GET(req: Request) {
  try {
    const res = applyCors(req, NextResponse.next());
    if (res.status === 403) {
      return res;
    }

    await checkAuth();

    const token = await getAccessToken();

    const albums = await getAlbums(token);

    const data: SpotifyAlbumWithTracks[] = await Promise.all(albums.map(async (album) => {
      const tracks = await getTracksByAlbum(token, album.id);

      return { album, tracks };
    }));

    data.sort((a, b) => new Date(b.album.release_date).getTime() - new Date(a.album.release_date).getTime());

    return applyCors(req, NextResponse.json(
      data,
      { status: 200 }
    ));

  } catch (error) {
    return applyCors(req, errorServer('Failed to get data from spotify', error, 500));
  }
}

const schema = z.array(
  z.object({
    id: z.string().min(1, "id is required"),
    name: z.string().min(1, "name is required"),
    release_date: z.string().min(1, "release_date is required"),
    type: z.string().min(1, "type is required"),
    album_type: z.string().min(1, "album_type is required"),
    album_name: z.string().min(1, "album_name is required"),
  })
);

// Add/remove spotify trackids/albumIds in db
export async function PATCH(
  req: Request
) {
  try {
    await checkAuth();

    const body = await req.json();

    // Validation des champs du body avec Zod
    schema.parse(body);

    const batch = db.batch();
    const docRef = db.collection("music").doc('spotify');
    batch.set(docRef, { data: body });
    await batch.commit();

    return NextResponse.json({ status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map((issue) => issue.message) },
        { status: 400 }
      )
    }
    return errorServer('Failed to update spotify tracks', error, 500);
  }
}
