import { useEffect } from "react";
import { Link } from "react-router-dom";
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
import "./PortfolioPage.css";

function PortfolioPage() {
  const { gpuTier, isLoading } = useDeviceCapabilities();
  const sceneGpuTier = useSceneStore((state) => state.gpuTier);
  const setGpuTier = useSceneStore((state) => state.setGpuTier);
  const { loadingScreenProps } = useLoadingFlow();
  const moveInitialCamera = useInitialCameraMove();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setGpuTier(gpuTier);
    }
  }, [gpuTier, isLoading, setGpuTier]);

  return (
    <>
      <Link to="/" className="portfolio-return-2d-btn" title="Back to 2D Portfolio">
        <span>← 2D Mode</span>
      </Link>
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

export default PortfolioPage;

