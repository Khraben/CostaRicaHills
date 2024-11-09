import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [userPhoto, setUserPhoto] = useState('src/assets/userDefault.jpg');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setUserPhoto(user.photoURL);
      } else {
        setUserPhoto('src/assets/userDefault.jpg');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userPhoto, setUserPhoto }}>
      {children}
    </UserContext.Provider>
  );
};

