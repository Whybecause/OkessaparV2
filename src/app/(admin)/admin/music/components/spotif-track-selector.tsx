import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

import {
  SpotifyAlbum,
  SpotifyAlbumWithTracks,
  SpotifyTrack,
} from "@/app/api/admin/music/spotify/route";
import { handleErrorClient } from "@/utils/error-front";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SelectedSpotify } from "@/app/api/music/spotify/route";
import Error from "@/components/ui/error";
import InfoCard from "@/components/info-card";

const SpotifyTrackSelector = ({
  spotifyData,
  selectedSpotify,
  setSelectedSpotify,
  isLoading,
  error,
}: {
  spotifyData: SpotifyAlbumWithTracks[];
  selectedSpotify: SelectedSpotify[];
  setSelectedSpotify: React.Dispatch<React.SetStateAction<SelectedSpotify[]>>;
  isLoading: boolean;
  error: string | null;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleTrackSelect = (track: SpotifyTrack, album: SpotifyAlbum) => {
    setSelectedSpotify((prevItems) => {
      const isTrackPresent = prevItems.some((item) => item.id === track.id);

      return isTrackPresent
        ? prevItems.filter((item) => item.id !== track.id) // Remove track
        : [
            ...prevItems.filter((item) => item.id !== album.id), // Add track and remove album
            {
              id: track.id,
              type: track.type,
              name: track.name,
              release_date: album.release_date,
              album_type: album.album_type,
              album_name: album.name,
            },
          ];
    });
  };

  const handleAlbumSelect = (
    album: SpotifyAlbum,
    albumTracks: SpotifyTrack[]
  ) => {
    setSelectedSpotify((prevItems) => {
      const tracksToRemove = albumTracks.map((track) => track.id);
      const isAlbumPresent = prevItems.some((item) => item.id === album.id);

      return isAlbumPresent
        ? prevItems.filter((item) => item.id !== album.id) // Remove album
        : [
            ...prevItems.filter((item) => !tracksToRemove.includes(item.id)), // Add album and remove tracks
            {
              id: album.id,
              type: album.type,
              name: album.name,
              release_date: album.release_date,
              album_type: album.album_type,
              album_name: album.name,
            },
          ];
    });
  };

  const handleSubmit = async () => {
    try {
      setIsUpdating(true);

      await axios.patch("/api/admin/music/spotify", selectedSpotify);
      toast.success("Changements sauvegardés");
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!spotifyData.length) {
    return (
      <InfoCard message="Aucun résultats" />
    )
  }
  return (
    <div className="border-t border-gray-500 p-4 mb-10 sm:mb-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {spotifyData.map((item) => (
          <div
            key={item.album.id}
            className="p-4 bg-gray-900/50 rounded-lg shadow-lg flex flex-col items-center space-y-3 hover:scale-105 transition"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={item.album.images[2].url}
                alt="Album cover"
                width={64}
                height={64}
              />
              <div>
                <h3>{item.album.name}</h3>
                <p>{item.album.album_type}</p>
                <p>{item.album.release_date} </p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {item.album.album_type !== "single" && (
                <div className="flex items-center space-x-2">
                  <div
                    onClick={() => handleAlbumSelect(item.album, item.tracks)}
                    className="cursor-pointer inline-flex items-center  gap-2 whitespace-nowrap rounded-md  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 p-4 bg-slate-900 text-slate-50 hover:bg-slate-900/90"
                  >
                    <Switch
                      className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-500"
                      checked={selectedSpotify.some(
                        (c) => c.id === item.album.id
                      )}
                    />
                    <span className="text-lg font-semibold">Album complet</span>
                  </div>
                </div>
              )}

              {item.tracks.map((track) => (
                <li key={track.id} className="flex items-center space-x-2">
                  <Switch
                    className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-500"
                    checked={selectedSpotify.some(
                      (item) => item.id === track.id
                    )}
                    onCheckedChange={() => handleTrackSelect(track, item.album)}
                  />
                  <span className="text-lg">{track.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-2 md:p-4 md:relative">
        <Button
          variant="primary"
          className="w-60"
          onClick={handleSubmit}
          disabled={isUpdating}
        >
          Sauvegarder
        </Button>
      </div>
    </div>
  );
};

export default SpotifyTrackSelector;
