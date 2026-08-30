import React from 'react';
import { getPartners } from '../data/mockData';
import { useI18n } from '../i18n/LanguageContext';
import { Trophy } from 'lucide-react';

export const PartnerLogos: React.FC = () => {
  const { t, lang } = useI18n();
  const PARTNERS_DATA = getPartners(lang);
  // Two identical tracks side by side; the CSS animation shifts -50% so the
  // seam is invisible. aria-hidden on the clone keeps it out of the a11y tree.
  const marqueeTrack = [...PARTNERS_DATA, ...PARTNERS_DATA];

  return (
    <section id="partners" className="py-16 bg-[#0a0a0f] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Trophy className="w-4 h-4 text-[#ff8a00]" />
          <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
            {t('partners.title')}
          </span>
        </div>

        {/* Partner Logo Marquee Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
          {PARTNERS_DATA.map((partner, idx) => (
            <div
              key={idx}
              className="group p-4 rounded-2xl bg-[#12121c]/60 border border-white/5 hover:border-white/20 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-default"
            >
              <div
                className="font-display font-black text-sm tracking-wider text-slate-400 group-hover:text-white transition-all group-hover:scale-105"
                style={{
                  transition: 'all 0.3s ease'
                }}
              >
                <span className="group-hover:drop-shadow-[0_0_12px_currentColor]" style={{ color: partner.accent }}>
                  {partner.logoText}
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase tracking-tight">
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand logo strip — edge-to-edge auto-scrolling marquee */}
      <div className="mt-12 pt-10 border-t border-white/5">
        <p className="text-center text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-7">
          {t('partners.logosCaption')}
        </p>

        <div className="logo-marquee-mask w-full max-w-full overflow-hidden">
          <div className="flex w-max animate-logo-marquee items-center gap-6 sm:gap-10">
            {marqueeTrack.map((partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                aria-hidden={idx >= PARTNERS_DATA.length}
                className="group shrink-0 flex h-20 w-40 sm:h-24 sm:w-52 items-center justify-center rounded-2xl border border-white/5 bg-[#12121c]/50 px-5 transition-colors duration-300 hover:border-white/20"
              >
                <img
                  src={partner.logoSrc}
                  alt={partner.name}
                  width={260}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full max-w-full opacity-45 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
