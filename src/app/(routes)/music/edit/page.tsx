"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { handleErrorClient } from "@/utils/handleErrorClient";
import { SpotifyAlbumWithTracks } from "@/app/api/admin/music/spotify/route";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SpotifyTrackSelector from "./components/spotif-track-selector";
import { SelectedSpotify } from "@/app/api/music/spotify/route";

// Admin page
const EditMusic = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<
    "spotify" | "youtube"
  >("spotify");
  const [spotifyData, setSpotifyData] = useState<SpotifyAlbumWithTracks[]>([]);
  const [selectedSpotify, setSelectedSpotify] = useState<SelectedSpotify[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [spotifyResponse, savedTracksResponse] = await Promise.all([
          axios.get("/api/admin/music/spotify"),
          axios.get("/api/music/spotify"),
        ]);

        setSpotifyData(spotifyResponse.data);
        setSelectedSpotify(savedTracksResponse.data)
      } catch (error) {
        handleErrorClient(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="py-8">Edit Music</h1>
      <div className="my-6 flex space-x-4 text-black items-center justify-center">
        <label className="text-white font-semibold">Select platform</label>
        <Select
          onValueChange={(value) =>
            setSelectedPlatform(value as "spotify" | "youtube")
          }
          defaultValue="spotify"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spotify">Spotify</SelectItem>
            <SelectItem value="youtube">Youtube</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {
        selectedPlatform === "spotify" ? (
          <SpotifyTrackSelector
            spotifyData={spotifyData}
            selectedSpotify={selectedSpotify}
            setSelectedSpotify={setSelectedSpotify}
            isLoading={isLoading}
          />
        ) : null
        // <YouTubeTrackSelector />
      }
    </>
  );
};

export default EditMusic;
