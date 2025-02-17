"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Loader2, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/utils/utils";
import { DISCOVERY_VENUE_PROPS } from "@/app/api/admin/music/venues/route";
import MotionUl from "@/components/motion-ul";
import { ControllerRenderProps } from "react-hook-form";

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AutoSuggest = ({
  field,
  inputQuery,
  onVenueSelect,
  apiUrl,
  getDisplayData,
  placeholder,
  cachedData,
  setCachedData,
}: {
  field: ControllerRenderProps<any>; //eslint-disable-line
  inputQuery: string;
  onVenueSelect: (venue: DISCOVERY_VENUE_PROPS) => void;
  apiUrl: string;
  getDisplayData: (venue: DISCOVERY_VENUE_PROPS) => string;
  placeholder: string;
  cachedData: DISCOVERY_VENUE_PROPS[];
  setCachedData: React.Dispatch<React.SetStateAction<DISCOVERY_VENUE_PROPS[]>>;
}) => {
  const debouncedQuery = useDebounce(inputQuery, 300); // Ajoute un délai de 500ms

  const [lastQuery, setLastQuery] = useState("");
  const [hasSelected, setHasSelected] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const shouldFetch =
    debouncedQuery.length > 2 && debouncedQuery !== lastQuery && !hasSelected;
  const { data, error, isValidating } = useSWR(
    shouldFetch ? `${apiUrl}${debouncedQuery}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  useEffect(() => {
    if (data && shouldFetch) {
      setLastQuery(debouncedQuery);
    }
  }, [data, shouldFetch, debouncedQuery]);

  useEffect(() => {
    if (data) {
      setCachedData(data);
      if (data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    }
  }, [data]); //eslint-disable-line

  useEffect(() => {
    if (!inputQuery) {
      setCachedData([]);
      setHasSelected(false);
      setNoResults(false);
    }
  }, [inputQuery]); //eslint-disable-line

  const handleVenueSuggestionSelect = (venue: DISCOVERY_VENUE_PROPS) => {
    onVenueSelect(venue);
    setCachedData([]);
    setHasSelected(true);
    setLastQuery("");
    setHighlightedIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!cachedData.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === null || prev >= cachedData.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === null || prev <= 0 ? cachedData.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex === null) {
        handleVenueSuggestionSelect(cachedData[0]);
      } else {
        handleVenueSuggestionSelect(cachedData[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      if (cachedData.length > 0) {
        e.stopPropagation();
        setCachedData([]);
        setHighlightedIndex(null);
      }
    }
  };

  return (
    <div className="relative">
      <Input
        className="text-black pr-10"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onClick={() => {
          if (inputQuery !== lastQuery && hasSelected) {
            setHasSelected(false);
          }
        }}
        {...field}
      />
      {isValidating && (
        <div className="absolute right-0 top-2">
          <Loader2 className="animate-spin w-4 h-4 text-gray-500 text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="text-sm  px-4 py-2 max-h-[210px] rounded-bl-md rounded-br-md shadow-md flex w-full flex-col bg-gray-200 test-gray-500 transition">
          Une erreur est survenue
        </div>
      )}
      {noResults && (
        <div className="text-sm px-4 py-2 max-h-[210px] rounded-bl-md rounded-br-md shadow-md flex w-full flex-col bg-gray-200 test-gray-500 transition">
          Aucun résultats
        </div>
      )}

      <div
        className={cn(
          "max-h-[210px] rounded-bl-md rounded-br-md shadow-md flex w-full flex-col bg-gray-200 test-gray-500 transition",
          cachedData?.length > 0 || !error ? "flex" : "hidden"
        )}
      >
        {cachedData?.length > 0 && (
          <MotionUl className="max-w-[550px] overflow-y-auto">
            <li
              onClick={() => handleVenueSuggestionSelect(cachedData[0])}
              className={cn(
                "w-full flex justify-between items-center py-2 px-4 text-sm rounded-md hover:bg-gray-300 hover:test-gray-600 cursor-pointer transition-all",
                highlightedIndex === 0 ? "bg-gray-300 test-gray-500" : null
              )}
            >
              <span className="truncate">{getDisplayData(cachedData[0])}</span>
              <span>
                <X
                  onClick={() => {
                    setCachedData([]);
                    setHighlightedIndex(null);
                  }}
                  className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700"
                />
              </span>
            </li>

            {cachedData.slice(1).map((venue, index) => (
              <li
                key={venue.id}
                onClick={() => handleVenueSuggestionSelect(venue)}
                className={cn(
                  "pr-10 py-2 pl-4 text-sm rounded-md hover:bg-gray-300 hover:test-gray-600 cursor-pointer transition-all",
                  highlightedIndex === index + 1
                    ? "bg-gray-300 test-gray-500"
                    : null
                )}
              >
                {getDisplayData(venue)}
              </li>
            ))}
          </MotionUl>
        )}
      </div>
    </div>
  );
};

export default AutoSuggest;
