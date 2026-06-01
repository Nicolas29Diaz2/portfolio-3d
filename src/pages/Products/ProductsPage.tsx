import { useEffect } from "react";
import { PRELOAD_DOM_IDS } from "@/features/loading/types/loading.types";
import { ProductsPageCatalog } from "@/features/products/components/ProductsPageCatalog/ProductsPageCatalog";
import { ProductsPageFooter } from "@/features/products/components/ProductsPageFooter/ProductsPageFooter";
import { ProductsPageHead } from "@/features/products/components/ProductsPageHead/ProductsPageHead";
import { useProductsCatalog } from "@/features/products/hooks/useProductsCatalog";
import { useProductsPageCms } from "@/features/products/hooks/useProductsPage";
import "./ProductsPage.css";

export function ProductsPage() {
  const {
    products,
    isLoading: isCatalogLoading,
    hasError,
  } = useProductsCatalog();
  const { content, isLoading: isCmsLoading } = useProductsPageCms();

  useEffect(() => {
    const logo = document.getElementById(PRELOAD_DOM_IDS.logo);
    const screen = document.getElementById(PRELOAD_DOM_IDS.screen);
    const previousOverflow = document.body.style.overflow;

    if (logo) logo.style.display = "none";
    if (screen) screen.style.display = "none";
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="products-page">
      <ProductsPageHead content={content} isLoading={isCmsLoading} />

      <ProductsPageCatalog
        products={products}
        isLoading={isCatalogLoading}
        hasError={hasError}
      />

      <ProductsPageFooter content={content} isLoading={isCmsLoading} />
    </div>
  );
}
