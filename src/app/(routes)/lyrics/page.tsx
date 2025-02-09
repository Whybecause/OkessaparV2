import axios from "axios";
import Link from "next/link";

import { Lyrics } from "@/app/api/lyrics/route";
import AddLyrics from "./components/add-lyrics";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/lyrics`;

const LyricsPage = async () => {
  const { data } = await axios.get(URL);

  return (
    <>
      <div className="py-8 relative flex flex-col md:flex-row items-center">
        <h1 className="md:absolute md:left-1/2 transform md:-translate-x-1/2">
          Lyrics
        </h1>
        <div className="md:ml-auto mt-8 md:mt-0 text-center md:text-right">
          <AddLyrics />
        </div>
      </div>

      {!data.length && <p className="text-center text-xl font-semibold">Aucun lyrics pour l&apos;instant</p>}
      <div className="md:p-4 text-center text-2xl underline decoration-emerald-300">
        {data.map((lyric: Lyrics) => (
          <div key={lyric.id}>
            <Link href={`/lyrics/${lyric.songName}`}>{lyric.songName}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default LyricsPage;
