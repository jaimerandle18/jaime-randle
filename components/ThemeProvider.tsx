"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Ctx = {
  dark: boolean;
  setDark: (v: boolean, animate?: boolean) => void;
};

const ThemeContext = createContext<Ctx | null>(null);

function applyClass(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDarkState] = useState(false);

  useEffect(() => {
    // Sync from what the pre-hydration script already applied
    setDarkState(document.documentElement.classList.contains("dark"));
  }, []);

  const setDark = useCallback((v: boolean, animate = true) => {
    const commit = () => {
      applyClass(v);
      window.localStorage.setItem("theme", v ? "dark" : "light");
      setDarkState(v);
    };

    const vt = (
      document as Document & {
        startViewTransition?: (cb: () => void) => void;
      }
    ).startViewTransition;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (animate && vt && !reduce) {
      vt.call(document, commit);
    } else {
      commit();
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
