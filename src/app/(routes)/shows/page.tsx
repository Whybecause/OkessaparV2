import axios from "axios";
import Image from "next/image";

import { GetShowProps } from "@/app/api/shows/route";
import ShowItem from "./components/show-item";
import Title from "@/components/title";
import MotionDiv from "@/components/motion-div";
import Error from "@/components/ui/error";
import { handleErrorServer } from "@/utils/error-front";

// Static with revalidation (ISR) -> 60sec
export const revalidate = 60;

export const metadata = () => {
  return {
    title: "Concerts | Okessapar",
    description: "Découvrez les prochaines dates de concert d'Okessapar",
  };
};

const URL = `${process.env.API_URL}/shows?filter=upcoming`;

const ShowsPage = async () => {
  try {
    const { data } = await axios.get(URL);

    if (data.error) {
      return <Error error={data.error} />;
    }

    return (
      <MotionDiv className="min-h-[calc(100dvh-48px)] flex flex-col">
        <div className="relative flex">
          <Image
            src={"/images/show.jpg"}
            alt="Show backround picture"
            layout="fill"
            objectFit="cover"
            className="z-0 opacity-60"
            loading="lazy"
          />
          <Title title={"Concerts"} />
        </div>

        {data.length === 0 ? (
          <div className="flex flex-grow justify-center items-center ">
            <div className="bg-gradient-to-b w-full max-w-[400px] text-center p-3 md:p-6  bg-gray-900/80 text-gray-300 rounded-lg">
              <p>Pas de concerts pour l&apos;instant, ça bosse...</p>
            </div>
          </div>
        ) : (
          <div className="px-4">
            <>
              <h2 className="text-gray-100 my-8">Prochain concerts</h2>
              {data.map((show: GetShowProps) => (
                <ShowItem key={show.id} data={show} />
              ))}
            </>
          </div>
        )}
      </MotionDiv>
    );
  } catch (error: unknown) {
    return handleErrorServer(error, "SSR: Failed to get shows");
  }
};

export default ShowsPage;
