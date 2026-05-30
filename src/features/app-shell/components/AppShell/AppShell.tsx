import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import { useCanvasDpr } from '@/features/app-shell/hooks/useCanvasDpr'
import { useEvenCanvasSize } from '@/features/app-shell/hooks/useEvenCanvasSize'
import {
  APP_SHELL_CAMERA,
  type AppShellProps,
} from '@/features/app-shell/types/appShell.types'
import './AppShell.css'

export function AppShell({ gpuTier, children }: Readonly<AppShellProps>) {
  const canvasSize = useEvenCanvasSize()
  const dpr = useCanvasDpr(gpuTier)
  const refCanvas = useRef<HTMLCanvasElement | null>(null)

  const handleCreated = ({ camera }: RootState) => {
    camera.lookAt(...APP_SHELL_CAMERA.lookAt)
    camera.updateProjectionMatrix()
  }

  return (
    <div
      className="canvas-container"
      style={{
        height: canvasSize.height,
        width: canvasSize.width,
      }}
    >
      <Canvas
        shadows
        camera={{
          position: [...APP_SHELL_CAMERA.position],
          fov: APP_SHELL_CAMERA.fov,
        }}
        onCreated={handleCreated}
        ref={refCanvas}
        dpr={dpr}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  )
}
