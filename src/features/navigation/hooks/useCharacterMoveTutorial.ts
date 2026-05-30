import { useEffect, useState } from 'react'
import {
  hideIconTutorialCharacterTime,
  showIconTutorialCharacterTime,
} from '@/core/constants/timing'
import { useScaleAnimation } from '@/ui/hooks/useScaleAnimation'

export function useCharacterMoveTutorial(isStartButtonPressed: boolean) {
  const [showMoveLogo, setShowMoveLogo] = useState(false)

  useEffect(() => {
    if (!isStartButtonPressed) return

    const showTimer = window.setTimeout(() => {
      setShowMoveLogo(true)
    }, showIconTutorialCharacterTime)

    const hideTimer = window.setTimeout(() => {
      setShowMoveLogo(false)
    }, hideIconTutorialCharacterTime)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [isStartButtonPressed])

  const scale = useScaleAnimation(showMoveLogo, 1.1, 1)

  return {
    showTutorial: scale > 0,
    scale,
  }
}
