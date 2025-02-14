"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { SpotifyAlbumWithTracks } from "@/app/api/admin/music/spotify/route";
import { SelectedSpotify } from "@/app/api/music/spotify/route";
import { handleErrorClient } from "@/utils/handleErrorClient";
import SpotifyTrackSelector from "./components/spotif-track-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MotionDiv from "@/components/motion-div";
import {
  SelectedYoutubeProps,
  YouTubeVideoProps,
} from "@/app/api/admin/music/youtube/route";
import YoutubeTrackSelector from "./components/youtube-track-selector";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MusicDashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryPlatform = searchParams.get("platform") || "";

  const validPlatforms = ["spotify", "youtube"];
  const [selectedPlatform, setSelectedPlatform] = useState(
    validPlatforms.includes(queryPlatform) ? queryPlatform : "spotify"
  );

  const [isLoading, setIsLoading] = useState(true);
  const [spotifyData, setSpotifyData] = useState<SpotifyAlbumWithTracks[]>([]);
  const [selectedSpotify, setSelectedSpotify] = useState<SelectedSpotify[]>([]);
  const [youtubeData, setYoutubeData] = useState<YouTubeVideoProps[]>([]);
  const [selectedYoutube, setSelectedYoutube] = useState<
    SelectedYoutubeProps[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [spotifyResponse, savedTracksResponse, youtubeResponse, savedVideosResponse] =
          await Promise.all([
            axios.get("/api/admin/music/spotify"),
            axios.get("/api/music/spotify"),
            axios.get("/api/admin/music/youtube"),
            axios.get("/api/music/youtube"),
          ]);

        setSpotifyData(spotifyResponse.data);
        setSelectedSpotify(savedTracksResponse.data);
        setYoutubeData(youtubeResponse.data);
        setSelectedYoutube(savedVideosResponse.data);
      } catch (error) {
        handleErrorClient(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // If nothing or wrong param, default to spotify in URL
    if (!queryPlatform || !validPlatforms.includes(queryPlatform)) {
      const newSearchParams = new URLSearchParams({ platform: "spotify" });
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [router, pathname, queryPlatform]); //eslint-disable-line

  const onPlatformSelect = (value: string) => {
    const newSearchParams = new URLSearchParams({ platform: value });
    router.replace(`${pathname}?${newSearchParams.toString()}`);
    setSelectedPlatform(value);
  };

  return (
    <>
      <div className="border-b pt-6 pb-8">
        <h1 className="text-center">
          {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}{" "}
          Manager
        </h1>
      </div>

      <div className="my-6 flex space-x-4 text-black items-center justify-center">
        <label className="text-white font-semibold">Select platform</label>

        <Select
          onValueChange={(value) =>
            onPlatformSelect(value as "spotify" | "youtube")
          }
          value={selectedPlatform}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="spotify">
              Spotify
            </SelectItem>
            <SelectItem className="cursor-pointer" value="youtube">
              Youtube
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedPlatform === "spotify" ? (
        <MotionDiv>
          <SpotifyTrackSelector
            spotifyData={spotifyData}
            selectedSpotify={selectedSpotify}
            setSelectedSpotify={setSelectedSpotify}
            isLoading={isLoading}
          />
        </MotionDiv>
      ) : (
        <YoutubeTrackSelector
          youtubeData={youtubeData}
          selectedYoutube={selectedYoutube}
          setSelectedYoutube={setSelectedYoutube}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default MusicDashboard;
