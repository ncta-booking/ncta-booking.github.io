import React from 'react';
import { getServices } from '../data/mockData';
import { useI18n } from '../i18n/LanguageContext';
import { ServiceItem } from '../types';
import { Sparkles, Wrench, PackageCheck, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { t, lang } = useI18n();
  const SERVICES_DATA = getServices(lang);
  const getIcon = (name: string, color: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" style={{ color }} />;
      case 'Wrench':
        return <Wrench className="w-6 h-6" style={{ color }} />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6" style={{ color }} />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" style={{ color }} />;
      default:
        return <Sparkles className="w-6 h-6" style={{ color }} />;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#0a0a0f] border-t border-white/5 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#8b2fe8]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-[#00e5ff]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-[#f00ac0] text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('services.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            {t('services.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff]">{t('services.titleHighlight')}</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            {t('services.subtitle')}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              className="group relative rounded-3xl bg-[#12121c] border border-white/10 hover:border-purple-500/50 p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div>
                {/* Header Icon + Accent */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-lg"
                    style={{
                      backgroundColor: `${srv.accentColor}15`,
                      borderColor: `${srv.accentColor}40`,
                      boxShadow: `0 0 20px ${srv.accentColor}25`
                    }}
                  >
                    {getIcon(srv.iconName, srv.accentColor)}
                  </div>

                  <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 font-semibold">
                    {t('services.cardLabel')}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium mt-1 mb-3 italic" style={{ color: srv.accentColor }}>
                  "{srv.tagline}"
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Feature checklist */}
                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: srv.accentColor }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => onSelectService(srv)}
                  className="w-full py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30 text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#f00ac0] group-hover:to-[#8b2fe8] group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(240,10,192,0.4)]"
                >
                  <span>{srv.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Bottom Glow Line */}
              <div
                className="absolute bottom-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to right, transparent, ${srv.accentColor}, transparent)` }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
