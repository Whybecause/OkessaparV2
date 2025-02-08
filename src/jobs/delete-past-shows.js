import cron from "node-cron";
import { db } from "@/firebase/db";

// Planifier la suppression des shows passés
const deleteExpiredShows = async () => {
  try {
    const today = new Date();
    // Pour éviter que la suppression ne se produise avant que la journée ne commence, on ajoute un jour.
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    console.log('Running cron job...');

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
  } catch (error) {
    console.error("Error during scheduled cleanup:", error);
  }
};

// cron.schedule("0 0 * * *", deleteExpiredShows);  // Lancer tous les jours à minuit
cron.schedule("*/1 * * * *", deleteExpiredShows); // Toutes les 1 minutes pour test
