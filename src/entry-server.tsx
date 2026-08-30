import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App, { preloadAppSections } from './App.tsx';
import ArticleApp from './ArticleApp.tsx';
import { LanguageProvider } from './i18n/LanguageContext';
import { DEFAULT_LANG } from './i18n/config';
import { getPerformanceById } from './data/mockData';
import { getShowArticle, SHOW_ARTICLE_DATES } from './data/showArticles';
import { SHOW_ARTICLE_IDS } from './data/showArticleIds';
import './index.css';

// Server render entry — used only by scripts/prerender.mjs to produce static
// HTML at build time. Vite ignores the CSS import during SSR.
//
// The below-the-fold sections are React.lazy chunks (see lazySection in
// App.tsx). Await their preloaders first so renderToString emits the REAL
// section markup — never the Suspense fallbacks — keeping the shipped HTML
// complete for SEO.
export async function render(): Promise<string> {
  await preloadAppSections();
  return renderToString(
    <StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </StrictMode>,
  );
}

/** Everything the prerender step needs to stamp out one /show/<id>/index.html. */
export interface ShowPageData {
  id: string;
  html: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  location: string;
  publishedAt: string;
}

/** The slugs to generate pages for, plus their publish dates (for the sitemap). */
export function listShowPages(): { id: string; publishedAt: string }[] {
  return SHOW_ARTICLE_IDS.map((id) => ({ id, publishedAt: SHOW_ARTICLE_DATES[id] }));
}

/**
 * Render one standalone show page. ArticleApp is not code-split, so unlike
 * render() there is nothing to preload first.
 */
export function renderShow(id: string): ShowPageData | null {
  const perf = getPerformanceById(id, DEFAULT_LANG);
  const article = getShowArticle(id, DEFAULT_LANG);
  if (!perf || !article) return null;

  const html = renderToString(
    <StrictMode>
      <LanguageProvider>
        <ArticleApp showId={id} />
      </LanguageProvider>
    </StrictMode>,
  );

  return {
    id,
    html,
    title: perf.title,
    subtitle: perf.subtitle,
    description: article.lead,
    image: perf.image,
    date: perf.date,
    location: perf.location,
    publishedAt: article.publishedAt,
  };
}
