import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API,
  authDomain: import.meta.env.VITE_FIREBASEDOMAIN,
  projectId: import.meta.env.VITE_FIREBASEID,
  storageBucket: import.meta.env.VITE_FIREBASESTORAGE,
  messagingSenderId: import.meta.env.VITE_FIREBASEMESSAGE,
  appId: import.meta.env.VITE_FIREBASEAPIID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
