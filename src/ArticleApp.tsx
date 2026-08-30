import React, { useEffect } from 'react';
import { ArticleNavbar } from './components/ArticleNavbar';
import { Footer } from './components/Footer';
import { ShowArticlePage } from './components/ShowArticlePage';
import { FloatingActions } from './components/FloatingActions';

interface ArticleAppProps {
  showId: string;
}

/**
 * Shell for a standalone show page (/show/<id>/).
 *
 * Deliberately NOT code-split like App.tsx: an article is one continuous read,
 * so there is nothing below the fold worth gating behind a scroll observer, and
 * the whole page is small. It also skips FlowCanvas — the ambient canvas is a
 * landing-page flourish and would only cost battery here.
 */
export default function ArticleApp({ showId }: ArticleAppProps) {
  // Lift the boot splash once React has hydrated, exactly like App.tsx does
  // (index.html's inline script waits for this signal on desktop).
  useEffect(() => {
    (window as unknown as { __nctaDismissBoot?: () => void }).__nctaDismissBoot?.();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-[#f00ac0] selection:text-white">
      <ArticleNavbar />
      <ShowArticlePage showId={showId} />
      <Footer hrefBase="/" />
      <FloatingActions />
    </div>
  );
}

/**
 * Resolve the show slug from the URL.
 *
 * Production serves each article from its own directory (/show/<id>/index.html),
 * so the slug is the last path segment. `?show=<id>` is the dev-server fallback
 * (see the showPagesDevServer plugin in vite.config.ts).
 */
export function resolveShowId(): string {
  if (typeof window === 'undefined') return '';
  const fromQuery = new URLSearchParams(window.location.search).get('show');
  if (fromQuery) return fromQuery;
  const segments = window.location.pathname.split('/').filter(Boolean);
  const last = segments[segments.length - 1] ?? '';
  return last === 'show' ? '' : last.replace(/\.html$/, '');
}
