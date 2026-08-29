import React, { useState } from 'react';
import { getProps } from '../data/mockData';
import { useI18n } from '../i18n/LanguageContext';
import { LEDProp, PropCategory } from '../types';
import { unsplashSrcSet } from '../utils/images';
import { Zap, Cpu, Battery, Radio, Shield, Sparkles, ArrowRight, Check, SlidersHorizontal, Flame } from 'lucide-react';

interface GearShowcaseProps {
  onSelectProp: (prop: LEDProp) => void;
  onInquireProp: (prop: LEDProp) => void;
}

export const GearShowcase: React.FC<GearShowcaseProps> = ({ onSelectProp, onInquireProp }) => {
  const { t, lang } = useI18n();
  const PROPS_DATA = getProps(lang);
  const [activeCategory, setActiveCategory] = useState<PropCategory>('all');

  const categories: { key: PropCategory; label: string; iconLabel: string; color: string }[] = [
    { key: 'all', label: t('gear.catAll'), iconLabel: 'ALL', color: '#f00ac0' },
    { key: 'poi', label: t('gear.catPoi'), iconLabel: 'POI', color: '#f00ac0' },
    { key: 'staff', label: t('gear.catStaff'), iconLabel: 'STAFF', color: '#00e5ff' },
    { key: 'hoop', label: t('gear.catHoop'), iconLabel: 'HOOP', color: '#8b2fe8' },
    { key: 'fan', label: t('gear.catFan'), iconLabel: 'FANS', color: '#ff8a00' },
    { key: 'club', label: t('gear.catClub'), iconLabel: 'CLUBS', color: '#00ff88' },
  ];

  const filteredProps = activeCategory === 'all'
    ? PROPS_DATA
    : PROPS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="gear" className="relative py-24 bg-[#0a0a0f] border-t border-white/5 overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 bg-[#f00ac0]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-[#f00ac0] text-xs font-mono tracking-widest uppercase mb-3">
            <Zap className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>{t('gear.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            {t('gear.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff]">{t('gear.titleHighlight')}</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            {t('gear.subtitle')}
          </p>
        </div>

        {/* Circular Interactive Category Selector (lighttoys.cz inspired).
            justify-start on mobile keeps the first item ("ALL") reachable when
            the strip overflows and is swiped; centered only once it fits (lg). */}
        <div className="flex items-center justify-start lg:justify-center gap-3 sm:gap-6 overflow-x-auto overscroll-x-contain snap-x pb-4 mb-14 px-4 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`group flex flex-col items-center gap-2.5 p-2 rounded-2xl transition-all duration-300 shrink-0 snap-start min-w-[80px] sm:min-w-[100px] ${
                  isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {/* Circular Glowing Thumbnail */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-display font-bold text-xs sm:text-sm tracking-wider transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-tr from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] text-white shadow-[0_0_25px_rgba(240,10,192,0.6)] border-2 border-white'
                      : 'bg-[#151522] text-slate-300 border border-white/10 group-hover:border-white/40 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                  }`}
                >
                  {cat.iconLabel}
                </div>
                <span
                  className={`text-xs font-medium tracking-tight text-center ${
                    isActive ? 'text-white font-semibold' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProps.map((prop) => (
            <div
              key={prop.id}
              className="group relative rounded-3xl bg-[#12121c] border border-white/10 hover:border-purple-500/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between"
            >
              {/* Card Header & Visual Image */}
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-black/40">
                  <img
                    src={prop.image}
                    srcSet={unsplashSrcSet(prop.image)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    alt={prop.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md text-white"
                      style={{ backgroundColor: `${prop.accentColor}cc` }}
                    >
                      {prop.category.toUpperCase()}
                    </span>

                    {prop.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00ff88]/90 text-black text-[10px] font-bold font-mono uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,136,0.6)]">
                        {prop.badge}
                      </span>
                    )}
                  </div>

                  {/* Quick Tech Specs Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-around text-slate-300 text-[11px] font-mono">
                    <div className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-[#00e5ff]" />
                      <span>{prop.specs.ledCount.split(' ')[0]} LEDs</span>
                    </div>
                    <div className="w-[1px] h-3 bg-white/20" />
                    <div className="flex items-center gap-1">
                      <Battery className="w-3.5 h-3.5 text-[#00ff88]" />
                      <span>{prop.specs.batteryLife.split(' ')[0]}h</span>
                    </div>
                    <div className="w-[1px] h-3 bg-white/20" />
                    <div className="flex items-center gap-1">
                      <Radio className="w-3.5 h-3.5 text-[#f00ac0]" />
                      <span>Sync</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                    {prop.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5 mb-3 font-mono">
                    {prop.vietnameseName}
                  </p>
                  <p className="text-xs text-purple-300/90 font-medium mb-3 italic">
                    "{prop.tagline}"
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {prop.description}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    {prop.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#00e5ff] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => onSelectProp(prop)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-white/30 text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>{t('gear.btnSpecs')}</span>
                </button>

                <button
                  onClick={() => onInquireProp(prop)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#f00ac0] to-[#8b2fe8] text-white text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(240,10,192,0.3)] hover:shadow-[0_0_25px_rgba(240,10,192,0.5)] transition-all hover:scale-102 flex items-center justify-center gap-1.5"
                >
                  <span>{t('gear.btnInquire')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Glow Line */}
              <div
                className="absolute bottom-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to right, transparent, ${prop.accentColor}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* Custom Order Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#141422] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff8a00] to-[#f00ac0] flex items-center justify-center shadow-[0_0_20px_rgba(255,138,0,0.4)] shrink-0">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-display font-bold text-white">
                {t('gear.customTitle')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t('gear.customDesc')}
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-[#1f1f32] hover:bg-[#282842] text-white border border-[#00e5ff]/40 hover:border-[#00e5ff] text-xs font-mono font-semibold tracking-wider uppercase transition-all shadow-md"
          >
            {t('gear.customBtn')}
          </a>
        </div>

      </div>
    </section>
  );
};
