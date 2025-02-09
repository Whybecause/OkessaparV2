import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

import serviceAccountDev from "./firebase-admin-dev.json";
import serviceAccountProd from "./firebase-admin-prod.json";

const isProd = process.env.NODE_ENV === "production";

let app;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(
      isProd
        ? serviceAccountProd as admin.ServiceAccount
        : serviceAccountDev as admin.ServiceAccount
    )
  });
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
