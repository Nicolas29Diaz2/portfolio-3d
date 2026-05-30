import { useEffect } from "react";
import { useDeviceCapabilities } from "@/core/performance/useDeviceCapabilities";
import { LoadingScreen } from "@/features/loading/components/LoadingScreen/LoadingScreen";
import { useLoadingFlow } from "@/features/loading/hooks/useLoadingFlow";
import { useSceneStore } from "@/store/sceneStore";
import { ToastContainer } from "@/ui/components/Toast";
import { ZoomDisablerWrapper } from "@/ui/components/ZoomDisabler";

function App() {
  const { gpuTier, isLoading } = useDeviceCapabilities();
  const setGpuTier = useSceneStore((state) => state.setGpuTier);
  const { loadingScreenProps } = useLoadingFlow();

  useEffect(() => {
    if (!isLoading) {
      setGpuTier(gpuTier);
    }
  }, [gpuTier, isLoading, setGpuTier]);

  return (
    <ZoomDisablerWrapper>
      <ToastContainer />
      <LoadingScreen {...loadingScreenProps} />
    </ZoomDisablerWrapper>
  );
}

export default App;
