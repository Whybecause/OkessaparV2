"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

import BackButton from "@/components/back-button";
import EditLyric from "../components/edit-lyric";
import DeleteLyrics from "../components/delete-lyric";
import { LyricProps } from "@/app/api/lyrics/route";
import AsyncData from "@/components/async-data";
import { useData } from "@/hooks/use-data";

const LyricDashboard = () => {
  const { slug } = useParams();
  const [lyrics, setLyrics] = useState<LyricProps[]>([]);

  const { data, isLoading, error } = useData(`/api/lyrics/${slug}`);
  useEffect(() => {
    if (data) {
      setLyrics(data as LyricProps[]);
    }
  }, [data]);

  return (
    <AsyncData
      data={lyrics}
      isLoading={isLoading}
      error={error}
      noResultMessage="No lyric found or wrong slug"
    >
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

      {lyrics[0]?.content && (
        <div
          className="p-4 text-md max-w-3xl break-all flex justify-center items-center mx-auto "
          dangerouslySetInnerHTML={{
            __html: new QuillDeltaToHtmlConverter(
              JSON.parse(lyrics[0]?.content).ops,
              {}
            ).convert(),
          }}
        />
      )}
    </AsyncData>
  );
};

export default LyricDashboard;
