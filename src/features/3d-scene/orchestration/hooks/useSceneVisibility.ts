import { PortfolioView } from "@/core/types/portfolioView";
import type { SceneVisibilityState } from "@/features/3d-scene/orchestration/types/sceneOrchestration.types";

const DEFAULT_VISIBILITY: SceneVisibilityState = {
  showScenario: true,
  showCharacter: true,
  showChair: true,
  showMenu: true,
  showProjects: false,
  chargeCharacter: true,
  chargeScreen: true,
};

const VISIBILITY_BY_VIEW: Record<
  Partial<PortfolioView>,
  SceneVisibilityState
> = {
  [PortfolioView.INITIAL]: {
    showScenario: true,
    showCharacter: true,
    showChair: true,
    showMenu: true,
    showProjects: false,
    chargeCharacter: true,
    chargeScreen: false,
  },
  [PortfolioView.PROJECTS]: {
    showScenario: true,
    showCharacter: false,
    showChair: false,
    showMenu: false,
    showProjects: false,
    chargeCharacter: true,
    chargeScreen: false,
  },
  [PortfolioView.CHARACTER]: {
    ...DEFAULT_VISIBILITY,
  },
  [PortfolioView.MENU]: {
    ...DEFAULT_VISIBILITY,
  },
  [PortfolioView.SKILLS]: {
    ...DEFAULT_VISIBILITY,
  },
  [PortfolioView.CONTACT]: {
    ...DEFAULT_VISIBILITY,
  },
  [PortfolioView.ABOUT]: {
    ...DEFAULT_VISIBILITY,
  },
};

export function useSceneVisibility(
  cameraFocus: PortfolioView,
): SceneVisibilityState {
  return VISIBILITY_BY_VIEW[cameraFocus] ?? DEFAULT_VISIBILITY;
}
