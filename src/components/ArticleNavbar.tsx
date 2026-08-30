import React, { useEffect, useState } from 'react';
import { ArrowLeft, Zap } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * Slimmed-down navbar for the standalone /show/<id>/ pages.
 *
 * The home Navbar is built around in-page anchors and a scroll-spy over the
 * landing sections — none of which exist here — so the article pages get their
 * own bar: brand, a back link, the language switcher and the booking CTA.
 */
export const ArticleNavbar: React.FC = () => {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);

  // Same passive + rAF-throttled pattern as Navbar: only reads scrollY, never
  // layout properties (see the performance rules in CLAUDE.md).
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0f]/90 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl'
          : 'bg-transparent py-5'
      }`}
    >
      {isScrolled && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      )}

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        {/* Brand → home */}
        <a href="/" className="flex min-w-0 items-center gap-2.5" aria-label="NCTA">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] p-[1.5px] shadow-[0_0_15px_rgba(240,10,192,0.4)]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0a0a0f]">
              <Zap className="h-4 w-4 text-[#00e5ff]" />
            </div>
          </div>
          <span className="brand-logo font-display text-xl font-black tracking-wider text-white">
            N<span className="text-[#00e5ff]">C</span>
            <span className="text-[#f00ac0]">TA</span>
          </span>
        </a>

        {/* Back to the portfolio section */}
        <a
          href="/#performances"
          className="ml-1 hidden items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-[#00e5ff] sm:inline-flex"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t('article.backToShows')}
        </a>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href="/#contact"
            className="whitespace-nowrap rounded-xl bg-gradient-to-r from-[#f00ac0] to-[#00e5ff] px-4 py-2 font-display text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_0_18px_rgba(240,10,192,0.35)] transition-transform hover:scale-105 sm:px-5 sm:text-xs"
          >
            {t('nav.bookingCta')}
          </a>
        </div>
      </div>
    </header>
  );
};
