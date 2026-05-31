import type { StrapiImage } from "@/core/types/strapi";

export type ProjectApiResponse = {
  readonly id: number;
  readonly title: string;
  readonly tags?: readonly string[];
  readonly description?: string;
  readonly link?: string;
  readonly thumbnail?: StrapiImage;
};

export type ProjectContent = {
  readonly id: number;
  readonly title: string;
  readonly tags?: readonly string[];
  readonly description?: string;
  readonly link?: string;
  readonly image?: string;
};
