import { db } from "@/firebase/db";
import { NextResponse } from "next/server";

// Delete shows from DB after the date is passed
// Scheduling of this cron is defined in vercel.json
export async function GET() {
  try {
    const today = new Date();

    // Pour éviter que la suppression ne se produise avant que la journée ne commence, on ajoute un jour.
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    console.log('Running cron job delete-past-shows...');

    const showsSnapshot = await db.collection("shows").get();

    showsSnapshot.forEach(async (doc) => {
      const show = doc.data();
      const showDate = show.date ? show.date.toDate() : null;

      // Vérifie si la date du show est dans le passé par rapport à "demain"
      if (showDate && showDate < nextDay) {
        // Supprimer le show de la base de données
        await db.collection("shows").doc(doc.id).delete();
        console.log(`Show with id ${doc.id} deleted`);
      }
    });
    return NextResponse.json("All past shows deleted")
  } catch (error) {
    console.error("Error during scheduled cleanup:", error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
