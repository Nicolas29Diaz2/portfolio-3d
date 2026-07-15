// import { isErr, ok, type Result } from "@/core/api/result";
// import type { AppError } from "@/core/api/errors";
// import { resolveStrapiMediaUrl } from "@/core/lib/strapiMedia";
// import { httpClient } from "@/core";
// import type { StrapiResponse } from "@/core/types/strapi";
// import type {
//   SkillApiResponse,
//   SkillContent,
//   SkillType,
// } from "../types/skills.types";
import { ok, type Result } from "@/core/api/result";
import type { AppError } from "@/core/api/errors";
import type { SkillContent } from "../types/skills.types";
import { SKILLS_DATA } from "@/data/skills.data";

// const mapSkillType = (type: string | undefined): SkillType => {
//   const validSkills: SkillType[] = ["web", "tool", "design"];
//
//   if (validSkills.includes(type as SkillType)) {
//     return type as SkillType;
//   }
//
//   return "other";
// };

// function mapSkillResponse(apiSkill: SkillApiResponse): SkillContent {
//   const { id, name, type, icon, skillPoints, yPosition } = apiSkill;
//
//   return {
//     id,
//     name,
//     type: mapSkillType(type),
//     imageUrl: resolveStrapiMediaUrl(icon?.url),
//     points: skillPoints ?? 0,
//     y: yPosition ?? 50,
//   };
// }

export async function fetchSkills(): Promise<
  Result<readonly SkillContent[], AppError>
> {
  return ok(SKILLS_DATA);

  // const result = await httpClient.get<StrapiResponse<SkillApiResponse[]>>(
  //   "/skills?populate[icon][fields][0]=url",
  // );
  //
  // if (isErr(result)) {
  //   return result;
  // }
  //
  // return ok(result.value.data.map(mapSkillResponse));
}
