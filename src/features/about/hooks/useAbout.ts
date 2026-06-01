import { useEffect, useState } from "react";
import { isErr } from "@/core/api/result";
import { fetchAbout } from "@/features/about/services/about.service";
import type { AboutContent } from "@/features/about/types/about.types";
import { useToastStore } from "@/store/toastStore";

type UseAboutState = {
  readonly content: AboutContent | null;
  readonly isLoading: boolean;
};

export function useAbout(): UseAboutState {
  const showError = useToastStore((state) => state.showError);
  const [state, setState] = useState<UseAboutState>({
    content: null,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadAbout() {
      const result = await fetchAbout();
      if (!isMounted) return;

      if (isErr(result)) {
        showError(result.error);
        setState({ content: null, isLoading: false });
      } else {
        setState({ content: result.value, isLoading: false });
      }
    }

    void loadAbout();

    return () => {
      isMounted = false;
    };
  }, [showError]);

  return state;
}
