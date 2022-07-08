import { ThemeProvider, createTheme } from "@mui/material";
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function ContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);


  const AppTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode
      }}
    >
      <ThemeProvider theme={AppTheme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}