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

export const SCENE_ENVIRONMENT_PRESET = 'sunset' as const

export const DARK_SCENE_CONSTANTS = {
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
} as const

/** Light theme — SceneConf.jsx Light branch */
export const LIGHT_SCENE_CONSTANTS = {
  bloom: {
    mipmapBlur: true,
    luminanceThreshold: 2,
    intensity: 0.2,
  },
  vignette: {
    eskil: false,
    offset: 0.3,
    darkness: 0.6,
  },
  ambientLightIntensity: 0.01,
  shadows: {
    position: [0, 0, 0] as const,
    frames: 120,
    alphaTest: 0.9,
    scale: 15,
  },
  randomizedLight: {
    amount: 1,
    radius: 0.1,
    ambient: 0.9,
    position: [1, 5, -1] as const,
  },
  environment: {
    resolution: 32,
    background: true,
    blur: 1,
  },
} as const

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
