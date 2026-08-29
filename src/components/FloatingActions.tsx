import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle, ArrowUp, X, Headphones } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext';
import { WhatsAppIcon } from './BrandIcons';

// Kept in sync with ContactSection.tsx.
const HOTLINE_LOCAL = '0906790700'; // tel: + Zalo
const HOTLINE_INTL = '84906790700'; // WhatsApp needs country code, no leading 0

/**
 * Two floating helpers, fixed to the bottom of the viewport:
 *  - Back-to-top on the LEFT (fades in after the visitor scrolls down).
 *  - A contact FAB on the RIGHT that expands into call / Zalo / WhatsApp.
 * The tel:/Zalo/WhatsApp links are real anchors, so they work from the static
 * prerendered HTML even before hydration.
 */
export const FloatingActions: React.FC = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // Reveal back-to-top past the first screen. Passive + rAF, reads only
  // scrollY (never layout) per the project perf rules.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShowTop(window.scrollY > 500);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the contact menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const options = [
    {
      key: 'call',
      label: t('fab.call'),
      href: `tel:${HOTLINE_LOCAL}`,
      ring: 'from-[#f00ac0] to-[#ff8a00]',
      icon: <Phone className="w-5 h-5" />,
      external: false,
    },
    {
      key: 'zalo',
      label: t('fab.zalo'),
      href: `https://zalo.me/${HOTLINE_LOCAL}`,
      ring: 'from-[#0068FF] to-[#0047b3]',
      icon: <MessageCircle className="w-5 h-5" />,
      external: true,
    },
    {
      key: 'whatsapp',
      label: t('fab.whatsapp'),
      href: `https://wa.me/${HOTLINE_INTL}`,
      ring: 'from-[#25D366] to-[#128C7E]',
      icon: <WhatsAppIcon className="w-5 h-5" />,
      external: true,
    },
  ];

  return (
    <>
      {/* Back to top — bottom LEFT */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={t('fab.backToTop')}
        className={`fixed bottom-5 left-4 sm:left-6 z-40 w-12 h-12 rounded-full bg-[#12121c]/90 border border-white/15 text-slate-200 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-300 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 hover:-translate-y-0.5 active:scale-95 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Click-away layer while the contact menu is open */}
      {open && <div className="fixed inset-0 z-30" aria-hidden="true" onClick={() => setOpen(false)} />}

      {/* Contact FAB — bottom RIGHT */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-40">
        {/* Options float above the button (absolute → never reserve space when closed) */}
        <div
          className={`absolute bottom-16 right-0 flex flex-col items-end gap-3 transition-all duration-300 ${
            open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          {options.map((o) => (
            <a
              key={o.key}
              href={o.href}
              {...(o.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3"
            >
              <span className="px-3 py-1.5 rounded-lg bg-[#12121c]/95 border border-white/10 text-slate-100 text-sm font-medium whitespace-nowrap backdrop-blur-md shadow-lg">
                {o.label}
              </span>
              <span
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${o.ring} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-active:scale-95`}
              >
                {o.icon}
              </span>
            </a>
          ))}
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t('fab.close') : t('fab.contact')}
          aria-expanded={open}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] text-white flex items-center justify-center shadow-[0_0_25px_rgba(240,10,192,0.5)] transition-transform hover:scale-105 active:scale-95"
        >
          {!open && <span className="absolute inset-0 rounded-full animate-ping bg-[#f00ac0]/30" />}
          <span className="relative">
            {open ? <X className="w-6 h-6" /> : <Headphones className="w-6 h-6" />}
          </span>
        </button>
      </div>
    </>
  );
};
