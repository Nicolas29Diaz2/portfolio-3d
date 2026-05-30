import { useDeviceCapabilities } from '@/core/performance'
import { ToastContainer } from '@/ui/components/Toast'
import { ZoomDisablerWrapper } from '@/ui/components/ZoomDisabler'

function App() {
  const { gpuTier, isLoading } = useDeviceCapabilities()

  return (
    <ZoomDisablerWrapper>
      <ToastContainer />
      <main className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-background-deep text-foreground">
        <p className="text-xl font-semibold tracking-wide">Nicolas Diaz</p>
        <p className="text-sm text-muted">
          {isLoading ? 'Detecting device…' : `GPU tier ${gpuTier} — core layer ready`}
        </p>
      </main>
    </ZoomDisablerWrapper>
  )
}

export default App
