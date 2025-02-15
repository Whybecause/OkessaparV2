import axios from "axios";

import { SelectedSpotify } from "@/app/api/music/spotify/route";
import { handleErrorServer } from "@/utils/error-front";
import Title from "@/components/title";
import MotionDiv from "@/components/motion-div";
import { SelectedYoutubeProps } from "@/app/api/admin/music/youtube/route";
import InfoCard from "@/components/info-card";
import Error from "@/components/ui/error";

const API_URL = `${process.env.API_URL}`;

const MusicPage = async () => {
  try {
    const spotifyFromDb = await axios.get(`${API_URL}/music/spotify`);
    const youtubeFromDb = await axios.get(`${API_URL}/music/youtube`);

    if (spotifyFromDb.data.error) {
      return <Error error={spotifyFromDb.data.error} />;
    }

    if (youtubeFromDb.data.error) {
      return <Error error={youtubeFromDb.data.error} />;
    }

    const spotifyData: SelectedSpotify[] = spotifyFromDb.data;
    const youtubeData: SelectedYoutubeProps[] = youtubeFromDb.data;


    return (
      <>
        <Title title={"Musique"} />

        {/* Section Spotify */}
        <MotionDiv className="py-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            🎵 Nos morceaux sur Spotify
          </h2>
          {spotifyData.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2 mx-auto">
              {spotifyData.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center bg-gray-900/50 p-4 rounded-lg shadow-lg hover:scale-105 transition gap-2"
                >
                  <p className="text-lg font-semibold text-white">
                    {item.release_date.substring(0, 4)} - {item.album_name} ({item.album_type.charAt(0).toUpperCase() + item.album_type.slice(1)})
                  </p>
                  <iframe
                    src={`https://open.spotify.com/embed/${item.type}/${item.id}`}
                    width="100%"
                    height="380"
                    allow="encrypted-media"
                    className="rounded-lg"
                  ></iframe>
                </div>
              ))}
            </div>
          ) : (
            <InfoCard message={"Rien pour l'instant"} />
          )}
        </MotionDiv>

        {/* Section YouTube */}
        <MotionDiv className="py-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            🎬 Nos vidéos YouTube
          </h2>
          {youtubeData.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {youtubeData.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center bg-gray-900/50 p-4 rounded-lg shadow-lg hover:scale-105 transition"
                >
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${item.id}?enablejsapi=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              ))}
            </div>
          ) : (
            <InfoCard message={"Rien pour l'instant"} />
          )}
        </MotionDiv>
      </>
    );
  } catch (error) {
    handleErrorServer(error, "Failed to get music");
  }
};

export default MusicPage;
