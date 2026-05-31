const FALLBACK_IMAGE = "https://via.placeholder.com/150";
const apiBaseUrl =
  import.meta.env.STRAPI_API_BASE_URL || "http://localhost:1337";

export function resolveStrapiMediaUrl(path: string | undefined): string {
  if (!path) return FALLBACK_IMAGE;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${apiBaseUrl}${path}`;
}
