import { CameraControls } from "@react-three/drei";
import { useCameraNavigation } from "@/features/3d-scene/navigation/hooks/useCameraNavigation";
import type { UseCameraNavigationOptions } from "@/features/3d-scene/navigation/types/navigation3d.types";
import { FloatButton } from "@/ui/components/FloatButton/FloatButton";

type CameraControllerProps = UseCameraNavigationOptions;

export function CameraController({
  moveInitialCamera,
}: Readonly<CameraControllerProps>) {
  const { cameraControlRef, truckSpeed, changeView, floatButtonPlacements } =
    useCameraNavigation({ moveInitialCamera });

  return (
    <>
      <CameraControls ref={cameraControlRef} truckSpeed={truckSpeed} />

      {floatButtonPlacements.map((placement) => (
        <FloatButton
          key={placement.view}
          view={placement.view}
          changeView={changeView}
          position={[...placement.position]}
          rotation={[...placement.rotation]}
        />
      ))}
    </>
  );
}
