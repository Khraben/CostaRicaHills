import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEYASTROFIREBASE,
  authDomain: import.meta.env.VITE_KEYASTROFIREBASEDOMAIN,
  projectId: import.meta.env.VITE_KEYASTROFIREBASEID,
  storageBucket:import.meta.env.VITE_KEYASTROFIREBASESTORAGE,
  messagingSenderId: import.meta.env.VITE_KEYASTROFIREBASEMESSAGE,
  appId: import.meta.env.VITE_KEYASTROFIREBASEAPIID 
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth };