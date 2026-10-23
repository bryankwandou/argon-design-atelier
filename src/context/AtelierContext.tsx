import React, { createContext, useContext, useEffect, useState } from 'react';
import idDict from '../locales/id.json';
import enDict from '../locales/en.json';

export type LocaleCode = 'id' | 'en';
export type ThemeMode = 'dark' | 'light';

type Translations = typeof idDict;

interface AtelierContextType {
  locale: LocaleCode;
  setLocale: (loc: LocaleCode) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  t: Translations;
}

const AtelierContext = createContext<AtelierContextType | undefined>(undefined);

export function AtelierProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(() => {
    const saved = localStorage.getItem('argon_atelier_locale');
    return saved === 'id' || saved === 'en' ? saved : 'id';
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('argon_atelier_theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('argon_atelier_theme', theme);
  }, [theme]);

  const setLocale = (loc: LocaleCode) => {
    setLocaleState(loc);
    localStorage.setItem('argon_atelier_locale', loc);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const t = locale === 'id' ? idDict : enDict;

  return (
    <AtelierContext.Provider
      value={{
        locale,
        setLocale,
        theme,
        toggleTheme,
        t,
      }}
    >
      {children}
    </AtelierContext.Provider>
  );
}

export function useAtelier(): AtelierContextType {
  const ctx = useContext(AtelierContext);
  if (!ctx) {
    throw new Error('useAtelier must be used within an AtelierProvider');
  }
  return ctx;
}
