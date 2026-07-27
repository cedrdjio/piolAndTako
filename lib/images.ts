/**
 * Image helpers. Listing photography is served from Unsplash and optimized by
 * Next's Image pipeline (AVIF/WebP, responsive sizes). In production these would
 * be Vercel Blob URLs — the shape is identical, so swapping the source is a
 * one-line change in the data layer.
 */

const UNSPLASH = "https://images.unsplash.com/photo-";

export function unsplash(id: string, width = 1200, quality = 72): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/** Neutral low-res placeholder for blur-up while photos stream in. */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTdlOWYwIi8+PC9zdmc+";
