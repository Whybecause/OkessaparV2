import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { writeFileSync } from "fs";
import { join } from "path";

const serviceAccountJson = process.env.FIREBASE_ADMIN

if (!serviceAccountJson) {
  throw new Error("Firebase service account credentials are missing!");
}

const tempFilePath = join("/tmp", "firebase-admin.json");
writeFileSync(tempFilePath, serviceAccountJson);

let app;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(tempFilePath)
  });
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
