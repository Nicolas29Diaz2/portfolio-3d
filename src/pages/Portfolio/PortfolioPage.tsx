import { useEffect } from "react";
import { Preload } from "@react-three/drei";
import { useDeviceCapabilities } from "@/core/performance/useDeviceCapabilities";
import { AppShell } from "@/features/app-shell/components/AppShell/AppShell";
import { SceneEnvironment } from "@/features/3d-scene/environment/components/SceneEnvironment/SceneEnvironment";
import { CameraController } from "@/features/3d-scene/navigation/components/CameraController/CameraController";
import { useInitialCameraMove } from "@/features/3d-scene/navigation/hooks/useInitialCameraMove";
import { SceneOrchestrator } from "@/features/3d-scene/orchestration/components/SceneOrchestrator/SceneOrchestrator";
import { LoadingScreen } from "@/features/loading/components/LoadingScreen/LoadingScreen";
import { NavigationOverlay } from "@/features/navigation/components/NavigationOverlay/NavigationOverlay";
import { useLoadingFlow } from "@/features/loading/hooks/useLoadingFlow";
import { useSceneStore } from "@/store/sceneStore";

function App() {
  const { gpuTier, isLoading } = useDeviceCapabilities();
  const sceneGpuTier = useSceneStore((state) => state.gpuTier);
  const setGpuTier = useSceneStore((state) => state.setGpuTier);
  const { loadingScreenProps } = useLoadingFlow();
  const moveInitialCamera = useInitialCameraMove();

  useEffect(() => {
    if (!isLoading) {
      setGpuTier(gpuTier);
    }
  }, [gpuTier, isLoading, setGpuTier]);

  return (
    <>
      <LoadingScreen {...loadingScreenProps} />
      <NavigationOverlay />
      <AppShell gpuTier={sceneGpuTier}>
        <SceneEnvironment />
        <SceneOrchestrator />
        <CameraController moveInitialCamera={moveInitialCamera} />
        <Preload all />
      </AppShell>
    </>
  );
}

export default App;
