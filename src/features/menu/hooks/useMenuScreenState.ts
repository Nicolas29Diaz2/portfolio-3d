import { useEffect, useState } from "react";
import { PortfolioView } from "@/core/types/portfolioView";
import { useSceneStore } from "@/store/sceneStore";

type MenuScreenState = {
  canPressButton: boolean;
  isMenuOptionsVisible: boolean;
  isInteractable: boolean;
};

const INITIAL_STATE: MenuScreenState = {
  canPressButton: false,
  isMenuOptionsVisible: false,
  isInteractable: false,
};

export function useMenuScreenState() {
  const cameraFocus = useSceneStore((state) => state.cameraFocus);
  const [state, setState] = useState<MenuScreenState>(INITIAL_STATE);

  const isHandVisible = cameraFocus !== PortfolioView.MENU;

  useEffect(() => {
    if (cameraFocus === PortfolioView.MENU) {
      const immediateTimer = window.setTimeout(() => {
        setState((prev) => ({ ...prev, isMenuOptionsVisible: true }));
      }, 0);

      const canPressTimer = window.setTimeout(() => {
        setState((prev) => ({ ...prev, canPressButton: true }));
      }, 1500);

      return () => {
        clearTimeout(immediateTimer);
        clearTimeout(canPressTimer);
      };
    }

    if (cameraFocus === PortfolioView.INITIAL) {
      const timer = window.setTimeout(() => {
        setState((prev) => ({ ...prev, isInteractable: false }));
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setState({
        isInteractable: true,
        isMenuOptionsVisible: false,
        canPressButton: false,
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [cameraFocus]);

  return {
    canPressButton: state.canPressButton,
    isHandVisible,
    isMenuOptionsVisible: state.isMenuOptionsVisible,
    isInteractable: state.isInteractable,
  };
}
