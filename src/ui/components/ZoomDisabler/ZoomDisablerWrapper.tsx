import type { ReactNode } from 'react'
import { ZoomDisabler } from './ZoomDisabler'

type ZoomDisablerWrapperProps = {
  children: ReactNode
}

export function ZoomDisablerWrapper({ children }: ZoomDisablerWrapperProps) {
  return (
    <div className="h-full w-full touch-none overflow-hidden">
      <ZoomDisabler />
      {children}
    </div>
  )
}
