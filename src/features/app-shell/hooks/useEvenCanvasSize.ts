import { useEffect, useState } from 'react'
import type { EvenCanvasSize } from '@/features/app-shell/types/appShell.types'

function toEvenDimension(value: number): number {
  return value % 2 === 0 ? value : value + 1
}

function getEvenCanvasSize(): EvenCanvasSize {
  return {
    width: toEvenDimension(window.innerWidth),
    height: toEvenDimension(window.innerHeight),
  }
}

export function useEvenCanvasSize(): EvenCanvasSize {
  const [canvasSize, setCanvasSize] = useState<EvenCanvasSize>(getEvenCanvasSize)

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(getEvenCanvasSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return canvasSize
}
