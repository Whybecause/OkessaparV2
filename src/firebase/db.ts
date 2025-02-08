import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";

import serviceAccount from "./firebase-admin.json";

let app;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount as admin.ServiceAccount)
  });
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { db };
