/**
 * Production image loader: serve CMS images from the admin/content API.
 * Locally, paths stay as /images/... from public/junction.
 */
export default function contentImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const api = (process.env.NEXT_PUBLIC_CONTENT_API_URL || process.env.CONTENT_API_URL || "").replace(
    /\/$/,
    "",
  );

  if (api && src.startsWith("/images/")) {
    const name = src.slice("/images/".length);
    return `${api}/api/media-file/${encodeURIComponent(name)}`;
  }

  const q = quality || 75;
  return `${src}?w=${width}&q=${q}`;
}
