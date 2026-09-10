"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { L, Locale } from "@/lib/content";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  /** pick the current-locale value from an { en, es } object */
  t: <T>(value: Record<Locale, T>) => T;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("locale") as Locale | null;
    if (stored === "en" || stored === "es") {
      setLocaleState(stored);
    } else if (navigator.language.toLowerCase().startsWith("es")) {
      setLocaleState("es");
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("locale", l);
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "es" : "en";
      window.localStorage.setItem("locale", next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  const t = useCallback(
    <T,>(value: Record<Locale, T>): T => value[locale],
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

/** Convenience for typing inline objects. */
export type { L };
