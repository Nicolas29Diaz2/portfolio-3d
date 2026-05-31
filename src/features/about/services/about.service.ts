import { httpClient } from "@/core/api/httpClient";
import { isErr, ok, type Result } from "@/core/api/result";
import type { AppError } from "@/core/api/errors";
import type {
  AboutApiResponse,
  AboutContent,
} from "@/features/about/types/about.types";
import type { StrapiResponse } from "@/core/types/strapi";
import { resolveStrapiMediaUrl } from "@/core/lib/strapiMedia";

function mapAboutResponse(response: AboutApiResponse): AboutContent {
  const { name, age, role, description, image } = response;

  return {
    name,
    age: String(age),
    role: role ?? "",
    description: description ?? "",
    imageUrl: resolveStrapiMediaUrl(image?.[0]?.url),
  };
}

export async function fetchAbout(): Promise<Result<AboutContent, AppError>> {
  const result = await httpClient.get<StrapiResponse<AboutApiResponse>>(
    "/about?populate[image][fields][0]=url",
  );

  console.log("fetchAbout result:", result);
  if (isErr(result)) {
    return result;
  }

  return ok(mapAboutResponse(result.value.data));
}
