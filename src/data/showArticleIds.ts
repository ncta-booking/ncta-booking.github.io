// Deliberately tiny module: just the slugs that have a standalone article.
//
// The landing page needs to know WHETHER a show has an article (to show the
// "Chi tiết" button) but never needs the article prose itself. Keeping this
// list separate from showArticles.ts means PerformancePortfolio and
// LightboxModal do not drag ~13 KB (gzip) of body copy into the landing-page
// chunks. showArticles.ts asserts the two stay in sync during development.

export const SHOW_ARTICLE_IDS: readonly string[] = [
  'epizode-rave-2025',
  'vinfast-luxury-gala',
  'countdown-saigon-lights',
  'light-painting-mv-art',
  'ravolution-stage-storm',
  'luxury-wedding-magic-night',
];

/** True when the show id has a standalone page at /show/<id>/. */
export function hasShowArticle(id: string): boolean {
  return SHOW_ARTICLE_IDS.includes(id);
}
