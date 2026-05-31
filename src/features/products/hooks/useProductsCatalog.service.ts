import { useEffect, useState } from "react";
import { isErr } from "@/core/api/result";
import { fetchFakeProducts } from "@/features/products/services/fetchFakeProducts";
import { formatProductsApiError } from "@/features/products/lib/formatProductsApiError";
import type { FakeStoreProduct } from "@/features/products/types/products.types";
import { useToastStore } from "@/store/toastStore";

type UseProductsCatalogState = {
  readonly products: readonly FakeStoreProduct[];
  readonly isLoading: boolean;
  readonly hasError: boolean;
};

export function useProductsCatalog(): UseProductsCatalogState {
  const showError = useToastStore((state) => state.showError);
  const [state, setState] = useState<UseProductsCatalogState>({
    products: [],
    isLoading: true,
    hasError: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      const result = await fetchFakeProducts();

      if (!isMounted) {
        return;
      }

      if (isErr(result)) {
        showError(
          formatProductsApiError(result.error, "Product catalog"),
        );
        setState({ products: [], isLoading: false, hasError: true });
        return;
      }

      setState({ products: result.value, isLoading: false, hasError: false });
    }

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, [showError]);

  return state;
}
