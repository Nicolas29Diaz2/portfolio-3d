import { useEffect } from 'react'

const DOUBLE_TAP_THRESHOLD_MS = 300

export function ZoomDisabler() {
  useEffect(() => {
    let lastTouchEnd = 0

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchEnd <= DOUBLE_TAP_THRESHOLD_MS) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        (event.key === '+' || event.key === '-' || event.key === '0')
      ) {
        event.preventDefault()
      }
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: false })
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return null
}
