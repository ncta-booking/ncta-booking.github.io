import React from 'react';
import { ArrowDown, Play, Sparkles, Wand2, Eye, ShieldCheck, Flame, Compass } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreGear: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreGear }) => {
  const { t } = useI18n();
  const scrollToPerformances = () => {
    const el = document.getElementById('performances');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGear = () => {
    const el = document.getElementById('gear');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Graphic & Light Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large neon blurred ambient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#f00ac0]/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-[#00e5ff]/15 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 left-1/3 w-[26rem] h-[26rem] bg-[#8b2fe8]/20 rounded-full blur-[130px]" />

        {/* Ambient Dark Grid */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Diagonal Light Streak */}
        <div className="absolute top-0 right-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-[#00e5ff]/20 to-transparent rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161622]/90 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(240,10,192,0.25)] mb-6 animate-float-slow">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
          </span>
          <span className="text-xs font-mono tracking-wider uppercase text-slate-300">
            {t('hero.badgeOfficial')} • <span className="text-[#00e5ff] font-semibold">led2toy.com</span>
          </span>
          <span className="text-purple-400 text-xs">• {t('hero.badgeStudio')}</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight leading-[1.08] max-w-5xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            {t('hero.titleLine1')}
          </span>
          <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] drop-shadow-[0_0_35px_rgba(240,10,192,0.45)]">
            {t('hero.titleLine2')}
          </span>
        </h1>

        {/* Dynamic Subheadline */}
        <p className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed">
          {t('hero.subheadBefore')}<span className="text-white font-medium underline decoration-[#00e5ff] decoration-2 underline-offset-4">{t('hero.subheadHighlight')}</span>{t('hero.subheadAfter')}
          <span className="block mt-2 text-slate-400 text-sm sm:text-base">
            {t('hero.subheadSecondary')}
          </span>
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Main CTA */}
          <button
            id="hero-book-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto group relative px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base tracking-wider uppercase overflow-hidden shadow-[0_0_30px_rgba(240,10,192,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(240,10,192,0.7)] hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] transition-all duration-500 group-hover:scale-110" />
            <div className="relative z-10 flex items-center justify-center gap-2.5 text-white">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{t('hero.btnBook')}</span>
            </div>
          </button>

          {/* Secondary CTA */}
          <button
            id="hero-watch-btn"
            onClick={scrollToPerformances}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base tracking-wider uppercase bg-[#14141e]/90 hover:bg-[#1c1c2b] text-slate-200 hover:text-white border border-slate-700/60 hover:border-[#00e5ff]/60 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg group hover:scale-105"
          >
            <Play className="w-4 h-4 text-[#00e5ff] fill-[#00e5ff] group-hover:scale-110 transition-transform" />
            <span>{t('hero.btnWatch')}</span>
          </button>

          {/* Third Mini CTA - Gear */}
          <button
            id="hero-gear-quick-btn"
            onClick={scrollToGear}
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-display font-medium text-xs sm:text-sm tracking-wider uppercase bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 hover:text-white border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Wand2 className="w-4 h-4 text-[#ff8a00]" />
            <span>{t('hero.btnExplore')}</span>
          </button>
        </div>

        {/* Featured Flow Props Quick Filter Strip */}
        <div className="mt-14 w-full max-w-4xl pt-8 border-t border-white/10">
          <p className="text-xs font-mono text-slate-400 tracking-widest uppercase mb-4">
            {t('hero.propsStripTitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            {[
              { name: 'Visual Pixel Poi', count: t('hero.propCountPoi'), color: '#f00ac0' },
              { name: 'Dragon Staff LED', count: t('hero.propCountStaff'), color: '#00e5ff' },
              { name: 'HyperLoop LED Hoop', count: t('hero.propCountHoop'), color: '#8b2fe8' },
              { name: 'Cyber Silk Fans', count: t('hero.propCountFan'), color: '#ff8a00' },
              { name: 'Juggling Clubs', count: t('hero.propCountClub'), color: '#00ff88' },
            ].map((prop, idx) => (
              <button
                key={idx}
                onClick={scrollToGear}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12121c]/90 border border-white/10 hover:border-white/30 text-xs transition-all duration-300 hover:scale-105"
              >
                <span
                  className="w-2 h-2 rounded-full shadow-[0_0_8px]"
                  style={{ backgroundColor: prop.color, boxShadow: `0 0 8px ${prop.color}` }}
                />
                <span className="text-slate-200 group-hover:text-white font-medium">{prop.name}</span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">({prop.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Floating Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 opacity-75 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
            {t('hero.scrollHint')}
          </span>
          <button
            onClick={scrollToPerformances}
            aria-label="Scroll to content"
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all animate-bounce"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
