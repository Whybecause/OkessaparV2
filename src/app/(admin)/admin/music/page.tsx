"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { SpotifyAlbumWithTracks } from "@/app/api/admin/music/spotify/route";
import { SelectedSpotify } from "@/app/api/music/spotify/route";
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
import { getError } from "@/utils/error-front";

const QUERY_PLATFORM_VALUES = {
  spotify: "spotify",
  youtube: "youtube",
};

const MusicDashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryPlatform = searchParams.get("platform") || "";

  const [isSpotifyLoading, setIsSpotifyLoading] = useState(true);
  const [spotifyError, setSpotifyError] = useState<string | null>(null);
  const [spotifyData, setSpotifyData] = useState<SpotifyAlbumWithTracks[]>([]);
  const [selectedSpotify, setSelectedSpotify] = useState<SelectedSpotify[]>([]);

  const [isYoutubeLoading, setIsYoutubeLoading] = useState(true);
  const [youtubeError, setYoutubeError] = useState<string | null>(null);
  const [youtubeData, setYoutubeData] = useState<YouTubeVideoProps[]>([]);
  const [selectedYoutube, setSelectedYoutube] = useState<
    SelectedYoutubeProps[]
  >([]);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        setIsSpotifyLoading(true);
        const [spotifyResponse, savedTracksResponse] = await Promise.all([
          axios.get("/api/admin/music/spotify"),
          axios.get("/api/music/spotify"),
        ]);

        setSpotifyData(spotifyResponse.data);
        setSelectedSpotify(savedTracksResponse.data);
      } catch (error) {
        console.error("Failed to get data from spotify or db", error);
        const errorMessage = getError(error);
        setSpotifyError(errorMessage);
      } finally {
        setIsSpotifyLoading(false);
      }
    };

    const fetchYoutube = async () => {
      try {
        setIsYoutubeLoading(true);
        const [youtubeResponse, savedVideosResponse] = await Promise.all([
          axios.get("/api/admin/music/youtube"),
          axios.get("/api/music/youtube"),
        ]);

        setYoutubeData(youtubeResponse.data);
        setSelectedYoutube(savedVideosResponse.data);
      } catch (error) {
        console.error("Failed to get data from youtube or db", error);
        const errorMessage = getError(error);
        setYoutubeError(errorMessage);
      } finally {
        setIsYoutubeLoading(false);
      }
    };

    if (
      queryPlatform === QUERY_PLATFORM_VALUES.spotify &&
      !spotifyData.length
    ) {
      fetchSpotify();
    }
    if (
      queryPlatform === QUERY_PLATFORM_VALUES.youtube &&
      !youtubeData.length
    ) {
      fetchYoutube();
    }
  }, [queryPlatform, spotifyData, youtubeData]);

  useEffect(() => {
    if (!Object.values(QUERY_PLATFORM_VALUES).includes(queryPlatform)) {
      router.replace(`${pathname}?platform=spotify`);
    }
  }, [router, pathname, queryPlatform]);

  const onPlatformSelect = (value: string) => {
    router.replace(`${pathname}?platform=${value}`);
  };

  return (
    <>
      <div className="border-b pt-6 pb-8">
        <h1 className="text-center">
          {queryPlatform.charAt(0).toUpperCase() + queryPlatform.slice(1)}{" "}
          Manager
        </h1>
      </div>

      <div className="relative my-6 flex flex-col w-full text-black items-center justify-center gap-4 md:gap-0">
        <div className="flex items-center gap-2">
          <label className="text-white font-semibold">Select platform</label>

          <Select onValueChange={onPlatformSelect} value={queryPlatform}>
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
        {queryPlatform === QUERY_PLATFORM_VALUES.youtube &&
          youtubeData.length > 0 && (
            <div className="md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2 text-gray-300 items-center justify-start w-full md:w-auto pl-2">
              {youtubeData.length} vidéos
            </div>
          )}
      </div>

      {queryPlatform === QUERY_PLATFORM_VALUES.spotify ? (
        <MotionDiv>
          <SpotifyTrackSelector
            spotifyData={spotifyData}
            selectedSpotify={selectedSpotify}
            setSelectedSpotify={setSelectedSpotify}
            isLoading={isSpotifyLoading}
            error={spotifyError}
          />
        </MotionDiv>
      ) : (
        <YoutubeTrackSelector
          youtubeData={youtubeData}
          selectedYoutube={selectedYoutube}
          setSelectedYoutube={setSelectedYoutube}
          isLoading={isYoutubeLoading}
          error={youtubeError}
        />
      )}
    </>
  );
};

export default MusicDashboard;
