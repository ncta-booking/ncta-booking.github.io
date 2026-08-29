import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './i18n/LanguageContext';
import './index.css';

// hydrateRoot lets the statically pre-rendered HTML (see scripts/prerender.mjs)
// attach without a visible re-render — best for both SEO and Core Web Vitals.
function hydrate() {
  hydrateRoot(
    document.getElementById('root')!,
    <StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </StrictMode>,
  );
}

// Phones/tablets (coarse pointer): the prerendered HTML is fully readable and
// scrollable on its own, so wait for the browser's first idle moment before
// hydrating. Otherwise the initial hydration render blocks the main thread
// exactly when the visitor starts reading/scrolling — the "page freezes for a
// few seconds" feel on mobile. Desktop CPUs hydrate fast: do it immediately.
if (window.matchMedia('(pointer: coarse)').matches) {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(hydrate, { timeout: 1500 });
  } else {
    // Old iOS Safari (<18) — a short timeout lets first paint/scroll happen.
    window.setTimeout(hydrate, 300);
  }
} else {
  hydrate();
}
