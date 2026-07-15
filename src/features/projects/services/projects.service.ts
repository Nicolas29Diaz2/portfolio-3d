// import { resolveStrapiMediaUrl } from "@/core/lib/strapiMedia";
// import { httpClient } from "@/core/api/httpClient";
// import { isErr, ok, type Result } from "@/core/api/result";
// import type { AppError } from "@/core/api/errors";
// import type { StrapiResponse } from "@/core/types/strapi";
// import type {
//   ProjectApiResponse,
//   ProjectContent,
// } from "@/features/projects/types/projects.types";
import { ok, type Result } from "@/core/api/result";
import type { AppError } from "@/core/api/errors";
import type { ProjectContent } from "@/features/projects/types/projects.types";
import { PROJECTS_DATA } from "@/data/projects.data";

// function mapProjectResponse(response: ProjectApiResponse): ProjectContent {
//   const { id, title, tags, description, link, thumbnail } = response;
//
//   return {
//     id,
//     title,
//     tags: tags ?? [],
//     description: description ?? "",
//     link: link ?? "",
//     image: resolveStrapiMediaUrl(thumbnail?.url),
//   };
// }

export async function fetchProjects(): Promise<
  Result<readonly ProjectContent[], AppError>
> {
  return ok(PROJECTS_DATA);

  // const result = await httpClient.get<
  //   StrapiResponse<readonly ProjectApiResponse[]>
  // >("/projects?populate[thumbnail][fields][0]=url");
  //
  // if (isErr(result)) {
  //   return result;
  // }
  //
  // return ok(result.value.data.map(mapProjectResponse));
}
