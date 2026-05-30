import { useEffect } from 'react'
import { useDeviceCapabilities } from '@/core/performance/useDeviceCapabilities'
import { useNavigationStore } from '@/store/navigationStore'
import { useSceneStore } from '@/store/sceneStore'
import { useThemeStore } from '@/store/themeStore'
import { ToastContainer } from '@/ui/components/Toast'
import { ZoomDisablerWrapper } from '@/ui/components/ZoomDisabler'

function App() {
  const { gpuTier, isLoading } = useDeviceCapabilities()
  const setGpuTier = useSceneStore((state) => state.setGpuTier)
  const cameraFocus = useSceneStore((state) => state.cameraFocus)
  const sceneTheme = useThemeStore((state) => state.sceneTheme)
  const showFloatButtons = useNavigationStore((state) => state.showFloatButtons)

  useEffect(() => {
    if (!isLoading) {
      setGpuTier(gpuTier)
    }
  }, [gpuTier, isLoading, setGpuTier])

  return (
    <ZoomDisablerWrapper>
      <ToastContainer />
      <main className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-background-deep text-foreground">
        <p className="text-xl font-semibold tracking-wide">Nicolas Diaz</p>
        <p className="text-sm text-muted">
          {isLoading
            ? 'Detecting device…'
            : `View: ${cameraFocus} · GPU tier ${gpuTier} · Theme: ${sceneTheme}`}
        </p>
        <p className="text-xs text-muted">
          Float buttons: {showFloatButtons ? 'visible' : 'hidden'}
        </p>
      </main>
    </ZoomDisablerWrapper>
  )
}

export default App
