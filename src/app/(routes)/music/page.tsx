import axios from "axios";

import { SelectedSpotify } from "@/app/api/music/spotify/route";
import { getSessionCookie } from "@/utils/get-session-cookie";
import { handleErrorServer } from "@/utils/handleErrorServer";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface YouTubeVideo {
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
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/music`;

const MusicPage = async () => {
  const isAdmin = await getSessionCookie();
  // const channelId = "UCjeEtfJO2NhwegNFxcvb7bw";

  // try {
  //   const response = await axios.get<{ items: YouTubeVideo[] }>(
  //     `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  //   );

  //   console.log("RES =", response);

  //   const videos = response.data.items;
  // } catch (error) {
  //   console.log("err =", error.response.data);
  // }
  try {
    const response = await axios.get(`${URL}/spotify`);
    const spotifyData: SelectedSpotify[] = response.data;

    return (
      <div>
        <h1 className="p-8">Musique</h1>
        {isAdmin && (
          <Link href="/music/edit">
            <Button>
              {" "}
              <Pencil />
              Edit{" "}
            </Button>
          </Link>
        )}

        <div className="py-4 flex flex-col items-center justify-center gap-4">
          {spotifyData.map((item) => (
            <>
              <p className="text-xl font-semibold">
                {item.release_date.substring(0, 4)}
              </p>
              {item.type === "album" ? (
                <iframe
                  key={item.id}
                  src={`https://open.spotify.com/embed/album/${item.id}`}
                  width="300"
                  height="380"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                ></iframe>
              ) : (
                <iframe
                  key={item.id}
                  src={`https://open.spotify.com/embed/track/${item.id}`}
                  width="300"
                  height="380"
                  frameborder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                ></iframe>
              )}
            </>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    handleErrorServer(error, "Failed to get music");
  }
};

export default MusicPage;
