import type { FakeStoreProduct } from "@/features/products/types/products.types";
import "./ProductCard.css";

type ProductCardProps = {
  readonly product: FakeStoreProduct;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h2 className="product-card__title">{product.title}</h2>

        <div className="product-card__footer">
          <p className="product-card__price">{formatPrice(product.price)}</p>
          <span className="product-card__rating" aria-label={`Rating ${product.rating.rate} out of 5`}>
            <span className="product-card__rating-star" aria-hidden="true">
              ★
            </span>
            {product.rating.rate.toFixed(1)}
            <span className="product-card__rating-count">
              ({product.rating.count})
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
