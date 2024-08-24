import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvaider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((perv) => !perv);
  };

  const value = { isDark, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
