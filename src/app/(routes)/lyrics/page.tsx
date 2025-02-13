import axios from "axios";
import { Mic2 } from "lucide-react";

import LyricsList from "./components/lyrics-list";
import InfoCard from "@/components/info-card";
import Title from "@/components/title";

// Static with revalidation (ISR) -> 60sec
export const revalidate = 60;

const URL = `${process.env.NEXT_PUBLIC_API_URL}/lyrics`;

const LyricsPage = async () => {
  const { data } = await axios.get(URL);

  return (
    <>
      <Title title={"Lyrics"} icon={<Mic2 />} />

      {data?.length === 0 ? (
        <InfoCard message={"Aucun lyrics enregistrés"} />
      ) : (

          <LyricsList data={data} />
      )}
    </>
  );
};

export default LyricsPage;
