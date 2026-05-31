import type { ProductsPageContent } from "@/features/products/types/products.types";
import "./ProductsPageFooter.css";

type ProductsPageFooterProps = {
  readonly content: ProductsPageContent | null;
  readonly isLoading: boolean;
};

function ProductsPageFooterSkeleton() {
  return (
    <div className="products-page-footer__inner" aria-busy="true" aria-label="Loading footer">
      <div className="products-page-footer__skeleton-title" aria-hidden="true" />
      <div className="products-page-footer__columns">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="products-page-footer__skeleton-column">
            <div
              className="products-page-footer__skeleton-line products-page-footer__skeleton-line--heading"
              aria-hidden="true"
            />
            <div
              className="products-page-footer__skeleton-line products-page-footer__skeleton-line--link"
              aria-hidden="true"
            />
            <div
              className="products-page-footer__skeleton-line products-page-footer__skeleton-line--link"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductsPageFooter({
  content,
  isLoading,
}: ProductsPageFooterProps) {
  return (
    <footer className="products-page-footer">
      {isLoading ? (
        <ProductsPageFooterSkeleton />
      ) : content ? (
        <div className="products-page-footer__inner">
          <h2 className="products-page-footer__title">{content.footerTitle}</h2>
          <div className="products-page-footer__columns">
            {content.footerLinks.map((section) => (
              <section key={section.id}>
                <h3 className="products-page-footer__section-title">
                  {section.title}
                </h3>
                <ul className="products-page-footer__links">
                  {section.linkItem.map((link) => (
                    <li key={link.id}>
                      <a
                        className="products-page-footer__link"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      ) : null}
    </footer>
  );
}
