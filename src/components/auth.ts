// auth.ts
import { auth } from '../../config/firebase.ts';
import { createSignal } from 'solid-js';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
const [isLoggedIn, setIsLoggedIn] = createSignal(false);
const [userName, setUserName] = createSignal('');
const [userPhotoUrl, setUserPhotoUrl] = createSignal('src/assets/userDefault.jpg');
const [userId, setUserId] = createSignal('');

export function listenForAuthChanges() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoggedIn(true);
            setUserName(user.displayName || user.email);
            setUserPhotoUrl(user.photoURL || 'src/assets/userDefault.jpg');
            setUserId(user.uid);
            if (typeof window !== 'undefined') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', user.displayName || user.email);
                localStorage.setItem('userPhotoUrl', user.photoURL || 'src/assets/userDefault.jpg');
                localStorage.setItem('userId', user.uid);
            }
        } else {
            // Usuario no autenticado
            setIsLoggedIn(false);
            setUserName('');
            setUserPhotoUrl('src/assets/userDefault.jpg');
            setUserId('');
            if (typeof window !== 'undefined') {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.removeItem('userName');
                localStorage.removeItem('userPhotoUrl');
                localStorage.removeItem('userId');
            }
        }
    });
}
// Iniciar sesión con Google
export async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
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
export async function registerUser(email: string, password: string, name: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
        await updateProfile(userCredential.user, {
            displayName: name,
            photoURL: 'src/assets/userDefault.jpg'
        });
        }
        return true;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Error: El correo electrónico ya está en uso.');
        } else if (error.code === 'auth/weak-password') {
            alert('Error: La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
        } else {
            console.error('Error durante el registro:', error);
        }
        return false;
    }
}
export async function logoutUser() {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return false;
    }
}
// Cargar el estado de autenticación desde localStorage al iniciar
if (typeof window !== 'undefined') {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    setUserName(localStorage.getItem('userName') || '');
    setUserPhotoUrl(localStorage.getItem('userPhotoUrl') || 'src/assets/userDefault.jpg');
    setUserId(localStorage.getItem('userId') || '');
}
listenForAuthChanges();
export { isLoggedIn, userName, userPhotoUrl,userId  };