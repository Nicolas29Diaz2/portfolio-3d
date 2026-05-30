import { create } from 'zustand'
import { PortfolioView, type PortfolioView as PortfolioViewType } from '@/core/types/portfolioView'
import type { GpuTier } from '@/core/performance/types'

type SceneStore = {
  cameraFocus: PortfolioViewType
  gpuTier: GpuTier
  isCharacterAnimStarted: boolean
  setCameraFocus: (focus: PortfolioViewType) => void
  setGpuTier: (tier: GpuTier) => void
  setCharacterAnimStarted: (value: boolean) => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  cameraFocus: PortfolioView.INITIAL,
  gpuTier: 1,
  isCharacterAnimStarted: false,

  setCameraFocus: (focus) => set({ cameraFocus: focus }),
  setGpuTier: (tier) => set({ gpuTier: tier }),
  setCharacterAnimStarted: (value) => set({ isCharacterAnimStarted: value }),
}))
