import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAuM68J0defIoVhU7eKcefEXvAjavnGy0",
  authDomain: "chiz-attachments.firebaseapp.com",
  databaseURL:
    "https://chiz-attachments-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chiz-attachments",
  storageBucket: "chiz-attachments.firebasestorage.app",
  messagingSenderId: "315621703485",
  appId: "1:315621703485:web:339ed1bd3271725a970f54",
  measurementId: "G-9TH7DZ12MP",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);
