// import { httpClient } from "@/core/api/httpClient";
// import { isErr, ok, type Result } from "@/core/api/result";
// import type { AppError } from "@/core/api/errors";
// import type { StrapiResponse } from "@/core/types/strapi";
// import type { ContactApiResponse, ContactContent } from "../types/contact.type";
import { ok, type Result } from "@/core/api/result";
import type { AppError } from "@/core/api/errors";
import type { ContactContent } from "../types/contact.type";
import { CONTACT_DATA } from "@/data/contact.data";

export async function fetchContact(): Promise<
  Result<ContactContent, AppError>
> {
  return ok(CONTACT_DATA);

  // const result =
  //   await httpClient.get<StrapiResponse<ContactApiResponse>>("/contact");
  //
  // if (isErr(result)) {
  //   return result;
  // }
  //
  // return ok(result.value.data);
}
