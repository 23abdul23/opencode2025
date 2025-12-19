"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "rose" | "thunder";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme;
    const root = document.documentElement;
    if (savedTheme && ["dark", "light", "rose", "thunder"].includes(savedTheme)) {
      setTheme(savedTheme);
      root.classList.remove("dark", "light", "rose", "thunder");
      root.classList.add(savedTheme);
    } else {
      root.classList.remove("dark", "light", "rose", "thunder");
      root.classList.add("light");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    localStorage.setItem("theme", theme);
    root.classList.remove("dark", "light", "rose", "thunder");
    root.classList.add(theme);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
