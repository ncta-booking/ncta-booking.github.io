import React, { useState } from 'react';
import { getPerformances } from '../data/mockData';
import { useI18n } from '../i18n/LanguageContext';
import { PerformanceCategory, PerformanceItem } from '../types';
import { Play, Calendar, MapPin, Sparkles, Clock, Layers, ArrowUpRight, Film } from 'lucide-react';

interface PerformancePortfolioProps {
  onSelectPerformance: (perf: PerformanceItem) => void;
}

export const PerformancePortfolio: React.FC<PerformancePortfolioProps> = ({ onSelectPerformance }) => {
  const { t, lang } = useI18n();
  const PERFORMANCES_DATA = getPerformances(lang);
  const [selectedCategory, setSelectedCategory] = useState<PerformanceCategory>('all');

  const categories: { key: PerformanceCategory; label: string }[] = [
    { key: 'all', label: t('performances.catAll') },
    { key: 'festival', label: t('performances.catFestival') },
    { key: 'corporate', label: t('performances.catCorporate') },
    { key: 'stage', label: t('performances.catStage') },
    { key: 'visual_art', label: t('performances.catVisualArt') },
  ];

  const filteredPerformances = selectedCategory === 'all'
    ? PERFORMANCES_DATA
    : PERFORMANCES_DATA.filter((item) => item.category === selectedCategory);

  return (
    <section id="performances" className="relative py-24 bg-[#0d0d14] border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#8b2fe8]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-[#f00ac0]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-mono tracking-widest uppercase mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>Showcase & Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            {t('performances.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#8b2fe8] to-[#f00ac0]">{t('performances.titleHighlight')}</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            {t('performances.subtitle')}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#f00ac0] to-[#00e5ff] text-white font-semibold shadow-[0_0_20px_rgba(240,10,192,0.4)] scale-105'
                    : 'bg-[#151522] text-slate-300 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Performance Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPerformances.map((perf) => (
            <div
              key={perf.id}
              onClick={() => onSelectPerformance(perf)}
              className="group relative rounded-2xl bg-[#12121c] border border-white/10 hover:border-[#00e5ff]/60 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,229,255,0.25)] flex flex-col cursor-pointer"
            >
              {/* Media Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={perf.image}
                  alt={perf.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121c] via-transparent to-transparent opacity-90" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#f00ac0] to-[#00e5ff] flex items-center justify-center shadow-[0_0_25px_rgba(0,229,255,0.8)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Top Location & Date Tags */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-slate-200 border border-white/15">
                    <MapPin className="w-3 h-3 text-[#00e5ff]" />
                    {perf.location}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f00ac0]/80 backdrop-blur-md text-[11px] font-mono font-bold text-white shadow-sm">
                    <Clock className="w-3 h-3" />
                    {perf.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{perf.date}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-[#00e5ff] transition-colors line-clamp-1">
                    {perf.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-medium mt-1 mb-3 line-clamp-1 text-[#f00ac0]">
                    {perf.subtitle}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {perf.description}
                  </p>
                </div>

                {/* Props tags & Read more */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[75%]">
                    {perf.propsUsed.map((prop, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
                      >
                        {prop}
                      </span>
                    ))}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-[#00e5ff]/20 group-hover:border group-hover:border-[#00e5ff]/50 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

              </div>

              {/* Bottom Subtle Glowing Border */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Bottom Booking Prompt Bar */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#161626] via-[#1c1c30] to-[#161626] border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          <div>
            <h4 className="text-xl sm:text-2xl font-display font-bold text-white">
              {t('performances.bannerTitle')}
            </h4>
            <p className="text-sm text-slate-400 mt-1">
              {t('performances.bannerDesc')}
            </p>
          </div>

          <a
            href="#contact"
            className="whitespace-nowrap px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#f00ac0] to-[#00e5ff] text-white font-display font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(240,10,192,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all hover:scale-105"
          >
            {t('performances.bannerBtn')}
          </a>
        </div>

      </div>
    </section>
  );
};
