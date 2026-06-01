import { Html } from "@react-three/drei";
import type { PortfolioView as PortfolioViewType } from "@/core/types/portfolioView";
import type { ChangeViewHandler } from "@/features/3d-scene/navigation/types/navigation3d.types";
import { useNavigationStore } from "@/store/navigationStore";
import { useScaleAnimation } from "@/ui/hooks/useScaleAnimation";
import "./FloatButton.css";

export type FloatButtonProps = {
  readonly view: PortfolioViewType;
  readonly changeView: ChangeViewHandler;
  readonly position: [number, number, number];
  readonly rotation: [number, number, number];
};

export function FloatButton({
  view,
  changeView,
  position,
  rotation,
}: FloatButtonProps) {
  const showFloatButtons = useNavigationStore(
    (state) => state.showFloatButtons,
  );
  const scale = useScaleAnimation(showFloatButtons, 0.8);

  return (
    <Html
      position={position}
      rotation={rotation}
      transform
      occlude="blending"
      className="contentFloatButton"
      scale={scale}
    >
      <div onClick={() => changeView(view)}>+</div>
      <i />
      <i />
    </Html>
  );
}
