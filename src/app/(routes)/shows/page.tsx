"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import AddShowForm from "./components/add-show-form";
import { formatDate } from "@/lib/utils";
import { Shows } from "@/app/api/shows/route";
import EditShowForm from "./components/edit-show-form";
import DeleteShowForm from "./components/delete-show-form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { handleErrorClient } from "@/lib/handleErrorClient";

const ShowsPage = () => {
  const [shows, setShows] = useState<Shows[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState(1);

  // TODO: proper auth
  const isAdmin = true;

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get("/api/shows");
        setShows(response.data);
        //eslint-disable-next-line
      } catch (error) {
        handleErrorClient(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShows();
  }, []);

  useEffect(() => {
    setColumns(isAdmin ? 4 : 3);
  }, [isAdmin]);

  return (
    <>
      <div className="py-8 relative flex flex-col md:flex-row items-center">
        <h1 className="md:absolute md:left-1/2 transform md:-translate-x-1/2">
          Concerts
        </h1>
        <div className="md:ml-auto mt-8 md:mt-0 text-center md:text-right">
          <AddShowForm setShows={setShows} />
        </div>
      </div>

      <div className="">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {shows.length === 0 && (
              <div>
                <p className="text-lg font-semibold text-center">
                  Pas de concerts pour l&apos;instant, ça bosse...{" "}
                </p>
              </div>
            )}

            <div className="space-y-10">
              <div className="border-b" />

              {shows.map((show) => (
                <>
                  <div
                    key={show.id}
                    className={`flex flex-col gap-2 space-y-4 md:space-y-0 items-center md:grid md:grid-cols-${columns}`}
                  >
                    <div className="text-4xl md:text-xl font-bold md:w-auto md:justify-self-start">
                      {formatDate(show.date)}
                    </div>

                    <div className="flex space-x-2 md:w-full md:justify-self-center">
                      <p className="text-xl font-semibold">{show.venue}</p>
                      <p className="text-xl">
                        {show.city}, {show.country}
                      </p>
                    </div>

                    <div className="md:w-auto md:justify-self-end">
                      {show.ticketLink && (
                        <Link
                          href={show.ticketLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button variant="outline">Billets</Button>
                        </Link>
                      )}
                    </div>

                    {isAdmin && (
                      <div className="flex space-x-2 md:justify-self-end">
                        <EditShowForm
                          id={show.id!}
                          data={show}
                          setShows={setShows}
                        />
                        <DeleteShowForm id={show.id!} setShows={setShows} />
                      </div>
                    )}
                  </div>
                  <div className="border-b" />
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShowsPage;
