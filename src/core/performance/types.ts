export type GpuTier = 1 | 2 | 3

export type DeviceCapabilities = {
  gpuTier: GpuTier
  isCharging: boolean
  rawGpuTier: number
}
