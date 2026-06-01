import { useEffect, useState } from "react";
import { isErr } from "@/core/api/result";
import { fetchDeviceCapabilitiesDetailed } from "./deviceCapabilities";
import type { GpuTier } from "./types";

type UseDeviceCapabilitiesState = {
  gpuTier: GpuTier;
  isCharging: boolean;
  rawGpuTier: number;
  isLoading: boolean;
  error: string | null;
};

const DEFAULT_STATE: UseDeviceCapabilitiesState = {
  gpuTier: 1,
  isCharging: true,
  rawGpuTier: 1,
  isLoading: true,
  error: null,
};

export function useDeviceCapabilities(): UseDeviceCapabilitiesState {
  const [state, setState] = useState<UseDeviceCapabilitiesState>(DEFAULT_STATE);

  useEffect(() => {
    let isMounted = true;

    void fetchDeviceCapabilitiesDetailed().then((result) => {
      if (!isMounted) return;

      if (isErr(result)) {
        setState({
          gpuTier: 1,
          isCharging: true,
          rawGpuTier: 1,
          isLoading: false,
          error: result.error.message,
        });
        return;
      }

      setState({
        gpuTier: result.value.gpuTier,
        isCharging: result.value.isCharging,
        rawGpuTier: result.value.rawGpuTier,
        isLoading: false,
        error: null,
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
