import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.GOOGLE_API,
  authDomain: "cambuzz-b0650.firebaseapp.com",
  projectId: "cambuzz",
  storageBucket: "cambuzz.appspot.com",
  messagingSenderId: "975221608187",
  appId: "1:975221608187:web:5b542e2a3c23fd7546ea5e",
  measurementId: "G-2VXQQN5CR5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
