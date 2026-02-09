// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAKqdHdrtcBEeSQ4uCjNS9Q4tzykUGcPOQ",
//   authDomain: "auth-demo-e80b3.firebaseapp.com",
//   projectId: "auth-demo-e80b3",
//   storageBucket: "auth-demo-e80b3.firebasestorage.app",
//   messagingSenderId: "153306608019",
//   appId: "1:153306608019:web:c37bfeb7e0d8f171867866"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
console.log("firebase.js is running!")
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ← Replace with YOUR real Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAKqdHdrtcBEeSQ4uCjNS9Q4tzykUGcPOQ",
  authDomain: "auth-demo-e80b3.firebaseapp.com",
  projectId: "auth-demo-e80b3",
  storageBucket: "auth-demo-e80b3.firebasestorage.app",
  messagingSenderId: "153306608019",
  appId: "1:153306608019:web:c37bfeb7e0d8f171867866"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app);  // should print an object, not undefined

export const auth = getAuth(app);
export const db   = getFirestore(app);