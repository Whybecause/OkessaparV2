import axios from "axios";

import AddLyrics from "./components/add-lyrics";
import LyricsList from "./components/lyrics-list";
import { getSessionCookie } from "@/utils/get-session-cookie";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/lyrics`;

const LyricsPage = async () => {
  const { data } = await axios.get(URL);
  const isAdmin = await getSessionCookie();

  return (
    <>
      <div className="py-8 relative flex flex-col md:flex-row items-center">
        <h1 className="md:absolute md:left-1/2 transform md:-translate-x-1/2">
          Lyrics
        </h1>
        {isAdmin && (
          <div className="md:ml-auto mt-8 md:mt-0 text-center md:text-right">
            <AddLyrics />
          </div>
        )}
      </div>

      {!data.length && (
        <p className="text-center text-xl font-semibold">
          Aucun lyrics pour l&apos;instant
        </p>
      )}

      <LyricsList data={data} />
    </>
  );
};

export default LyricsPage;
