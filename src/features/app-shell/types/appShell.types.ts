import type { ReactNode } from 'react'
import type { GpuTier } from '@/core/performance/types'

/** Legacy Canvas camera — App.jsx */
export const APP_SHELL_CAMERA = {
  position: [0.9, 3.5, 4] as const,
  fov: 75,
  lookAt: [1.9, 1.2, 0] as const,
} as const

export type AppShellCameraConfig = typeof APP_SHELL_CAMERA

export type EvenCanvasSize = {
  readonly width: number
  readonly height: number
}

export type AppShellProps = {
  readonly gpuTier: GpuTier
  readonly children: ReactNode
}
