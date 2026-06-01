import { useEffect, useRef, useState } from 'react'

/**
 * Animates a scale value between 0 and `scaleMax` when `isVisible` toggles.
 * Skips animation on the initial mount (legacy behaviour).
 */
export function useScaleAnimation(
  isVisible: boolean,
  scaleMax = 1,
  duration = 200,
): number {
  const [scale, setScale] = useState(isVisible ? scaleMax : 0)
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    let animationFrame = 0
    const startTime = performance.now()

    const animate = (time: number) => {
      const elapsedTime = time - startTime
      const progress = Math.min(elapsedTime / duration, scaleMax)

      setScale(isVisible ? progress : scaleMax - progress)

      if (progress < scaleMax) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isVisible, scaleMax, duration])

  return scale
}
