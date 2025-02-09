import Link from "next/link";
import axios from "axios";

import { cn, formatDate } from "@/lib/utils";
import { Shows } from "@/app/api/shows/route";
import AddShowForm from "./components/add-show-form";
import EditShowForm from "./components/edit-show-form";
import DeleteShowForm from "./components/delete-show-form";
import { Button } from "@/components/ui/button";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/shows`;

const ShowsPage = async () => {
  const { data } = await axios.get(URL);

  // TODO: proper auth
  const isAdmin = true;

  return (
    <>
      <div className="py-8 relative flex flex-col md:flex-row items-center">
        <h1 className="md:absolute md:left-1/2 transform md:-translate-x-1/2">
          Concerts
        </h1>
        <div className="md:ml-auto mt-8 md:mt-0 text-center md:text-right">
          <AddShowForm />
        </div>
      </div>

      <>
        {data.length === 0 ? (
          <div>
            <p className="text-lg font-semibold text-center">
              Pas de concerts pour l&apos;instant, ça bosse...{" "}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="border-b" />

            {data.map((show: Shows) => (
              <>
                <div
                  key={show.id}
                  className="flex flex-col items-center md:grid md:grid-cols-3"
                >
                  <div className="font-bold text-4xl md:text-xl md:w-auto md:justify-self-start">
                    {formatDate(show.date)}
                  </div>

                  <div className="mt-4 flex space-x-2 md:w-full md:justify-self-center md:mt-0 ">
                    <p className="text-xl font-semibold">{show.venue}</p>
                    <p className="text-xl">
                      {show.city}, {show.country}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 md:w-auto md:justify-self-end md:flex">
                    {show.ticketLink && (
                      <Link
                        href={show.ticketLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button className="w-full" variant="outline">
                          Billets
                        </Button>
                      </Link>
                    )}
                    {isAdmin && (
                      <div
                        className={cn(
                          "flex items-center space-x-4 mt-4 md:mt-0 md:ml-4",
                          !show.ticketLink && "mt-0"
                        )}
                      >
                        <EditShowForm id={show.id!} data={show} />
                        <DeleteShowForm id={show.id!} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-b" />
              </>
            ))}
          </div>
        )}
      </>
    </>
  );
};

export default ShowsPage;
