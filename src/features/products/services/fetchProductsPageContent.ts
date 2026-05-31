import { httpClient } from "@/core/api/httpClient";
import { isErr, ok, type Result } from "@/core/api/result";
import type { AppError } from "@/core/api/errors";
import { resolveStrapiMediaUrl } from "@/core/lib/strapiMedia";
import type { StrapiResponse } from "@/core/types/strapi";
import type {
  ProductsPageApiResponse,
  ProductsPageContent,
  ProductsPageFooterLinkSection,
} from "@/features/products/types/products.types";

const PRODUCTS_PAGE_QUERY =
  "/product?populate[banner][fields][0]=url&populate[bannerMobile][fields][0]=url&populate[footerLinks][populate][linkItem]=*";

function mapFooterLinks(
  sections: ProductsPageApiResponse["footerLinks"],
): readonly ProductsPageFooterLinkSection[] {
  return sections.map((section) => ({
    id: section.id,
    title: section.title,
    linkItem: section.linkItem.map((item) => ({
      id: item.id,
      name: item.name,
      url: item.url,
    })),
  }));
}

function mapProductsPageResponse(
  response: ProductsPageApiResponse,
): ProductsPageContent {
  return {
    title: response.Title,
    description: response.description,
    footerTitle: response.footerTitle,
    bannerUrl: resolveStrapiMediaUrl(response.banner?.url),
    bannerMobileUrl: resolveStrapiMediaUrl(response.bannerMobile?.url),
    footerLinks: mapFooterLinks(response.footerLinks ?? []),
  };
}

export async function fetchProductsPageContent(): Promise<
  Result<ProductsPageContent, AppError>
> {
  const result =
    await httpClient.get<StrapiResponse<ProductsPageApiResponse>>(
      PRODUCTS_PAGE_QUERY,
    );

  if (isErr(result)) {
    return result;
  }

  return ok(mapProductsPageResponse(result.value.data));
}
