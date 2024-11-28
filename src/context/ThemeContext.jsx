import React, { createContext, useState, useContext } from "react";

// Crea el contexto del tema
const ThemeContext = createContext();
// Crea el proveedor del tema
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setTheme] = useState(false);
  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
