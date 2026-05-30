import type { ReactNode } from 'react'
import { ScreenHtml } from '@/ui/components/ScreenHtml/ScreenHtml'
import { useScaleAnimation } from '@/ui/hooks/useScaleAnimation'
import './MonitorPlaceholder.css'

type MonitorPlaceholderProps = {
  readonly showScreen: boolean
  readonly label: string
  readonly distanceFactor?: number
  readonly position?: [number, number, number]
  readonly rotation?: [number, number, number]
  readonly width?: number
  readonly height?: number
  readonly children?: ReactNode
}

/** Phase 8 placeholder until feature screens ship in Phases 9–12 */
export function MonitorPlaceholder({
  showScreen,
  label,
  distanceFactor = 1.72,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 320,
  height = 240,
  children,
}: MonitorPlaceholderProps) {
  const scale = useScaleAnimation(showScreen)

  return (
    <ScreenHtml
      distanceFactor={distanceFactor}
      position={position}
      rotation={rotation}
      scale={scale}
      className="monitor-placeholder"
      style={{ width, height }}
    >
      {children ?? <p className="monitor-placeholder-label">{label}</p>}
    </ScreenHtml>
  )
}
