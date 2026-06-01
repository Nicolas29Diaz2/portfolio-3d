import { useMemo } from 'react'
import {
  environmentTier2,
  getEnvironmentSettings,
} from '@/core/constants/environmentConfig'
import type { GpuTier } from '@/core/performance/types'
import {
  getBloomSettings,
  type EnvironmentSettingsState,
} from '@/features/3d-scene/environment/types/environment.types'

/** Legacy SceneConf.jsx gpuTier switch → configurations[0|1|2], default configurations[1] */
function resolveEnvironmentSettings(gpuTier: GpuTier) {
  if (gpuTier === 1 || gpuTier === 2 || gpuTier === 3) {
    return getEnvironmentSettings(gpuTier)
  }
  return environmentTier2
}

export function useEnvironmentSettings(gpuTier: GpuTier): EnvironmentSettingsState {
  return useMemo(
    () => ({
      settings: resolveEnvironmentSettings(gpuTier),
      bloom: getBloomSettings(gpuTier),
    }),
    [gpuTier],
  )
}
