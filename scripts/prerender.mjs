// Static pre-render step: loads the app through Vite's SSR pipeline and
// injects the fully-rendered markup into the built index.html. This gives
// search engines and social crawlers complete, JS-free HTML — the biggest
// technical SEO win for a React SPA.
import { createServer } from 'vite';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const outDir = resolve(root, 'dist');

const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  // middlewareMode + no file-watcher so the dev server doesn't keep the Node
  // process alive after we're done (otherwise `npm run build` hangs forever).
  server: { middlewareMode: true, watch: null, hmr: false },
});

let exitCode = 0;
try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const appHtml = render();
  const indexFile = resolve(outDir, 'index.html');
  const template = readFileSync(indexFile, 'utf-8');

  // Dev-mode SSR (this uses Vite's dev server) makes React emit
  // <template data-msg="..." data-stck="..."></template> error annotations for
  // Suspense/lazy boundaries (e.g. the lazy LightboxModal). Their stack leaks the
  // absolute build path into the shipped HTML — strip them so production HTML is
  // clean. These templates are dev-only and not needed for hydration.
  const cleanHtml = appHtml.replace(
    /<template\b[^>]*\bdata-(?:stck|msg)\b[^>]*><\/template>/gi,
    '',
  );

  // Inject the rendered app inside the #root container.
  const out = template.replace('<div id="root"></div>', `<div id="root">${cleanHtml}</div>`);

  writeFileSync(indexFile, out);
  console.log('[prerender] Static HTML injected into dist/index.html');
} catch (err) {
  console.error('[prerender] failed:', err);
  exitCode = 1;
} finally {
  await vite.close();
}

// Vite/esbuild can leave open handles that stop Node from exiting on its own —
// force a clean exit so the build command finishes.
process.exit(exitCode);
