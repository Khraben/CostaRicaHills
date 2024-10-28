// auth.ts
import { auth } from '../../config/firebase.ts';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
let isLoggedIn: Boolean; 
let userName: string;
let userPhotoUrl='src/assets/userDefault.jpg';
let userId= '';
export function listenForAuthChanges() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn = true;
            userName = user.displayName || user.email;
            userPhotoUrl = user.photoURL|| 'src/assets/userDefault.jpg';
            userId= user.uid;
            if (typeof window !== 'undefined') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', userName);
            localStorage.setItem('userPhotoUrl', userPhotoUrl);
            localStorage.setItem('userId', userId);
            window.dispatchEvent(new Event('storage'));
            
            }    
        } else {
            // Usuario no autenticado
            isLoggedIn = false;
            userName = '';
            userPhotoUrl = 'src/assets/userDefault.jpg';
            userId = '';
            if (typeof window !== 'undefined') {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.removeItem('userName');
                localStorage.removeItem('userPhotoUrl');
                localStorage.removeItem('userId');
                window.dispatchEvent(new Event('storage'));
            }
        }
    });
}
// Iniciar sesión con Google
export async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user) {
            listenForAuthChanges()
        }
        console.log('User logged in:', user);
        return true;
    } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
        return false;
    }
}
export async function loginUser(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
            listenForAuthChanges();
        }
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
        listenForAuthChanges();
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
    userId = localStorage.getItem('userId') || '';
  }

export {userName,userPhotoUrl, isLoggedIn};