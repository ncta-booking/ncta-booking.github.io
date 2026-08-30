import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * `npm run dev` has no prerender step, so the /show/<id>/ directories that the
 * production build writes do not exist yet. Rewrite those requests onto the
 * show.html template and pass the slug through as `?show=<id>` — the same
 * fallback `resolveShowId()` in src/ArticleApp.tsx reads.
 */
function showPagesDevServer(): Plugin {
  return {
    name: 'ncta-show-pages-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const match = req.url?.match(/^\/show\/([A-Za-z0-9_-]+)\/?(?:\?.*)?$/);
        if (match) req.url = `/show.html?show=${match[1]}`;
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), showPagesDevServer()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          // Landing page.
          main: path.resolve(__dirname, 'index.html'),
          // Template for the standalone show articles. scripts/prerender.mjs
          // stamps one copy per show into dist/show/<id>/index.html and then
          // deletes this bare template.
          show: path.resolve(__dirname, 'show.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
