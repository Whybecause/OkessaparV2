"use client";
import { useEffect, useState } from "react";
import AddShowForm from "../../../(routes)/shows/components/add-show-form";
import axios from "axios";
import ShowItem from "../../../(routes)/shows/components/show-item";
import { cn } from "@/utils/utils";
import EditShowForm from "../../../(routes)/shows/components/edit-show-form";
import DeleteShowForm from "../../../(routes)/shows/components/delete-show-form";
import { GetShowProps } from "@/app/api/shows/route";
import { handleErrorClient } from "@/utils/handleErrorClient";
import Spinner from "@/components/ui/spinner";
import InfoCard from "../../../../components/info-card";
import MotionDiv from "@/components/motion-div";

const ShowsDashboard = () => {
  const [shows, setShows] = useState<GetShowProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getShows = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/shows");
        setShows(response.data);
      } catch (error) {
        console.error(error);
        handleErrorClient(error);
      } finally {
        setIsLoading(false);
      }
    };

    getShows();
  }, []);

  return (
    <>
      <div className="border-b pt-6 pb-8 relative flex flex-col md:flex-row items-center">
        <h1 className="text-center md:absolute md:left-1/2 transform md:-translate-x-1/2">
          Concerts
        </h1>

        <div className="md:ml-auto mt-8 md:mt-0 text-center md:text-right">
          <AddShowForm setShows={setShows} />
        </div>
      </div>

      {isLoading && <Spinner />}

      {!isLoading && shows.length === 0 && (
        <InfoCard message={"Pas de concerts pour l'instant, ça bosse..."} />
      )}

      <MotionDiv>
        {shows.map((show) => (
          <ShowItem data={show} key={show.id}>
            <div
              className={cn(
                "flex items-center space-x-4 mt-4 md:mt-0 md:ml-4",
                !show.ticketLink && "mt-0"
              )}
            >
              <EditShowForm
                id={show.id}
                initialData={show}
                setShows={setShows}
              />
              <DeleteShowForm id={show.id} setShows={setShows} />
            </div>
          </ShowItem>
        ))}
      </MotionDiv>
    </>
  );
};

export default ShowsDashboard;
