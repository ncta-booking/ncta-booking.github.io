import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import ArticleApp, { resolveShowId } from './ArticleApp.tsx';
import { LanguageProvider } from './i18n/LanguageContext';
import './index.css';

// Client entry for the standalone /show/<id>/ pages. Mirrors main.tsx: the
// HTML is fully prerendered (scripts/prerender.mjs), so we hydrate rather than
// render, and phones defer that hydration to the browser's first idle moment
// so reading and scrolling are never blocked.
function hydrate() {
  hydrateRoot(
    document.getElementById('root')!,
    <StrictMode>
      <LanguageProvider>
        <ArticleApp showId={resolveShowId()} />
      </LanguageProvider>
    </StrictMode>,
  );
}

if (window.matchMedia('(pointer: coarse)').matches) {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(hydrate, { timeout: 1500 });
  } else {
    window.setTimeout(hydrate, 300);
  }
} else {
  hydrate();
}
