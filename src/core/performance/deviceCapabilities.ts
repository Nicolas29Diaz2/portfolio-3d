import { getGPUTier } from 'detect-gpu'
import { createAppError, type AppError } from '@/core/api/errors'
import { err, ok, type Result } from '@/core/api/result'
import type { DeviceCapabilities, GpuTier } from './types'

type BatteryManager = {
  charging: boolean
}

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManager>
}

export async function detectGpuTier(): Promise<Result<number, AppError>> {
  try {
    const gpuInfo = await getGPUTier()
    return ok(gpuInfo.tier)
  } catch (cause) {
    return err(
      createAppError('GPU_DETECTION_FAILED', 'Unable to detect GPU capabilities.', {
        cause,
      }),
    )
  }
}

export async function detectBatteryCharging(): Promise<Result<boolean, AppError>> {
  const navigatorWithBattery = navigator as NavigatorWithBattery

  if (!navigatorWithBattery.getBattery) {
    return err(
      createAppError(
        'BATTERY_API_UNAVAILABLE',
        'Battery Status API is not available in this browser.',
      ),
    )
  }

  try {
    const battery = await navigatorWithBattery.getBattery()
    return ok(battery.charging)
  } catch (cause) {
    return err(
      createAppError('UNKNOWN_ERROR', 'Unable to read battery status.', { cause }),
    )
  }
}

/** Downgrades GPU tier when the device is not charging (legacy behaviour). */
export function resolveEffectiveGpuTier(rawTier: number, isCharging: boolean): number {
  if (isCharging) return rawTier

  if (rawTier === 3) return 2
  if (rawTier === 2) return 1
  return rawTier
}

export function clampGpuTier(tier: number): GpuTier {
  if (tier >= 3) return 3
  if (tier <= 1) return 1
  return 2
}

export async function fetchDeviceCapabilities(): Promise<Result<GpuTier, AppError>> {
  const gpuResult = await detectGpuTier()
  if (gpuResult.ok === false) {
    return gpuResult
  }

  const batteryResult = await detectBatteryCharging()
  const isCharging = batteryResult.ok ? batteryResult.value : true
  const effectiveTier = resolveEffectiveGpuTier(gpuResult.value, isCharging)

  return ok(clampGpuTier(effectiveTier))
}

export async function fetchDeviceCapabilitiesDetailed(): Promise<
  Result<DeviceCapabilities, AppError>
> {
  const gpuResult = await detectGpuTier()
  if (gpuResult.ok === false) {
    return gpuResult
  }

  const batteryResult = await detectBatteryCharging()
  const isCharging = batteryResult.ok ? batteryResult.value : true
  const effectiveTier = clampGpuTier(
    resolveEffectiveGpuTier(gpuResult.value, isCharging),
  )

  return ok({
    gpuTier: effectiveTier,
    isCharging,
    rawGpuTier: gpuResult.value,
  })
}
