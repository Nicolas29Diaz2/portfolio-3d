import type { RefObject } from 'react'
import type { CameraControls as CameraControlsImpl } from '@react-three/drei'
import { PortfolioView } from '@/core/types/portfolioView'
import type { PortfolioView as PortfolioViewType } from '@/core/types/portfolioView'
import { truckSpeed } from '@/core/constants/cameraControls'

export const FLOAT_BUTTON_PLACEMENTS = [
  {
    view: PortfolioView.CONTACT,
    position: [0, 2.7, -6] as const,
    rotation: [0, 0, Math.PI / 4] as const,
  },
  {
    view: PortfolioView.SKILLS,
    position: [-6.85, 4, -2.37] as const,
    rotation: [0, 1, Math.PI / 4] as const,
  },
  {
    view: PortfolioView.PROJECTS,
    position: [0.5, 2.53, 7] as const,
    rotation: [0, 0, Math.PI / 4] as const,
  },
  {
    view: PortfolioView.ABOUT,
    position: [8, 2.8, 0.65] as const,
    rotation: [0, Math.PI / 2, Math.PI / 4] as const,
  },
] as const

export type FloatButtonPlacement = (typeof FLOAT_BUTTON_PLACEMENTS)[number]

export type ChangeViewHandler = (
  view: PortfolioViewType,
  showFloatButtons?: boolean,
) => void

export type UseCameraNavigationOptions = {
  readonly moveInitialCamera: boolean
}

export type UseCameraNavigationReturn = {
  readonly cameraControlRef: RefObject<CameraControlsImpl | null>
  readonly truckSpeed: typeof truckSpeed
  readonly changeView: ChangeViewHandler
  readonly floatButtonPlacements: typeof FLOAT_BUTTON_PLACEMENTS
}
