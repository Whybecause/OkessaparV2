"use client";

import React, { useState } from "react";
import { EllipsisVertical, Pencil } from "lucide-react";

import DeleteShowForm from "@/app/(admin)/admin/shows/components/delete-show-form";
import EditShowForm from "@/app/(admin)/admin/shows/components/edit-show-form";
import { GetShowProps } from "@/app/api/shows/route";
import InfoCard from "@/components/info-card";
import { cn, formatDate } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const ShowsList = ({
  data,
  title,
  noResultMessage,
  setShows,
}: {
  data: GetShowProps[];
  title: string;
  noResultMessage: string;
  setShows: React.Dispatch<React.SetStateAction<GetShowProps[]>>;
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openEditId, setOpenEditId] = useState<string | null>(null);

  const handleToggleMenu = (id: string) => {
    setOpenMenu((prevItems) => (prevItems === id ? null : id));
  };

  if (data.length === 0) {
    return <InfoCard message={noResultMessage} />;
  }

  return (
    <>
      <div className="flex items-center justify-center gap-2 py-4">
        <h2 className="text-gray-300">{title}</h2>
        <p className="text-gray-400">({data.length})</p>
      </div>
      {openEditId && data.find((item) => item.id === openEditId) && (
        <EditShowForm
          id={openEditId}
          initialData={data.find((item) => item.id === openEditId)!}
          setShows={setShows}
          setOpenMenu={setOpenMenu}
          openEditId={openEditId}
          setOpenEditId={setOpenEditId}
        />
      )}
      <div className="max-w-full md:max-w-4xl w-full mx-auto py-4 gap-4 flex flex-col">
        {data.map((show) => (
          <React.Fragment key={show.id}>
            <div className="flex flex-col items-center sm:grid sm:grid-cols-[1fr_1fr_auto_auto] gap-4">
              <div className="font-semibolbold text-lg">
                {formatDate(show.date)}
              </div>
              <div className="flex space-x-2">
                <p>{show.venue}</p>
                <p className="text-gray-400">
                  {show.city}, {show.country}
                </p>
              </div>
              {show.ticketLink.length > 0 && (
                <div>
                  <Link href={show.ticketLink} aria-label="Acheter des places">
                    <Button>Billets</Button>
                  </Link>
                </div>
              )}

              <div>
                <DropdownMenu
                  open={openMenu === show.id}
                  onOpenChange={() => handleToggleMenu(show.id)}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "hover:bg-gray-900 border-gray-600 border-2 hover:text-slate-100 transition-all",
                        openMenu === show.id ? "border-gray-400 border-2" : ""
                      )}
                    >
                      <EllipsisVertical />
                      <span className="sm:hidden">Manage</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-gray-900 text-gray-300">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="cursor-pointer"
                      >
                        <button
                          onClick={() => setOpenEditId(show.id)}
                          className="flex w-full h-8 justify-start items-center gap-2"
                        >
                          <Pencil />
                          Edit
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="text-red-500 cursor-pointer"
                      >
                        <DeleteShowForm
                          id={show.id}
                          setShows={setShows}
                          setOpenMenu={setOpenMenu}
                        />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="border-b border-gray-600" />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ShowsList;
