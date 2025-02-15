import axios from "axios";

import LyricsList from "./components/lyrics-list";
import InfoCard from "@/components/info-card";
import Title from "@/components/title";
import { handleErrorServer } from "@/utils/error-front";
import Error from "@/components/ui/error";

// Static with revalidation (ISR) -> 60sec
export const revalidate = 60;

const URL = `${process.env.API_URL}/lyrics`;

const LyricsPage = async () => {
  try {
    const { data } = await axios.get(URL);

    if (data.error) {
      return <Error error={data.error} />;
    }

    return (
      <>
        <Title title={"Lyrics"} />

        {data?.length === 0 ? (
          <InfoCard message={"Aucun lyrics enregistrés"} />
        ) : (
          <LyricsList data={data} />
        )}
      </>
    );
  } catch (error) {
    return handleErrorServer(error, "Failed to get lyrics");
  }
};

export default LyricsPage;
