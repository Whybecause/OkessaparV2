import axios from "axios";

import { SelectedSpotify } from "@/app/api/music/spotify/route";
import { handleErrorServer } from "@/utils/handleErrorServer";

// interface YouTubeVideo {
//   id: {
//     videoId: string;
//   };
//   snippet: {
//     publishedAt: string;
//     channelId: string;
//     title: string;
//     description: string;
//     thumbnails: {
//       default: { url: string; width: number; height: number };
//       medium: { url: string; width: number; height: number };
//       high: { url: string; width: number; height: number };
//     };
//     channelTitle: string;
//   };
// }

const URL = `${process.env.NEXT_PUBLIC_API_URL}/music`;

const MusicPage = async () => {
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
        <h1 className="py-8 text-center border-b border-gray-300">Musique</h1>

        <div className="py-8 flex flex-col items-center justify-center gap-4">
          {spotifyData.map((item) => (
            <div key={item.id}>
              <p className="text-xl font-semibold text-center mb-2">
                {item.release_date.substring(0, 4)}
              </p>
              {item.type === "album" ? (
                <iframe
                  src={`https://open.spotify.com/embed/album/${item.id}`}
                  width="300"
                  height="380"
                  allow="encrypted-media"
                ></iframe>
              ) : (
                <iframe
                  src={`https://open.spotify.com/embed/track/${item.id}`}
                  width="300"
                  height="380"
                  allow="encrypted-media"
                ></iframe>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    handleErrorServer(error, "Failed to get music");
  }
};

export default MusicPage;
