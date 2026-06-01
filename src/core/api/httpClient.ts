import { createAppError, type AppError } from "./errors";
import { err, ok, type Result } from "./result";

export type HttpClientConfig = {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
};

export type GetOptions = Omit<RequestInit, "method" | "body">;

export class HttpClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(config: HttpClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.defaultHeaders = config.defaultHeaders ?? {};
  }

  async get<T>(
    path: string,
    options: GetOptions = {},
  ): Promise<Result<T, AppError>> {
    const url = this.buildUrl(path);

    let response: Response;
    try {
      response = await fetch(url, {
        ...options,
        method: "GET",
        headers: {
          Accept: "application/json",
          ...this.defaultHeaders,
          ...normalizeHeaders(options.headers),
        },
      });
    } catch (cause) {
      return err(
        createAppError("NETWORK_ERROR", "Unable to reach the server.", {
          cause,
        }),
      );
    }

    if (!response.ok) {
      return err(
        createAppError(
          "HTTP_ERROR",
          `Request failed with status ${response.status}.`,
          {
            status: response.status,
          },
        ),
      );
    }

    return this.parseJsonBody<T>(response);
  }

  private buildUrl(path: string): string {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}`;
  }

  private async parseJsonBody<T>(
    response: Response,
  ): Promise<Result<T, AppError>> {
    try {
      const data = (await response.json()) as T;
      return ok(data);
    } catch (cause) {
      return err(
        createAppError("PARSE_ERROR", "Failed to parse the response body.", {
          cause,
        }),
      );
    }
  }
}

function normalizeHeaders(
  headers: HeadersInit | undefined,
): Record<string, string> {
  if (!headers) return {};

  const headersInstance = new Headers(headers);
  const normalized: Record<string, string> = {};

  headersInstance.forEach((value, key) => {
    normalized[key] = value;
  });

  return normalized;
}

export const httpClient = new HttpClient({
  baseUrl: `${import.meta.env.VITE_STRAPI_BASE_URL ?? ""}/api`,
  defaultHeaders: {
    authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN ?? ""}`,
  },
});
