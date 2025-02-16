import { db } from "@/lib/firebase/db";
import { NextResponse } from "next/server";
import { checkAuth } from "@/utils/auth";
import { errorServer } from "@/utils/error-server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ showId: string }> }
) {
  try {
    await checkAuth();

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

    const updatedShow = {
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

    const data = { id: showRef.id, ...updatedShow }

    return NextResponse.json(
      data,
      { status: 200 }
    );
  } catch (error) {
    return errorServer('Erreur lors de la modification du show:', error, 500);
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ showId: string }> }
) {
  try {
    await checkAuth();

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
    return errorServer('Erreur lors de la suppression du show:', error, 500);

  }
}
