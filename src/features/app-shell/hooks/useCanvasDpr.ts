import type { GpuTier } from '@/core/performance/types'

/** Legacy App.jsx: dpr={gpuTier === 3 ? 2 : 1} */
export function useCanvasDpr(gpuTier: GpuTier): number {
  return gpuTier === 3 ? 2 : 1
}
