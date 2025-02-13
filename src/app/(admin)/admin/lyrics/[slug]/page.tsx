"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

import BackButton from "@/components/back-button";
import EditLyric from "../components/edit-lyric";
import DeleteLyrics from "../components/delete-lyric";
import Spinner from "@/components/ui/spinner";
import Error from "@/components/ui/error";
import { LyricProps } from "@/app/api/lyrics/route";

const LyricDashboard = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<LyricProps[]>([]);

  useEffect(() => {
    const getLyric = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/lyrics/${slug}`);
        setLyrics([response.data]);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setError(error?.response?.data?.error);
        } else {
          setError("Failed to get lyric");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getLyric();
  }, [slug]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex">
          <BackButton />
        </div>
        <Error error={error} />
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row items-center relative sm:gap-4">
          <div className="flex-shrink-0">
            <BackButton />
          </div>

          <h1 className="text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl truncate">
            {lyrics[0]?.songName}
          </h1>

          <div className="flex gap-4 mt-4 sm:mt-0 sm:ml-auto">
            <EditLyric data={lyrics[0]} setLyrics={setLyrics} />
            <DeleteLyrics id={lyrics[0]?.id} songName={lyrics[0]?.songName} />
          </div>
        </div>
      </div>

      <div
        className="p-4 text-md max-w-3xl break-all flex justify-center items-center mx-auto "
        dangerouslySetInnerHTML={{
          __html: new QuillDeltaToHtmlConverter(
            JSON.parse(lyrics[0]?.content).ops,
            {}
          ).convert(),
        }}
      />
    </>
  );
};

export default LyricDashboard;
