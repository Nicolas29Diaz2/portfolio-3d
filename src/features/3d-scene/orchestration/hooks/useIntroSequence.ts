import { useEffect, useState } from "react";
import {
  characterEyesDissolveDelay,
  helmetAnimationDelay,
  introAnimationTime,
  showScreensTime,
} from "@/core/constants/timing";
import type { IntroSequenceState } from "@/features/3d-scene/orchestration/types/sceneOrchestration.types";
import { useNavigationStore } from "@/store/navigationStore";

const INTRO_INITIAL: IntroSequenceState = {
  characterIntroAnim: false,
  characterSitAnim: false,
  characterDissolveEyes: false,
  chairHelmetAnim: false,
  showScreens: false,
  showProjects: false,
};

export function useIntroSequence(): IntroSequenceState {
  const isStartButtonPressed = useNavigationStore(
    (state) => state.isStartButtonPressed,
  );
  const [state, setState] = useState<IntroSequenceState>(INTRO_INITIAL);

  useEffect(() => {
    if (isStartButtonPressed) {
      const showScreensTimer = globalThis.setTimeout(() => {
        setState((prev) => ({ ...prev, showScreens: true }));
      }, showScreensTime);

      const showProjectsTimer = globalThis.setTimeout(() => {
        setState((prev) => ({
          ...prev,
          characterIntroAnim: false,
          characterSitAnim: true,
          showProjects: true,
        }));
      }, 0);
      const helmetTimer = globalThis.setTimeout(() => {
        setState((prev) => ({ ...prev, chairHelmetAnim: true }));
      }, helmetAnimationDelay);

      const eyesTimer = globalThis.setTimeout(() => {
        setState((prev) => ({ ...prev, characterDissolveEyes: true }));
      }, characterEyesDissolveDelay);

      return () => {
        clearTimeout(showScreensTimer);
        clearTimeout(showProjectsTimer);
        clearTimeout(helmetTimer);
        clearTimeout(eyesTimer);
      };
    }

    const introTimer = globalThis.setTimeout(() => {
      setState((prev) => ({ ...prev, characterIntroAnim: true }));
    }, introAnimationTime);

    return () => clearTimeout(introTimer);
  }, [isStartButtonPressed]);

  return state;
}
