"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import AddShowForm from "./components/add-show-form";
import { formatDate, handleError } from "@/lib/utils";
import { Shows } from "@/app/api/shows/route";
import EditShowForm from "./components/edit-show-form";
import DeleteShowForm from "./components/delete-show-form";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Spinner from "@/components/ui/spinner";

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
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShows();
  }, []);

  return (
    <Container>
      <div className="px-4">
        <h1>Concerts</h1>

        <AddShowForm setShows={setShows} />

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {shows.length === 0 && <div><p className="text-lg font-semibold text-center">Pas de concerts pour l'instant, ça bosse... </p></div>}
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
                      <EditShowForm id={show.id!} data={show} setShows={setShows} />
                      <DeleteShowForm id={show.id!} setShows={setShows} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </Container>
  );
};

export default ShowsPage;
