import { useEffect, useState } from 'react'
import { introAnimateCamera } from '@/core/constants/timing'

export function useInitialCameraMove(): boolean {
  const [moveInitialCamera, setMoveInitialCamera] = useState(false)

  useEffect(() => {
    const timer = globalThis.setTimeout(() => {
      setMoveInitialCamera(true)
    }, introAnimateCamera)

    return () => clearTimeout(timer)
  }, [])

  return moveInitialCamera
}
