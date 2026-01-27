//src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

//Create the Context
const ThemeContext = createContext();

//Define the Provider Component
export const ThemeProvider = ({ children }) => {
  //Check local storage for saved theme preference, default to 'dark' if none found
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    //Default to 'dark'
    return savedTheme || 'dark'; 
  });

  //effect to apply  'dark' class to the HTML root element
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  //Function to toggle between themes
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//Custom hook for consuming the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};