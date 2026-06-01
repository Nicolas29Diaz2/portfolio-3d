import { useEffect, useState } from "react";
import { isErr } from "@/core/api/result";
import { useToastStore } from "@/store/toastStore";
import { fetchSkills } from "../services/skills.service";
import { CATEGORY_LAYOUT_MAP } from "../constants/skills.constants";
import type {
  SkillGroup,
  SkillType,
} from "../types/skills.types";

interface UseSkillsState {
  readonly skillGroups: readonly SkillGroup[];
  readonly isLoading: boolean;
  readonly activeIndex: number;
  readonly setActiveIndex: (index: number) => void;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function useSkills(): UseSkillsState {
  const showError = useToastStore((state) => state.showError);
  const [skillGroups, setSkillGroups] = useState<readonly SkillGroup[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    async function loadSkills() {
      const result = await fetchSkills();
      if (!isMounted) return;

      if (isErr(result)) {
        showError(result.error);
        setIsLoading(false);
      } else {
        const skills = result.value;

        const typesOrdered: readonly SkillType[] = [
          "web",
          "tool",
          "design",
          "other",
        ];
        const groups: SkillGroup[] = [];

        for (const type of typesOrdered) {
          const matchingSkills = skills.filter((s) => s.type === type);
          if (matchingSkills.length === 0) continue;

          const chunks = chunkArray(matchingSkills, 4);
          chunks.forEach((chunk, index) => {
            const layout = CATEGORY_LAYOUT_MAP[type];
            const categoryText =
              chunks.length > 1 ? `${layout.text} (${index + 1})` : layout.text;

            groups.push({
              id: index,
              category: {
                ...layout,
                text: categoryText,
              },
              skills: chunk,
            });
          });
        }

        setSkillGroups(groups);
        setIsLoading(false);
      }
    }

    void loadSkills();

    return () => {
      isMounted = false;
    };
  }, [showError]);

  return {
    skillGroups,
    isLoading,
    activeIndex,
    setActiveIndex,
  };
}
