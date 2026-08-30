import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  Quote,
  Sparkles,
  Users,
} from 'lucide-react';
import { getPerformanceById } from '../data/mockData';
import { getShowArticle } from '../data/showArticles';
import { useI18n } from '../i18n/LanguageContext';
import { unsplashSrcSet } from '../utils/images';
import { YouTubeFacade } from './YouTubeFacade';

interface ShowArticlePageProps {
  /** Slug from the URL — /show/<showId>/. */
  showId: string;
}

/**
 * The body of a standalone show page. Rendered both at build time (see
 * scripts/prerender.mjs, which writes dist/show/<id>/index.html) and on the
 * client during hydration, so the markup must be identical in both.
 */
export const ShowArticlePage: React.FC<ShowArticlePageProps> = ({ showId }) => {
  const { t, lang } = useI18n();
  const perf = getPerformanceById(showId, lang);
  const article = getShowArticle(showId, lang);

  // Unknown slug (hand-typed URL, or a show whose article was removed).
  if (!perf || !article) {
    return (
      <main className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
          {t('article.notFoundTitle')}
        </h1>
        <p className="mt-3 max-w-md text-sm text-slate-400">{t('article.notFoundDesc')}</p>
        <a
          href="/#performances"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#f00ac0] to-[#00e5ff] px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('article.backToShows')}
        </a>
      </main>
    );
  }

  return (
    <main className="relative z-10">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <article>
        <header className="relative overflow-hidden border-b border-white/5 bg-[#0d0d14]">
          <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[#8b2fe8]/15 blur-[140px]" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[#f00ac0]/10 blur-[140px]" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8">
            {/* Breadcrumb — also the "back" affordance */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                <li>
                  <a href="/" className="transition-colors hover:text-[#00e5ff]">
                    {t('article.breadcrumbHome')}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a href="/#performances" className="transition-colors hover:text-[#00e5ff]">
                    {t('article.breadcrumbShows')}
                  </a>
                </li>
              </ol>
            </nav>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/10 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-[#00e5ff]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t(`performances.cat${categoryKey(perf.category)}`)}</span>
            </div>

            <h1 className="font-display text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              {perf.title}
            </h1>
            <p className="mt-3 text-base font-medium text-[#f00ac0] sm:text-lg">{perf.subtitle}</p>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-purple-400" />
                {perf.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#00e5ff]" />
                {perf.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#ff8a00]" />
                {perf.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-slate-400" />
                {article.readMinutes} {t('article.readMinutes')}
              </span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative z-10 mx-auto max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-black">
              <img
                src={perf.image}
                srcSet={unsplashSrcSet(perf.image)}
                sizes="(min-width: 1024px) 1024px, 100vw"
                alt={perf.title}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent opacity-70" />
            </div>
          </div>
        </header>

        {/* -------------------------------------------------------------- */}
        {/* Body                                                           */}
        {/* -------------------------------------------------------------- */}
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          {/* Lead */}
          <p className="border-l-2 border-[#f00ac0] pl-5 text-base leading-relaxed text-slate-200 sm:text-lg">
            {article.lead}
          </p>

          {/* Fact table */}
          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {article.facts.map((fact, idx) => (
              <div key={idx} className="bg-[#12121c] p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {/* Video (only when a real recap video exists) */}
          {article.youtubeId && (
            <section className="mt-12">
              <h2 className="mb-4 font-display text-xl font-bold text-white sm:text-2xl">
                {t('article.videoTitle')}
              </h2>
              <YouTubeFacade videoId={article.youtubeId} title={perf.title} />
            </section>
          )}

          {/* Narrative sections */}
          {article.sections.map((section, idx) => (
            <section key={idx} className="mt-12">
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-sm leading-relaxed text-slate-300 sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {/* Pull quote */}
          {article.quote && (
            <figure className="mt-12 rounded-2xl border border-purple-500/25 bg-purple-950/20 p-6 sm:p-8">
              <Quote className="h-6 w-6 text-[#f00ac0]" />
              <blockquote className="mt-3 text-base italic leading-relaxed text-slate-100 sm:text-lg">
                {article.quote.text}
              </blockquote>
              <figcaption className="mt-4 font-mono text-xs uppercase tracking-widest text-[#00e5ff]">
                — {article.quote.author}
              </figcaption>
            </figure>
          )}

          {/* Highlights (from the show data — same list the popup shows) */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              {t('lightbox.highlightsTitle')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {perf.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00ff88]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Props used */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              {t('lightbox.propsUsedTitle')}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {perf.propsUsed.map((prop, idx) => (
                <a
                  key={idx}
                  href="/#gear"
                  className="rounded-lg border border-purple-500/30 bg-[#19192b] px-3 py-1.5 font-mono text-xs text-[#00e5ff] transition-colors hover:border-[#00e5ff]/60"
                >
                  {prop}
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Gallery — full-width band                                      */}
        {/* -------------------------------------------------------------- */}
        {article.gallery.length > 0 && (
          <section className="border-y border-white/5 bg-[#0d0d14] py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-center font-display text-xl font-bold text-white sm:text-2xl">
                {t('article.galleryTitle')}
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {article.gallery.map((shot, idx) => (
                  <figure key={idx} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black">
                      <img
                        src={shot.src}
                        srcSet={unsplashSrcSet(shot.src)}
                        sizes="(min-width: 640px) 50vw, 100vw"
                        alt={shot.caption}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover brightness-90 transition-all duration-500 group-hover:scale-105 group-hover:brightness-100"
                      />
                    </div>
                    <figcaption className="mt-2.5 text-xs text-slate-400">{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------- */}
        {/* Credits + CTA                                                  */}
        {/* -------------------------------------------------------------- */}
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <section>
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              {t('article.creditsTitle')}
            </h2>
            <dl className="mt-4 space-y-2.5">
              {article.credits.map((credit, idx) => (
                <div key={idx} className="flex flex-wrap items-baseline gap-x-3 text-sm">
                  <dt className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-slate-500">
                    <Users className="h-3.5 w-3.5" />
                    {credit.role}
                  </dt>
                  <dd className="text-slate-200">{credit.name}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Booking CTA */}
          <div className="mt-12 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-[#161626] via-[#1c1c30] to-[#161626] p-8 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              {t('performances.bannerTitle')}
            </h2>
            <p className="mt-1.5 text-sm text-slate-400">{t('performances.bannerDesc')}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f00ac0] to-[#00e5ff] px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(240,10,192,0.4)] transition-all hover:scale-105"
              >
                <span>{t('performances.bannerBtn')}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/#performances"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-mono text-xs text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t('article.backToShows')}</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

/** 'visual_art' → 'VisualArt', so it lines up with the performances.cat* keys. */
function categoryKey(category: string): string {
  return category
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
