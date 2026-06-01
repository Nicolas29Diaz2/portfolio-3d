/** IDs from index.html preload shell — must stay in sync with index.html */
export const PRELOAD_DOM_IDS = {
  logo: 'preload-logo',
  screen: 'preload-screen',
} as const

export type PreloadDomId =
  (typeof PRELOAD_DOM_IDS)[keyof typeof PRELOAD_DOM_IDS]

/** View: circular progress + scale-out (legacy LoadingLogo) */
export type LoadingIconProps = {
  readonly progress: number
  readonly hideLoadingLogo: boolean
}

/** View: slide panels, intro copy, Continue */
export type LoadingScreenProps = {
  readonly progress: number
  readonly hideLoadingLogo: boolean
  readonly slideIn: boolean
  readonly isStartButtonPressed: boolean
  readonly isStartButtonVisible: boolean
  readonly onContinue: () => void
}

/** Local UI state owned by useLoadingFlow (not in Zustand in legacy) */
export type LoadingUiState = {
  readonly hideLoadingLogo: boolean
  readonly slideIn: boolean
}

/** Options if progress is injected (e.g. tests); default uses drei useProgress */
export type UseLoadingFlowOptions = {
  readonly progress?: number
}

/** Hook return — spread into LoadingScreen */
export type UseLoadingFlowReturn = {
  readonly progress: number
  readonly loadingScreenProps: LoadingScreenProps
}
