import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App, { preloadAppSections } from './App.tsx';
import { LanguageProvider } from './i18n/LanguageContext';
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
