import React, { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANG, STORAGE_KEY, detectBrowserLang, type Lang } from './config';
import { translations } from './translations';

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Resolve a dot-path key (e.g. `t('nav.home')`) for the active language. */
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/** Read the persisted language, falling back to the `?lang=` URL param, then browser detection. */
function getInitialLang(): Lang {
  if (typeof window !== 'undefined') {
    const fromQuery = new URLSearchParams(window.location.search).get('lang');
    if (fromQuery === 'vi' || fromQuery === 'en') return fromQuery;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'vi' || stored === 'en') return stored;
  }
  return detectBrowserLang();
}

/** Walk a dot-path (`a.b.c`) inside a translation tree. */
function resolvePath(tree: unknown, key: string): string | undefined {
  const value = key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, tree);
  return typeof value === 'string' ? value : undefined;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  // Keep <html lang="…"> in sync for accessibility & SEO.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      return (
        resolvePath(translations[lang], key) ??
        resolvePath(translations[DEFAULT_LANG], key) ??
        key
      );
    },
    [lang],
  );

  const value = useMemo<I18nContextValue>(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within a <LanguageProvider>');
  }
  return ctx;
}
