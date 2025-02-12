import axios from "axios";

import LyricsList from "./components/lyrics-list";
import NoResults from "@/components/no-results";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/lyrics`;

const LyricsPage = async () => {
  const { data } = await axios.get(URL);

  return (
    <>
      <h1 className="py-8 text-center border-b border-gray-300">Lyrics</h1>

      {data.length === 0 && (
        <NoResults message={"Aucun lyrics enregistrés"} />
      )}

      <LyricsList data={data} />
    </>
  );
};

export default LyricsPage;
