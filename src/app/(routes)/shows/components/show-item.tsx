import { GetShowProps } from "@/app/api/shows/route";
import { Button } from "@/components/ui/button";
import { formatDateShort } from "@/utils/utils";
import Link from "next/link";
import React from "react";

const ShowItem = ({
  data,
  children,
}: {
  data: GetShowProps;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <div className="py-8 flex flex-col items-center md:grid md:grid-cols-3">
        <div className="font-bold text-2xl md:text-xl md:w-auto md:justify-self-start">
          {formatDateShort(data.date)}
        </div>

        <div className="mt-4 flex space-x-2 md:w-full md:justify-self-center md:mt-0 ">
          <p className="text-xl font-semibold">{data.venue}</p>
          <p className="text-xl">
            {data.city}, {data.country}
          </p>
        </div>

        <div className="mt-4 md:mt-0 md:w-auto md:justify-self-end md:flex">
          {data.ticketLink && (
            <Link href={data.ticketLink} target="_blank" rel="noreferrer">
              <Button className="w-full" variant="outline">
                Billets
              </Button>
            </Link>
          )}
          {children}
        </div>
      </div>
      <div className="border-t border-gray-500" />
    </>
  );
};

export default ShowItem;
