import { NextResponse } from "next/server";

import { db } from "@/lib/firebase/db";
import { Timestamp } from "firebase-admin/firestore";
import { checkAuth } from "@/utils/auth";
import { errorServer } from "@/utils/error-server";
import { SHOWS_FILTER } from "@/constant/api-params";

export type GetShowProps = {
  id: string;
  country: string;
  city: string;
  date: Date;
  venue: string;
  ticketLink: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url, 'http://localhost');
    const filter = url.searchParams.get("filter");

    if (!filter || !Object.values(SHOWS_FILTER).includes(filter)) {
      return NextResponse.json({
        error: "Filter is invalid or missing",
        status: 400
      });
    }

    const showsDoc = await db.collection("shows").get();
    const shows = showsDoc.docs.map((doc) => {
      const { date, ...rest } = doc.data();
      return {
        id: doc.id,
        date: date ? date.toDate() : null,
        ...rest,
      }
    });
    shows.sort((a, b) => (a.date && b.date ? a.date - b.date : 0));

    const now = new Date();
    let filteredShows = shows;

    if (filter === SHOWS_FILTER.upcoming) {
      filteredShows = shows.filter((show) => new Date(show.date) >= now);
    }

    if (filter === SHOWS_FILTER.all || filter === SHOWS_FILTER.past) {
      await checkAuth();
    }

    return NextResponse.json(filteredShows, { status: 200 });
  } catch (error) {
    return errorServer("API: Failed to get shows", error, 500);
  }
}

export async function POST(
  req: Request
) {
  try {
    await checkAuth();

    const body = await req.json();
    const { city, country, date, venue, ticketLink } = body;

    if (!country || !city || !date || !venue) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const newShow = {
      date: new Date(date),
      country,
      venue,
      city,
      ticketLink,
      createdAt: new Date(),
    };

    const docRef = await db.collection("shows").add({
      ...newShow,
      date: Timestamp.fromDate(newShow.date),
      createdAt: Timestamp.fromDate(newShow.createdAt!)
    })

    const createdShow = { id: docRef.id, ...newShow }

    return NextResponse.json(
      createdShow,
      { status: 201 }
    );
  } catch (error) {
    return errorServer('Failed to create show', error, 500);
  }
}
