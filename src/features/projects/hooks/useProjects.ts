import { useEffect, useState } from "react";
import { isErr } from "@/core/api/result";
import { fetchProjects } from "@/features/projects/services/projects.service";
import type { ProjectContent } from "@/features/projects/types/projects.types";
import { useToastStore } from "@/store/toastStore";

type UseProjectsState = {
  readonly projects: readonly ProjectContent[];
  readonly isLoading: boolean;
};

export function useProjects(): UseProjectsState {
  const showError = useToastStore((state) => state.showError);
  const [state, setState] = useState<UseProjectsState>({
    projects: [],
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      const result = await fetchProjects();

      if (!isMounted) {
        return;
      }

      if (isErr(result)) {
        showError(result.error);
        setState({ projects: [], isLoading: false });
        return;
      }

      setState({ projects: result.value, isLoading: false });
    }

    void loadProjects();

    return () => {
      isMounted = false;
    };
  }, [showError]);

  return state;
}
