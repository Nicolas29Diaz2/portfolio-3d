import { useEffect, useState } from "react";
import { isErr } from "@/core/api/result";
import { useToastStore } from "@/store/toastStore";
import type { ContactContent } from "../types/contact.type";
import { fetchContact } from "../services/contact.service";

type UseContactState = {
  readonly content: ContactContent | null;
  readonly isLoading: boolean;
};

export function useContact(): UseContactState {
  const showError = useToastStore((state) => state.showError);
  const [state, setState] = useState<UseContactState>({
    content: null,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadContact() {
      const result = await fetchContact();
      if (!isMounted) return;

      if (isErr(result)) {
        showError(result.error);
        setState({ content: null, isLoading: false });
      } else {
        setState({ content: result.value, isLoading: false });
      }
    }

    void loadContact();

    return () => {
      isMounted = false;
    };
  }, [showError]);

  return state;
}
