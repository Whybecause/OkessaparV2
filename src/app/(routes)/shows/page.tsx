import axios from "axios";

import { GetShowProps } from "@/app/api/shows/route";
import ShowItem from "./components/show-item";
import NoResults from "../../../components/no-results";

// Static with revalidation (ISR) -> 60sec
export const revalidate = 60;

const URL = `${process.env.NEXT_PUBLIC_API_URL}/shows`;

const ShowsPage = async () => {
  const { data } = await axios.get(URL);

  return (
    <>
      <h1 className="py-8 text-center border-b border-gray-300">Concerts</h1>

      <div className="px-4">
        {data.length === 0 ? (
          <NoResults message={"Pas de concerts pour l'instant, ça bosse..."} />
        ) : (
          data.map((show: GetShowProps) => (
            <ShowItem key={show.id} data={show} />
          ))
        )}
      </div>
    </>
  );
};

export default ShowsPage;
