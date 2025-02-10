import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MEASUREMENT_ID
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export { app };
