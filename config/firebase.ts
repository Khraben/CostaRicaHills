import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_KEYASTROFIREBASE,
  authDomain: import.meta.env.PUBLIC_KEYASTROFIREBASEDOMAIN,
  projectId: import.meta.env.PUBLIC_KEYASTROFIREBASEID,
  storageBucket: import.meta.env.PUBLIC_KEYASTROFIREBASESTORAGE,
  messagingSenderId: import.meta.env.PUBLIC_KEYASTROFIREBASEMESSAGE,
  appId: import.meta.env.PUBLIC_KEYASTROFIREBASEAPIID 
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

const logOut = () => {
  return signOut(auth);
};

const db = getFirestore(app);
export {db, auth, signInWithGoogle, logOut };