import React, { useState, useEffect, useRef } from 'react';
import { getStats } from '../data/mockData';
import { useI18n } from '../i18n/LanguageContext';
import { CountUp } from './CountUp';
import { unsplashSrcSet } from '../utils/images';
import { Award, Flame, Cpu, Eye, CheckCircle2, Sparkles, UserCheck, HeartHandshake } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const { t, lang } = useI18n();
  const STATS_DATA = getStats(lang);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-[#0a0a0f] border-t border-white/5 overflow-hidden"
    >
      {/* Decorative Neon Blurs */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-[#f00ac0]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-[#00e5ff]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-[#f00ac0] text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('about.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            {t('about.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff]">NCTA</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Main Content Grid: Image + Bio Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Artist Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md group">
              
              {/* Outer Glowing Frame */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-700" />
              
              <div className="relative rounded-2xl overflow-hidden bg-[#12121c] border border-white/10 aspect-[4/5] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop"
                  srcSet={unsplashSrcSet('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop')}
                  sizes="(min-width: 640px) 448px, 100vw"
                  alt="Nghệ sĩ biểu diễn LED Poi trong đêm"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Dark Gradient Overlay with Info Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#12121e]/85 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-display font-bold text-base">NCTA Studio</h4>
                      <p className="text-[#00e5ff] text-xs font-mono">{t('about.imgRole')}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/40 text-[#00ff88] text-[10px] font-mono font-bold uppercase">
                      {t('about.imgActive')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Pill Experience */}
              <div className="absolute -top-4 -right-4 bg-[#161622] border border-[#f00ac0]/50 px-4 py-2 rounded-2xl shadow-[0_0_20px_rgba(240,10,192,0.4)] flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#ff8a00]" />
                <span className="text-xs font-bold text-white">{t('about.floatingExp')}</span>
              </div>
            </div>
          </div>

          {/* Bio Story & Artistic Philosophy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-3">
                <span>{t('about.bioHeading')}</span>
              </h3>

              <p>
                {t('about.bioP1Before')}<strong className="text-white font-semibold">NCTA</strong>{t('about.bioP1After')}
              </p>

              <p>
                {t('about.bioP2Before')}<strong className="text-[#00e5ff]">Visual Pixel Poi</strong>, <strong className="text-[#f00ac0]">Smart Dragon Staff</strong>, <strong className="text-[#8b2fe8]">LED Hoop</strong> {t('about.bioP2And')} <strong className="text-[#ff8a00]">Cyber Fans</strong>{t('about.bioP2After')}
              </p>

              <p>
                {t('about.bioP3')}
              </p>
            </div>

            {/* 4 Pillars of Excellence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                {
                  icon: Cpu,
                  title: t('about.pillar1Title'),
                  desc: t('about.pillar1Desc'),
                  color: 'text-[#00e5ff]',
                  bg: 'bg-[#00e5ff]/10',
                  border: 'border-[#00e5ff]/30'
                },
                {
                  icon: Eye,
                  title: t('about.pillar2Title'),
                  desc: t('about.pillar2Desc'),
                  color: 'text-[#f00ac0]',
                  bg: 'bg-[#f00ac0]/10',
                  border: 'border-[#f00ac0]/30'
                },
                {
                  icon: Award,
                  title: t('about.pillar3Title'),
                  desc: t('about.pillar3Desc'),
                  color: 'text-[#ff8a00]',
                  bg: 'bg-[#ff8a00]/10',
                  border: 'border-[#ff8a00]/30'
                },
                {
                  icon: HeartHandshake,
                  title: t('about.pillar4Title'),
                  desc: t('about.pillar4Desc'),
                  color: 'text-[#00ff88]',
                  bg: 'bg-[#00ff88]/10',
                  border: 'border-[#00ff88]/30'
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#12121b] border border-white/5 hover:border-white/20 transition-all duration-300 flex items-start gap-3 group"
                >
                  <div className={`p-2.5 rounded-lg ${item.bg} ${item.border} border ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-semibold text-sm group-hover:text-[#00e5ff] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Booking CTA trigger */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#f00ac0] to-[#8b2fe8] text-white font-display font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(240,10,192,0.4)] hover:shadow-[0_0_30px_rgba(240,10,192,0.6)] transition-all hover:scale-105"
              >
                {t('about.btnCollab')}
              </button>

              <a
                href="#gear"
                className="px-6 py-3 rounded-xl bg-[#151520] hover:bg-[#1f1f2e] text-slate-300 hover:text-white border border-white/10 hover:border-[#00e5ff]/50 font-display font-medium text-xs tracking-wider uppercase transition-all"
              >
                {t('about.btnViewGear')}
              </a>
            </div>

          </div>

        </div>

        {/* Live Counter Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-white/10">
          {STATS_DATA.map((stat, idx) => (
            <div
              key={stat.id}
              className="p-6 rounded-2xl bg-[#12121c]/90 border border-purple-500/20 backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden group hover:border-[#00e5ff]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]"
            >
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                start={inView}
                delay={idx * 150}
                className="text-3xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-[#00e5ff]"
              />
              <div className="text-sm font-semibold text-white mt-2 font-display">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 mt-1 max-w-[180px] leading-snug">
                {stat.description}
              </div>

              {/* Bottom Glowing Line */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#f00ac0] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
