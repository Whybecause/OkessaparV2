"use client";

import React, { useEffect, useState } from "react";

import AsyncData from "@/components/async-data";
import FilteredShows from "./components/filtered-shows";
import AddShowForm from "@/app/(admin)/admin/shows/components/add-show-form";
import { AVAILABLE_FILTERS, GetShowProps } from "@/app/api/shows/route";
import { cn } from "@/utils/utils";
import MotionDiv from "@/components/motion-div";
import { Button } from "@/components/ui/button";
import { useData } from "@/hooks/use-data";

const ShowsDashboard = () => {
  const [shows, setShows] = useState<GetShowProps[]>([]);
  const [filter, setFilter] = useState<string>("upcoming");

  const { data, isLoading, error } = useData("/api/shows?filter=all");
  useEffect(() => {
    if (data) {
      setShows(data as GetShowProps[]);
    }
  }, [data]);

  const onFilterSelect = (value: string) => {
    setFilter(value);
  };

  return (
    <>
      {/* Header */}
      <div className="border-b pt-6 pb-8 relative flex flex-col md:flex-row items-center">
        <h1 className="text-center md:absolute md:left-1/2 transform md:-translate-x-1/2">
          Concerts
        </h1>

        <div className="md:ml-auto mt-8 md:mt-0 text-center md:text-right">
          <AddShowForm setShows={setShows} />
        </div>
      </div>

      {/* Filter selection */}
      <div>
        <Button
          variant="link"
          className={cn(
            "",
            filter === AVAILABLE_FILTERS.upcoming &&
              "text-emerald-300 underline-offset-4 underline"
          )}
          onClick={() => onFilterSelect("upcoming")}
        >
          Upcoming
        </Button>
        <Button
          variant="link"
          className={cn(
            "",
            filter === AVAILABLE_FILTERS.past && "text-emerald-300 underline-offset-4 underline"
          )}
          onClick={() => onFilterSelect("past")}
        >
          Past
        </Button>
        <Button
          variant="link"
          className={cn(
            "",
            filter === AVAILABLE_FILTERS.all && "text-emerald-300 underline-offset-4 underline"
          )}
          onClick={() => onFilterSelect("all")}
        >
          All
        </Button>
      </div>

      {/* Data */}
      <AsyncData
        data={shows}
        isLoading={isLoading}
        error={error}
        noResultMessage="Aucun concert enregistré"
      >
        <MotionDiv>
          <FilteredShows data={shows} filter={filter} setShows={setShows} />
        </MotionDiv>
      </AsyncData>
    </>
  );
};

export default ShowsDashboard;
