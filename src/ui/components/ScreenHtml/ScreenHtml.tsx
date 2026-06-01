import type { ComponentProps, ReactNode } from 'react'
import { Html } from '@react-three/drei'

type DreiHtmlProps = ComponentProps<typeof Html>

export type ScreenHtmlProps = Omit<
  DreiHtmlProps,
  'transform' | 'occlude' | 'tabIndex' | 'distanceFactor'
> & {
  children: ReactNode
  /** Defaults to `true` — renders HTML as a 3D-transformed overlay. */
  transform?: boolean
  /** Defaults to `"blending"` — occludes against the scene using blending. */
  occlude?: DreiHtmlProps['occlude']
  /** Defaults to `0` for keyboard focus on interactive screens. */
  tabIndex?: number
  /** Defaults to `1.72` — legacy average for monitor overlays. Override per screen. */
  distanceFactor?: number
}

const DEFAULT_TRANSFORM = true
const DEFAULT_OCCLUDE = 'blending' as const
const DEFAULT_TAB_INDEX = 0
const DEFAULT_DISTANCE_FACTOR = 1.72

/**
 * Standardized wrapper around `@react-three/drei` `Html` for portfolio monitor overlays.
 *
 * Per-screen overrides used in legacy:
 * - About / Skills: distanceFactor 1.72
 * - Projects: distanceFactor 2
 * - Menu / Contact: distanceFactor 1
 */
export function ScreenHtml({
  children,
  transform = DEFAULT_TRANSFORM,
  occlude = DEFAULT_OCCLUDE,
  tabIndex = DEFAULT_TAB_INDEX,
  distanceFactor = DEFAULT_DISTANCE_FACTOR,
  ...rest
}: ScreenHtmlProps) {
  return (
    <Html
      transform={transform}
      occlude={occlude}
      tabIndex={tabIndex}
      distanceFactor={distanceFactor}
      {...rest}
    >
      {children}
    </Html>
  )
}
