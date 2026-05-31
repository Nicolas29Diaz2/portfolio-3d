import { isErr, ok, type Result } from "@/core/api/result";
import type { AppError } from "@/core/api/errors";
import type { SkillApiResponse } from "../types/skills.types";
import { httpClient } from "@/core";
import type { StrapiResponse } from "@/core/types/strapi";

export async function fetchSkills(): Promise<
  Result<SkillApiResponse[], AppError>
> {
  const result = await httpClient.get<StrapiResponse<SkillApiResponse[]>>(
    "/skills?populate[icon][fields][0]=url",
  );

  if (isErr(result)) {
    return result;
  }

  return ok(result.value.data);
}
