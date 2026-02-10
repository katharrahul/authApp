// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log("ENV VARS IN PRODUCTION:", {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? "present" : "MISSING",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "MISSING",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "MISSING",
  fullConfig: firebaseConfig  // safe to log — public values
});
// Debug log (remove in prod)
console.log("Firebase config loaded:", {
  projectId: firebaseConfig.projectId,
  hasApiKey: !!firebaseConfig.apiKey
});

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);