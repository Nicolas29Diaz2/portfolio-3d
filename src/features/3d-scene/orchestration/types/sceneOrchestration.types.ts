import type { PortfolioView } from '@/core/types/portfolioView'

export type IntroSequenceState = {
  readonly characterIntroAnim: boolean
  readonly characterSitAnim: boolean
  readonly characterDissolveEyes: boolean
  readonly chairHelmetAnim: boolean
  readonly showScreens: boolean
  /** Projects3D visible — set true in startAnimation (legacy Scene3D) */
  readonly showProjects: boolean
}

export type SceneVisibilityState = {
  readonly showScenario: boolean
  readonly showCharacter: boolean
  readonly showChair: boolean
  readonly showMenu: boolean
  readonly showProjects: boolean
  readonly chargeCharacter: boolean
  readonly chargeScreen: boolean
}

export type SceneOrchestratorContext = {
  readonly intro: IntroSequenceState
  readonly visibility: SceneVisibilityState
  readonly cameraFocus: PortfolioView
}
