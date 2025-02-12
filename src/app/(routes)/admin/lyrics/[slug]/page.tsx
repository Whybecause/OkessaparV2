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
  const [lyric, setLyric] = useState<LyricProps>({
    id: "",
    songName: "",
    content: "",
    order: 0,
    slug: "",
  });

  useEffect(() => {
    const getLyric = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/lyrics/${slug}`);
        console.log("res =", response.data);
        setLyric(response.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setError(error?.response?.data?.error);
        } else {
          setError("Failed to get lyric")
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
        <div className="flex justify-between">
          <BackButton />
          <div className="space-x-2">
            <EditLyric data={lyric} setLyric={setLyric} />
            <DeleteLyrics id={lyric.id} />
          </div>
        </div>
        <h2 className="absolute left-1/2 transform -translate-x-1/2">
          {lyric.songName}
        </h2>
      </div>

      <div
        className="p-4 text-lg font-semibold"
        dangerouslySetInnerHTML={{
          __html: new QuillDeltaToHtmlConverter(
            JSON.parse(lyric.content).ops,
            {}
          ).convert(),
        }}
      />
    </>
  );
};

export default LyricDashboard;
