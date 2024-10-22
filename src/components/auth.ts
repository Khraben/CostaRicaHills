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
            if (typeof window !== 'undefined') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', userName);
            localStorage.setItem('userPhotoUrl', userPhotoUrl);
            }    
        } else {
            // Usuario no autenticado
            isLoggedIn = false;
            userName = '';
            userPhotoUrl = 'src/assets/userDefault.jpg';
            if (typeof window !== 'undefined') {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.removeItem('userName');
                localStorage.removeItem('userPhotoUrl');
            }
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
// Cargar el estado de autenticación desde localStorage al iniciar
if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    userName = localStorage.getItem('userName') || '';
    userPhotoUrl = localStorage.getItem('userPhotoUrl') || 'src/assets/userDefault.jpg';
  }

export {userName,userPhotoUrl, isLoggedIn};