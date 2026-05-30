export type { DeviceCapabilities, GpuTier } from './types'
export {
  clampGpuTier,
  detectBatteryCharging,
  detectGpuTier,
  fetchDeviceCapabilities,
  fetchDeviceCapabilitiesDetailed,
  resolveEffectiveGpuTier,
} from './deviceCapabilities'
export { useDeviceCapabilities } from './useDeviceCapabilities'
