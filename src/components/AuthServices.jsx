// auth.ts
import { auth } from "../config/firebase.js";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Iniciar sesión con Google
export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    return true;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    return false;
  }
}
export async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return false;
  }
}
export async function registerUser(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: "src/assets/userDefault.jpg",
      });
    }
    return true;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Error: El correo electrónico ya está en uso.");
    } else if (error.code === "auth/weak-password") {
      alert(
        "Error: La contraseña es demasiado débil. Debe tener al menos 6 caracteres."
      );
    } else {
      console.error("Error durante el registro:", error);
    }
    return false;
  }
}
export async function logoutUser() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
}
