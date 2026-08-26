import React, { useEffect, useRef, useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext';
import { LANGUAGES, type Lang } from '../i18n/config';

interface LanguageSwitcherProps {
  /** Extra classes for the trigger button (e.g. full-width on mobile). */
  className?: string;
  /** Anchor the dropdown to the right edge (default) or left. */
  align?: 'left' | 'right';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', align = 'right' }) => {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.label')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#12121c]/80 text-slate-200 hover:text-white hover:border-[#00e5ff]/40 transition-all backdrop-blur-md ${className}`}
      >
        <Globe className="w-4 h-4 text-[#00e5ff]" />
        <span className="text-xs font-mono font-semibold tracking-wide">{current.short}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className={`absolute top-full mt-2 min-w-[180px] rounded-2xl bg-[#0f0f19]/95 border border-purple-500/30 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] p-1.5 z-50 animate-fadeIn ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {LANGUAGES.map((item) => {
            const isActive = item.code === lang;
            if (!item.enabled) {
              return (
                <div
                  key={item.code}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-slate-500 cursor-not-allowed select-none"
                  aria-disabled="true"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <span className="text-base leading-none">{item.flag}</span>
                    <span>{item.label}</span>
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {t('language.comingSoon')}
                  </span>
                </div>
              );
            }
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setLang(item.code as Lang);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#f00ac0]/20 to-[#8b2fe8]/30 text-white border border-[#f00ac0]/40'
                    : 'text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{item.flag}</span>
                  <span>{item.label}</span>
                </span>
                {isActive && <Check className="w-4 h-4 text-[#00e5ff]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
