import { Link } from "react-router-dom";
import type { ProductsPageContent } from "@/features/products/types/products.types";
import "./ProductsPageHead.css";

type ProductsPageHeadProps = {
  readonly content: ProductsPageContent | null;
  readonly isLoading: boolean;
};

export function ProductsPageHead({ content, isLoading }: ProductsPageHeadProps) {
  const bannerDesktop = content?.bannerUrl;
  const bannerMobile = content?.bannerMobileUrl ?? bannerDesktop;
  const title = content?.title ?? "Products";
  const description =
    content?.description ?? "Browse our curated catalog of premium items.";

  return (
    <header className="products-page-head">
      {(bannerDesktop || bannerMobile) && (
        <picture>
          {bannerMobile && (
            <source media="(max-width: 767px)" srcSet={bannerMobile} />
          )}
          {bannerDesktop && (
            <img
              className="products-page-head__banner"
              src={bannerDesktop}
              alt=""
              aria-hidden="true"
            />
          )}
        </picture>
      )}
      <div className="products-page-head__overlay" aria-hidden="true" />
      <div className="products-page-head__content">
        <Link to="/" className="products-page-head__back-link">
          <span className="products-page-head__back-arrow" aria-hidden="true">
            ←
          </span>
          Back to Portfolio
        </Link>

        {isLoading && !content ? (
          <>
            <div className="products-page-head__title-skeleton" aria-hidden="true" />
            <div
              className="products-page-head__description-skeleton"
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <h1 className="products-page-head__title">{title}</h1>
            <p className="products-page-head__description">{description}</p>
          </>
        )}
      </div>
    </header>
  );
}
