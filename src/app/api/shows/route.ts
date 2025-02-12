import { NextResponse } from "next/server";
import { db } from "@/firebase/db";
import { Timestamp } from "firebase-admin/firestore";
import { checkAuth } from "@/utils/check-auth-server";
import { errorServer } from "@/utils/error-server";

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

export async function GET() {
  try {
    const shows = await db.collection("shows").get();
    const data = shows.docs.map((doc) => {
      const { date, ...rest } = doc.data();
      return {
        id: doc.id,
        date: date ? date.toDate() : null,
        ...rest,
      }
    });

    data.sort((a, b) => (a.date && b.date ? a.date - b.date : 0));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to get shows:', error);

    return NextResponse.json(
      { error },
      { status: 500 }
    );
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
