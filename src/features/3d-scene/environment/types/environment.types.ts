import type { EnvironmentSettings } from '@/core/constants/environmentConfig'
import type { GpuTier } from '@/core/performance/types'

/** Legacy Bloom props — SceneConf.jsx Dark branch */
export type BloomSettings = {
  readonly intensity: number
  readonly luminanceThreshold: number
  readonly luminanceSmoothing: number
}

export type EnvironmentSettingsState = {
  readonly settings: EnvironmentSettings
  readonly bloom: BloomSettings
}

/** Hardcoded Dark-branch scene constants (not in Config.js) */
export const SCENE_ENVIRONMENT_CONSTANTS = {
  fogDensity: 0.08,
  starsRadius: 80,
  starsDepth: 100,
  starsSaturation: 0,
  starsFade: true,
  starsSpeed: 1.3,
  floorRotation: [-Math.PI / 2, 0, 0] as const,
  floorPositionY: 0,
  floorSize: [40, 40] as const,
  reflectorMixBlur: 0.5,
  reflectorMinDepthThreshold: 0.4,
  reflectorMaxDepthThreshold: 1.2,
  reflectorColor: 'rgb(15, 15, 15)',
  reflectorMetalness: 0.5,
  environmentPreset: 'sunset',
} as const

/** Legacy SceneConf.jsx Bloom ternaries per gpuTier */
export function getBloomSettings(gpuTier: GpuTier): BloomSettings {
  if (gpuTier === 3) {
    return {
      intensity: 0.5,
      luminanceThreshold: 0.5,
      luminanceSmoothing: 0.9,
    }
  }
  if (gpuTier === 2) {
    return {
      intensity: 0.3,
      luminanceThreshold: 0.3,
      luminanceSmoothing: 0.3,
    }
  }
  return {
    intensity: 0,
    luminanceThreshold: 0.1,
    luminanceSmoothing: 0.1,
  }
}
