export type EnvironmentSettings = {
  floorResolution: number
  blur: [number, number]
  mixStrength: number
  depthScale: number
  fogDensity: number
  starsCount: number
  starsFactor: number
  fogColor: string
  backgroundColor: string
}

/** GPU tier 1 — low-end preset. */
export const environmentTier1: EnvironmentSettings = {
  floorResolution: 320,
  blur: [200, 200],
  mixStrength: 10,
  depthScale: 1,
  fogDensity: 0.1,
  starsCount: 500,
  starsFactor: 5,
  fogColor: 'rgb(10, 10, 10)',
  backgroundColor: 'rgb(10, 10, 10)',
}

/** GPU tier 2 — mid-range preset. */
export const environmentTier2: EnvironmentSettings = {
  floorResolution: 640,
  blur: [300, 300],
  mixStrength: 30,
  depthScale: 1.2,
  fogDensity: 0.1,
  starsCount: 500,
  starsFactor: 7,
  fogColor: 'rgb(5, 5, 5)',
  backgroundColor: 'rgb(5, 5, 5)',
}

/** GPU tier 3 — high-end preset. */
export const environmentTier3: EnvironmentSettings = {
  floorResolution: 640,
  blur: [300, 300],
  mixStrength: 30,
  depthScale: 1.2,
  fogDensity: 0.1,
  starsCount: 500,
  starsFactor: 7,
  fogColor: 'rgb(0, 0, 0)',
  backgroundColor: 'rgb(0, 0, 0)',
}

export const environmentByGpuTier: Record<1 | 2 | 3, EnvironmentSettings> = {
  1: environmentTier1,
  2: environmentTier2,
  3: environmentTier3,
}

export function getEnvironmentSettings(gpuTier: 1 | 2 | 3): EnvironmentSettings {
  return environmentByGpuTier[gpuTier]
}
