import type { AppError } from "@/core/api/errors";

export function formatProductsApiError(
  error: AppError,
  context: string,
): string {
  switch (error.code) {
    case "NETWORK_ERROR":
      return `${context}: Unable to connect. Check your network and try again.`;
    case "HTTP_ERROR": {
      const status = error.status ?? 0;
      if (status >= 500) {
        return `${context}: Server error (${status}). Please try again later.`;
      }
      if (status >= 400) {
        return `${context}: Request rejected (${status}). The resource may be unavailable.`;
      }
      return `${context}: ${error.message}`;
    }
    case "PARSE_ERROR":
      return `${context}: Received an invalid response from the server.`;
    default:
      return `${context}: ${error.message}`;
  }
}
