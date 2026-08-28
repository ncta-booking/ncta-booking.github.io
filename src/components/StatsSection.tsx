import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import { CountUp } from './CountUp';
import { Flame, Handshake, GraduationCap, PlayCircle, Trophy } from 'lucide-react';

// Achievements / social-proof band. Distinct from the small counter bar inside
// AboutSection (which shows years / shows / builds / quality): this uses a
// different set of figures and a connected "stat strip" layout. Numbers are
// marketing figures — adjust the `value`s below to the real ones.
export const StatsSection: React.FC = () => {
  const { t } = useI18n();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Count up only once the band scrolls into view (CountUp bails on
  // prefers-reduced-motion and only runs its rAF for the duration).
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 30, suffix: '+', color: '#f00ac0', Icon: Flame, label: t('stats.festivalsLabel'), caption: t('stats.festivalsCaption') },
    { value: 150, suffix: '+', color: '#00e5ff', Icon: Handshake, label: t('stats.partnersLabel'), caption: t('stats.partnersCaption') },
    { value: 500, suffix: '+', color: '#8b2fe8', Icon: GraduationCap, label: t('stats.studentsLabel'), caption: t('stats.studentsCaption') },
    { value: 5, suffix: 'M+', color: '#ff8a00', Icon: PlayCircle, label: t('stats.viewsLabel'), caption: t('stats.viewsCaption') },
  ];

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#0d0d14] py-24 overflow-hidden"
    >
      {/* Decorative neon orbs — clipped by the section's overflow-hidden. */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-[#8b2fe8]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-[#00e5ff]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00e5ff]">
            <Trophy className="h-3.5 w-3.5" />
            <span>{t('stats.badge')}</span>
          </div>
          <h2 className="text-3xl font-display font-black tracking-tight text-white sm:text-5xl">
            {t('stats.titlePrefix')}{' '}
            <span className="bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] bg-clip-text text-transparent">
              {t('stats.titleHighlight')}
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">{t('stats.subtitle')}</p>
        </div>

        {/* Connected stat strip */}
        <div className="grid grid-cols-2 gap-y-12 rounded-3xl border border-white/10 bg-white/[0.02] py-12 backdrop-blur-sm sm:gap-y-14 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {stats.map((s, idx) => (
            <div key={idx} className="group flex flex-col items-center px-4 text-center">
              <span
                className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border transition-transform duration-300 group-hover:scale-110"
                style={{
                  color: s.color,
                  borderColor: `${s.color}55`,
                  backgroundColor: `${s.color}14`,
                  boxShadow: `0 0 22px ${s.color}22`,
                }}
              >
                <s.Icon className="h-7 w-7" />
              </span>

              <div
                className="font-display text-5xl font-black leading-none tracking-tight sm:text-6xl"
                style={{ color: s.color, textShadow: `0 0 28px ${s.color}55` }}
              >
                <CountUp value={s.value} suffix={s.suffix} start={inView} delay={idx * 150} />
              </div>

              <div className="mt-3 font-display text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                {s.label}
              </div>
              <div className="mt-1.5 max-w-[190px] text-xs leading-snug text-slate-400">
                {s.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
