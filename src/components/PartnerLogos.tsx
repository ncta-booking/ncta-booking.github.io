import React from 'react';
import { getPartners } from '../data/mockData';
import { useI18n } from '../i18n/LanguageContext';
import { Sparkles, Trophy } from 'lucide-react';

export const PartnerLogos: React.FC = () => {
  const { t, lang } = useI18n();
  const PARTNERS_DATA = getPartners(lang);
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
    </section>
  );
};
