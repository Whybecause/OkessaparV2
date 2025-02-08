import { NextResponse } from "next/server";
import { db } from "@/firebase/db";
import { Timestamp } from "firebase-admin/firestore";

export type Shows = {
  id?: string;
  country: string;
  city: string;
  date: Date;
  venue: string;
  ticketLink?: string;
  createdAt: Date;
};

export async function GET() {
  const shows = await db.collection("shows").get();
  const data = shows.docs.map((doc) => {
    const { date, ...rest } = doc.data();
    return {
      id: doc.id,
      date: date ? date.toDate() : null,
      ...rest,
    }
  });
  return NextResponse.json(data);
}

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();
    const { city, country, date, venue, ticketLink } = body;
console.log('DAte =', typeof date);
    if (!country || !city || !date || !venue) {
      return NextResponse.json({
        error: "Tous les champs sont requis"
      }, {
        status: 400
      })
    }

    const newShow: Shows = {
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
      createdAt: Timestamp.fromDate(newShow.createdAt)
    })
    const createdShow = { id: docRef.id, ...newShow }
    return NextResponse.json(createdShow,
      {
        status: 201
      });
  } catch (error) {
    return NextResponse.json({
      error
    }, {
      status: 500
    });
  }
}
