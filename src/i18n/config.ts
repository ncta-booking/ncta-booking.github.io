// Central i18n configuration for LED2TOY.
// To add a new language later (e.g. Chinese): add its code to the `Lang`
// union, flip `enabled: true` in LANGUAGES, then fill the matching branches
// in `translations.ts` and the localized data in `data/mockData.ts`.

export type Lang = 'vi' | 'en'; // future: | 'zh'

export const DEFAULT_LANG: Lang = 'vi';
export const STORAGE_KEY = 'led2toy-lang';

export interface LanguageMeta {
  /** BCP-47-ish language code used everywhere in the app. */
  code: Lang | 'zh';
  /** Native label shown in the dropdown. */
  label: string;
  /** Short code shown on the compact navbar button. */
  short: string;
  /** Small flag/emoji shown next to the label. */
  flag: string;
  /** When false the option is displayed as "coming soon" and is not selectable. */
  enabled: boolean;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'vi', label: 'Tiếng Việt', short: 'VN', flag: '🇻🇳', enabled: true },
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧', enabled: true },
  // Prepared for a future update — the switcher renders this as "soon".
  { code: 'zh', label: '中文', short: 'ZH', flag: '🇨🇳', enabled: false },
];

/** Detect the best initial language from the visitor's browser. */
export function detectBrowserLang(): Lang {
  if (typeof navigator === 'undefined') return DEFAULT_LANG;
  const candidates = [navigator.language, ...(navigator.languages ?? [])];
  for (const raw of candidates) {
    if (!raw) continue;
    const code = raw.toLowerCase();
    if (code.startsWith('vi')) return 'vi';
    if (code.startsWith('en')) return 'en';
  }
  return DEFAULT_LANG;
}
