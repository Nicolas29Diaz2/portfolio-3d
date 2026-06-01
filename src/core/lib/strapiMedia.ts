const FALLBACK_IMAGE = "/Images/placeholder.png";
const apiBaseUrl =
  import.meta.env.VITE_STRAPI_BASE_URL ?? "http://localhost:1337";

export function resolveStrapiMediaUrl(path: string | undefined): string {
  if (!path) return FALLBACK_IMAGE;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${apiBaseUrl}${path}`;
}
