"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";
import { ui, contactInfo } from "@/lib/content";

const links = [
  { href: "#work", key: "work" as const },
  { href: "#experience", key: "experience" as const },
  { href: "#about", key: "about" as const },
  { href: "#contact", key: "contact" as const },
];

export function Nav() {
  const { t, locale, toggle } = useLang();
  const { dark, setDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? "glass border border-line shadow-soft"
            : "border border-transparent"
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-display text-[15px] font-bold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-[13px] font-bold text-bg transition-transform duration-300 group-hover:-rotate-6">
            JR
          </span>
          <span className="hidden sm:block">Jaime Randle</span>
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-lav-wash hover:text-ink"
            >
              {t(ui.nav[l.key])}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-card text-ink-soft transition-colors hover:border-lav/40 hover:text-ink md:hidden"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="flex items-center gap-1 rounded-lg border border-line bg-card px-2.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-lav/40 hover:text-ink"
          >
            <span className={locale === "en" ? "text-ink" : "text-muted"}>EN</span>
            <span className="text-line">/</span>
            <span className={locale === "es" ? "text-ink" : "text-muted"}>ES</span>
          </button>

          <a
            href={contactInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-ink px-3.5 py-1.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 sm:block"
          >
            {t(ui.nav.resume)}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-card text-ink md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass absolute top-[70px] left-4 right-4 z-50 rounded-2xl border border-line p-2 shadow-lift md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-ink-soft hover:bg-lav-wash hover:text-ink"
              >
                {t(ui.nav[l.key])}
              </a>
            ))}
            <a
              href={contactInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block rounded-lg bg-ink px-4 py-3 text-center text-sm font-semibold text-bg"
            >
              {t(ui.nav.resume)}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
