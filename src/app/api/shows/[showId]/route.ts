import { db } from "@/firebase/db";
import { NextResponse } from "next/server";
import { Shows } from "../route";

export async function PATCH(
  req: Request,
  context: { params: { showId: string } }
) {
  try {
    const { showId } = await context.params;

    if (!showId) {
      return NextResponse.json(
        { error: "Missing showId" },
        { status: 400 }
      )
    }
    const body = await req.json();
    const { city, country, date, venue, ticketLink } = body;

    if (!country || !city || !date || !venue) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    const updatedShow: Shows = {
      date: new Date(date),
      country,
      venue,
      city,
      ticketLink,
      updatedAt: new Date(),
    }

    const showRef = db.collection("shows").doc(showId);
    const showDoc = await showRef.get();

    if (!showDoc.exists) {
      return NextResponse.json(
        { error: "Show not found" },
        { status: 404 }
      );
    }

    await showRef.update(updatedShow);

    return NextResponse.json(
      updatedShow,
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la modification du show', error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: { showId: string } }
) {
  try {
    const { showId } = await context.params;

    if (!showId) {
      return NextResponse.json(
        { error: "Missing showId" },
        { status: 400 }
      )
    }

    const showRef = db.collection("shows").doc(showId)
    const showDoc = await showRef.get();

    if (!showDoc.exists) {
      return NextResponse.json(
        { error: "Show not found" },
        { status: 404 }
      );
    }

    await showRef.delete();
    return NextResponse.json(showRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du show:', error);

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
