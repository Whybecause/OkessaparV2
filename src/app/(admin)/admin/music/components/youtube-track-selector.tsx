import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

import { formatDate } from "@/utils/utils";
import { handleErrorClient } from "@/utils/error-front";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  SelectedYoutubeProps,
  YouTubeVideoProps,
} from "@/app/api/admin/music/youtube/route";
import MotionDiv from "@/components/motion-div";
import Error from "@/components/ui/error";
import InfoCard from "@/components/info-card";

const YoutubeTrackSelector = ({
  youtubeData,
  selectedYoutube,
  setSelectedYoutube,
  isLoading,
  error,
}: {
  youtubeData: YouTubeVideoProps[];
  selectedYoutube: SelectedYoutubeProps[];
  setSelectedYoutube: React.Dispatch<
    React.SetStateAction<SelectedYoutubeProps[]>
  >;
  isLoading: boolean;
  error: string | null;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleVideoSelect = (video: YouTubeVideoProps) => {
    setSelectedYoutube((prevItems) => {
      const isVideoPresent = prevItems.some(
        (item) => item.id === video.id.videoId
      );
      if (isVideoPresent) {
        return prevItems.filter((item) => item.id !== video.id.videoId);
      }
      return [
        ...prevItems,
        {
          id: video.id.videoId,
          title: video.snippet.title,
          publisedAt: video.snippet.publishedAt,
          imageUrl: video.snippet.thumbnails.default.url,
        },
      ];
    });
  };

  const handleSubmit = async () => {
    try {
      setIsUpdating(true);
      await axios.patch("/api/admin/music/youtube", selectedYoutube);
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

  if (!youtubeData.length) {
    return (
      <InfoCard message="Aucun résultats" />
    )
  }

  return (
    <MotionDiv className="border-t border-gray-500 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {youtubeData.map((item) => (
          <div
            key={item.id.videoId}
            onClick={() => handleVideoSelect(item)}
            className="p-4 cursor-pointer bg-gray-900/50 rounded-lg shadow-lg flex flex-col items-center space-y-3 hover:scale-105 transition"
          >
            <div className="flex md:flex-col md:gap-2 lg:gap-0 lg:flex-row items-center space-x-4">
              <Image
                src={item.snippet.thumbnails.high.url}
                alt="Video cover"
                width={120}
                height={90}
                className="rounded-xl"
              />

              <div className="text-center">
                <h3 className="text-sm font-semibold">{item.snippet.title}</h3>
                <p className="text-xs text-gray-400">
                  {formatDate(item.snippet.publishedAt)}
                </p>
              </div>
            </div>

            <Switch
              className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-500"
              checked={selectedYoutube.some(
                (selectedItem) => selectedItem.id === item.id.videoId
              )}
              // onCheckedChange={() => handleVideoSelect(item)}
            />
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-2 md:p-4 md:relative">
        <Button
          variant="primary"
          className="w-60"
          onClick={handleSubmit}
          disabled={isUpdating}
          aria-label="Sauvegarder"
        >
          Sauvegarder
        </Button>
      </div>
    </MotionDiv>
  );
};

export default YoutubeTrackSelector;
