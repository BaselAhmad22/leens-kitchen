/** Prefix API paths when the admin is mounted under ADMIN_BASE_PATH (e.g. /studio). */
export function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_ADMIN_BASE_PATH || "";
  if (!base) return path;
  if (path.startsWith(base)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
