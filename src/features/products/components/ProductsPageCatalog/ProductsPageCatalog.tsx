import { ProductCard } from "@/features/products/components/ProductCard/ProductCard";
import type { FakeStoreProduct } from "@/features/products/types/products.types";
import "./ProductsPageCatalog.css";

const SKELETON_CARD_COUNT = 6;

type ProductsPageCatalogProps = {
  readonly products: readonly FakeStoreProduct[];
  readonly isLoading: boolean;
  readonly hasError: boolean;
};

function ProductsCatalogSkeleton() {
  return (
    <div className="products-page-catalog__skeleton-grid" aria-hidden="true">
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
        <div key={index} className="products-page-catalog__skeleton-card">
          <div className="products-page-catalog__skeleton-image" />
          <div className="products-page-catalog__skeleton-body">
            <div className="products-page-catalog__skeleton-line products-page-catalog__skeleton-line--short" />
            <div className="products-page-catalog__skeleton-line products-page-catalog__skeleton-line--title" />
            <div className="products-page-catalog__skeleton-line products-page-catalog__skeleton-line--price" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductsPageCatalog({
  products,
  isLoading,
  hasError,
}: ProductsPageCatalogProps) {
  return (
    <main className="products-page-catalog">
      {isLoading ? (
        <ProductsCatalogSkeleton />
      ) : hasError ? (
        <p className="products-page-catalog__error" role="alert">
          Unable to load the product catalog. Please try again later.
        </p>
      ) : products.length > 0 ? (
        <section
          className="products-page-catalog__grid"
          aria-label="Product catalog"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <p className="products-page-catalog__empty">
          No products available at the moment.
        </p>
      )}
    </main>
  );
}
