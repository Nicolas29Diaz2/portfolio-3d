import { httpClient } from "@/core/api/httpClient";
import { isErr, ok, type Result } from "@/core/api/result";
import type { AppError } from "@/core/api/errors";
import type { StrapiResponse } from "@/core/types/strapi";
import type { ContactApiResponse, ContactContent } from "../types/contact.type";

export async function fetchContact(): Promise<
  Result<ContactContent, AppError>
> {
  const result =
    await httpClient.get<StrapiResponse<ContactApiResponse>>("/contact");

  if (isErr(result)) {
    return result;
  }

  return ok(result.value.data);
}
