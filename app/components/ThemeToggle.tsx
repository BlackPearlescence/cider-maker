"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const storageKey = "ciderina-theme";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  const storedTheme = window.localStorage.getItem(storageKey);
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="fixed right-4 top-4 z-[100] border border-[var(--cider-border)] bg-[var(--cider-surface)] px-3 py-2 text-xs font-bold uppercase tracking-widest text-[var(--cider-text)] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[var(--cider-border-strong)] hover:bg-[var(--cider-text)] hover:text-[var(--cider-button-text)]"
      aria-label={`Switch to ${nextTheme} mode`}
      suppressHydrationWarning
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};
