import type { StrapiImage } from "@/core/types/strapi";

export type AboutApiResponse = {
  readonly name: string;
  readonly age?: number | string;
  readonly role?: string;
  readonly description?: string;
  readonly image?: StrapiImage;
};

export type AboutContent = {
  readonly name: string;
  readonly age: string;
  readonly role: string;
  readonly description: string;
  readonly imageUrl: string;
};
