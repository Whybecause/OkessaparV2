import axios from "axios";

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

const MusicPage = async () => {
  const channelId = "UCjeEtfJO2NhwegNFxcvb7bw";

  const response = await axios.get<{ items: YouTubeVideo[] }>(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );

  const videos = response.data.items;

  console.log(videos[0].snippet);

  return (
    <div className="p-8">
      <h1>Musique</h1>

      <div className="flex justify-center">
        <iframe
          src="https://open.spotify.com/embed/track/3emu0vCnO7ZZYEDiHzqz1D"
          width="300"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      </div>

      <div>
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <p>{video.snippet.title}</p>
            <iframe
              width="300"
              height="180"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPage;
