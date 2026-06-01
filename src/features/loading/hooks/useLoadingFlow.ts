import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { showStartTextTime, slideInTime } from '@/core/constants/timing'
import { PRELOAD_DOM_IDS } from '@/features/loading/types/loading.types'
import type {
  LoadingScreenProps,
  UseLoadingFlowOptions,
  UseLoadingFlowReturn,
} from '@/features/loading/types/loading.types'
import { useNavigationStore } from '@/store/navigationStore'

function hidePreloadShell(): void {
  const logo = document.getElementById(PRELOAD_DOM_IDS.logo)
  const screen = document.getElementById(PRELOAD_DOM_IDS.screen)
  if (logo) logo.style.display = 'none'
  if (screen) screen.style.display = 'none'
}

export function useLoadingFlow(
  options: UseLoadingFlowOptions = {},
): UseLoadingFlowReturn {
  const { progress: dreiProgress } = useProgress()
  const progress = options.progress ?? dreiProgress

  const isStartButtonPressed = useNavigationStore(
    (state) => state.isStartButtonPressed,
  )
  const isStartButtonVisible = useNavigationStore(
    (state) => state.isStartButtonVisible,
  )
  const setStartButtonPressed = useNavigationStore(
    (state) => state.setStartButtonPressed,
  )
  const setStartButtonVisibility = useNavigationStore(
    (state) => state.setStartButtonVisibility,
  )

  const [hideLoadingLogo, setHideLoadingLogo] = useState(false)
  const [slideIn, setSlideIn] = useState(false)

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setHideLoadingLogo(true)
      }, 100)

      setTimeout(() => {
        setSlideIn(true)
      }, slideInTime)

      setTimeout(() => {
        setStartButtonVisibility(true)
      }, showStartTextTime)
    }

    hidePreloadShell()
  }, [progress, setStartButtonVisibility])

  const loadingScreenProps: LoadingScreenProps = {
    progress,
    hideLoadingLogo,
    slideIn,
    isStartButtonPressed,
    isStartButtonVisible,
    onContinue: () => setStartButtonPressed(true),
  }

  return { progress, loadingScreenProps }
}
