
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = "light" | "dark"; // "system" removed

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme; // Will default to "dark"
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: "light" | "dark"; // resolvedTheme will be same as theme
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "dark", // Default to dark
  resolvedTheme: "dark", 
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark", // Default theme is now dark
  storageKey = "pokepack-opener-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      // Ensure that only "light" or "dark" are read from localStorage
      const storedTheme = localStorage.getItem(storageKey) as Theme;
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }
    }
    return defaultTheme;
  });

  // resolvedTheme will always be the same as theme since "system" is removed
  const resolvedTheme = theme; 

  const applyTheme = useCallback((selectedTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(selectedTheme);
  }, []);


  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // System theme change listener is removed as "system" option is no longer available

  const setTheme = (newTheme: Theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newTheme);
    }
    setThemeState(newTheme);
  };

  const value = {
    theme,
    resolvedTheme, // This will be 'light' or 'dark'
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

