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

// Debug logs — keep these for now
console.log("MODE:", import.meta.env.MODE);                     // "development" or "production"
console.log("Is DEV?", import.meta.env.DEV);                    // true/false
console.log("Loaded Firebase config:", firebaseConfig);        // should show real values in dev
console.log("API Key present?", !!import.meta.env.VITE_FIREBASE_API_KEY);
// Debug log (remove in prod)
console.log("Firebase config loaded:", {
  projectId: firebaseConfig.projectId,
  hasApiKey: !!firebaseConfig.apiKey
});

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);