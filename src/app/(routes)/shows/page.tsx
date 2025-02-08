"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import AddShowForm from "./components/add-show-form";
import { formatDate } from "@/lib/utils";
import { Shows } from "@/app/api/shows/route";
import EditShowForm from "./components/edit-show-form";
import DeleteShowForm from "./components/delete-show-form";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Spinner from "@/components/ui/spinner";
import { handleErrorClient } from "@/lib/handleErrorClient";

const ShowsPage = () => {
  const [shows, setShows] = useState<Shows[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

      <div className="flex flex-col md:flex-row">
        <div>
          <div>04 Avr.</div>

          <div>
            <p>IBoat</p>
            <p>Bordeaux, France</p>
          </div>

          <div>
            <p>Billets</p>
          </div>
          <div>
            <p>Edit</p>
            <p>Delete</p>
            </div>
        </div>
      </div>

      <div className="md:p-4">
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

            <Table>
              <TableBody>
                {shows.map((show) => (
                  <TableRow key={show.id}>
                    <TableCell>{formatDate(show.date)}</TableCell>
                    <TableCell>{show.venue}</TableCell>
                    <TableCell>
                      {show.city}, {show.country}
                    </TableCell>
                    <TableCell>
                      {show.ticketLink && (
                        <Link
                          href={show.ticketLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button>Billets</Button>
                        </Link>
                      )}
                    </TableCell>

                    <TableCell className="flex justify-around">
                      <EditShowForm
                        id={show.id!}
                        data={show}
                        setShows={setShows}
                      />
                      <DeleteShowForm id={show.id!} setShows={setShows} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </>
  );
};

export default ShowsPage;
