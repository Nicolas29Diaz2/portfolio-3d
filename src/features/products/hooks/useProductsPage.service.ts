import { useEffect, useState } from "react";
import { isErr } from "@/core/api/result";
import { fetchProductsPageContent } from "@/features/products/services/fetchProductsPageContent";
import { formatProductsApiError } from "@/features/products/lib/formatProductsApiError";
import type { ProductsPageContent } from "@/features/products/types/products.types";
import { useToastStore } from "@/store/toastStore";

type UseProductsPageCmsState = {
  readonly content: ProductsPageContent | null;
  readonly isLoading: boolean;
};

export function useProductsPageCms(): UseProductsPageCmsState {
  const showError = useToastStore((state) => state.showError);
  const [state, setState] = useState<UseProductsPageCmsState>({
    content: null,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadPageContent() {
      const result = await fetchProductsPageContent();

      if (!isMounted) {
        return;
      }

      if (isErr(result)) {
        showError(
          formatProductsApiError(result.error, "Page content"),
        );
        setState({ content: null, isLoading: false });
        return;
      }

      setState({ content: result.value, isLoading: false });
    }

    void loadPageContent();

    return () => {
      isMounted = false;
    };
  }, [showError]);

  return state;
}
