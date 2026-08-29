/**
 * Build a responsive `srcSet` for Unsplash CDN images (their API accepts a `w`
 * query param). Phones then download ~480px versions instead of the full
 * w=1000 originals — a large bandwidth cut on the gallery grids.
 * Returns undefined for non-Unsplash URLs (or ones without a `w` param) so the
 * plain `src` is used as-is.
 */
export function unsplashSrcSet(url: string): string | undefined {
  if (!url.includes('images.unsplash.com') || !/[?&]w=\d+/.test(url)) return undefined;
  const at = (w: number) => url.replace(/([?&])w=\d+/, `$1w=${w}`);
  return `${at(480)} 480w, ${at(768)} 768w, ${at(1080)} 1080w`;
}
