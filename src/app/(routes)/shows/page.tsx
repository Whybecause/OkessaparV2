import axios from "axios";

import { GetShowProps } from "@/app/api/shows/route";
import ShowItem from "./components/show-item";
import NoResults from "../../../components/no-results";
import { Calendar } from "lucide-react";
import Title from "@/components/title";
import MotionDiv from "@/components/motion-div";

// Static with revalidation (ISR) -> 60sec
export const revalidate = 60;

const URL = `${process.env.NEXT_PUBLIC_API_URL}/shows`;

const ShowsPage = async () => {
  const { data } = await axios.get(URL);

  return (
    <>
      <Title title={"Concerts"} icon={<Calendar />} />

      <div className="px-4">
        {data.length === 0 ? (
          <NoResults message={"Pas de concerts pour l'instant, ça bosse..."} />
        ) : (
          <MotionDiv>
            {data.map((show: GetShowProps) => (
              <ShowItem key={show.id} data={show} />
            ))}
          </MotionDiv>
        )}
      </div>
    </>
  );
};

export default ShowsPage;
