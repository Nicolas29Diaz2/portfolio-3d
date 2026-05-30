import { ZoomDisablerWrapper } from '@/ui/components/ZoomDisabler'

function App() {
  return (
    <ZoomDisablerWrapper>
      <main className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-background-deep text-foreground">
        <p className="text-xl font-semibold tracking-wide">Nicolas Diaz</p>
        <p className="text-sm text-muted">Portfolio 3D — scaffold ready</p>
      </main>
    </ZoomDisablerWrapper>
  )
}

export default App
