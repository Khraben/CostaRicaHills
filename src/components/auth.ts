// auth.ts
import { auth,toggleModal } from '/config/firebase.ts';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
let isLoggedIn: Boolean; 
let userName: string;
let userPhotoUrl;
export function listenForAuthChanges() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn = true;
            userName = user.displayName || user.email;
            userPhotoUrl = user.photoURL;
        } else {
            // Usuario no autenticado
            isLoggedIn = false;
            userName = '';
            userPhotoUrl = 'src/assets/userDefault.jpg';
        }
    });
}
// Iniciar sesión con Google
export async function loginWithGoogle() {
    try {
        await toggleModal();
        return true;
    } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
        return false;
    }
}
export async function loginUser(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return false;
    }
}
export async function logoutUser() {
    try {
        await signOut(auth);
        listenForAuthChanges();
        return true;
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return false;
    }
}
export {userName,userPhotoUrl, isLoggedIn};