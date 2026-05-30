/** Preset distance factors matching legacy screen configurations. */
export const ScreenHtmlDistance = {
  menu: 1,
  contact: 1,
  about: 1.72,
  skills: 1.72,
  projects: 2,
} as const

export type ScreenHtmlDistanceKey = keyof typeof ScreenHtmlDistance
