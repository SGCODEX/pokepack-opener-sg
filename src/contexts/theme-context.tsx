
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = "light" | "dark";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "dark", // Fallback for context, actual value from provider
  resolvedTheme: "dark",
  setTheme: () => null,
});

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "pokepack-opener-theme",
  ...props
}: ThemeProviderProps) {
  // Initialize theme with defaultTheme. Ensures server & client initial state match.
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // After component mounts on client, check localStorage and update if necessary.
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme === "light" || storedTheme === "dark") {
      if (theme !== storedTheme) { // Update only if different from current (which was default)
          setThemeState(storedTheme);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]); // Intentionally run once on mount for localStorage check

  // Apply theme to the document root whenever the theme state changes.
  const applyTheme = useCallback((selectedTheme: Theme) => {
    if (typeof window !== 'undefined') { // Guard for safety
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(selectedTheme);
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const setTheme = (newTheme: Theme) => {
    if (typeof window !== "undefined") { // Guard localStorage access
      localStorage.setItem(storageKey, newTheme);
    }
    setThemeState(newTheme);
  };

  // resolvedTheme is a direct reflection of the current theme state.
  // Server: defaultTheme. Client initial: defaultTheme. Client post-useEffect: storedTheme or defaultTheme.
  const resolvedTheme = theme;

  const value = {
    theme,
    resolvedTheme,
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
