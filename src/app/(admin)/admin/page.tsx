import MotionDiv from "@/components/motion-div";
import axios from "axios";
import { cookies } from "next/headers";
import { Music } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SHOWS_FILTER } from "@/constant/api-params";
import Error from "@/components/ui/error";
import { GetShowProps } from "@/app/api/shows/route";

const API_URL = process.env.API_URL;

type SortedShows = {
  upcoming: GetShowProps[];
  past: GetShowProps[];
};

const sortShowsByDate = (shows: GetShowProps[]) => {
  const currentDate = new Date();

  const sortedShows = shows.reduce<SortedShows>(
    (acc, show) => {
      const showDate = new Date(show.date);

      if (showDate > currentDate) {
        acc.upcoming.push(show);
      } else {
        acc.past.push(show);
      }

      return acc;
    },
    { upcoming: [], past: [] }
  );

  return sortedShows;
};

const LinkCard = ({
  href,
  title,
  cardContentClass = "",
  content,
}: {
  href: string;
  title: string;
  cardContentClass?: string;
  content: number;
}) => {
  return (
    <Link href={href} aria-label={title}>
      <Card className="bg-gray-900/50 text-gray-200">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className={`text-2xl font-bold ${cardContentClass}`}>
          {content}
        </CardContent>
      </Card>
    </Link>
  );
};

const AdminPage = async () => {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get("session")?.value) return;

    const cookieHeader = cookieStore.toString();
    const response = await axios.get(`${API_URL}/shows?filter=all`, {
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });
    const shows: GetShowProps[] = response.data;
    const sortedShows = sortShowsByDate(shows);

    return (
      <>
        <h1 className="py-6 text-center">Dashboard</h1>
        <MotionDiv className="space-y-8">
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-200">
            <span>
              <Music />
            </span>
            <h2>Stats des concerts</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <LinkCard
              href={`/admin/shows?filter=${SHOWS_FILTER.upcoming}`}
              title={"Concerts à venir"}
              cardContentClass="text-green-500"
              content={sortedShows.upcoming.length}
            />
            <LinkCard
              href={`/admin/shows?filter=${SHOWS_FILTER.past}`}
              title={"Concerts passés"}
              cardContentClass="text-red-500"
              content={sortedShows.past.length}
            />
            <LinkCard
              href={`/admin/shows?filter=${SHOWS_FILTER.all}`}
              title={"Total Concerts"}
              content={shows.length}
            />
          </div>
        </MotionDiv>
      </>
    );
  } catch (error) {
    console.error(error);
    return <Error error={"Une erreur est survenue"} />;
  }
};

export default AdminPage;
