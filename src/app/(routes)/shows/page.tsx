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
      <MotionDiv>
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

        <div className="px-4">
          {data.length === 0 ? (
            <div className="flex justify-center items-center w-full relative">
              <Image
                src={"/images/submarine.webp"}
                alt="Submarine"
                layout="intrinsic"
                width={700}
                height={500}
                priority
                className="max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] object-contain rounded-xl"
              />
              <MotionDiv duration={0.9} className="absolute top-1/2 left-1/2">
                <div className="bg-gradient-to-b w-full max-w-[400px] text-center bg-opacity-80 p-3 md:p-4 from-transparent to-gray-900/50  transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 text-white rounded-lg shadow-md">
                  <p>Pas de concerts pour l&apos;instant, ça bosse...</p>
                </div>
              </MotionDiv>
            </div>
          ) : (
            <>
              {data.map((show: GetShowProps) => (
                <ShowItem key={show.id} data={show} />
              ))}
            </>
          )}
        </div>
      </MotionDiv>
    );
  } catch (error: unknown) {
    return handleErrorServer(error, "SSR: Failed to get shows");
  }
};

export default ShowsPage;
