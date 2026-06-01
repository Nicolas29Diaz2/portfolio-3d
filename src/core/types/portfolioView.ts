export const PortfolioView = {
  CHARACTER: 'CHARACTER',
  MENU: 'MENU',
  INITIAL: 'INITIAL',
  SKILLS: 'SKILLS',
  CONTACT: 'CONTACT',
  ABOUT: 'ABOUT',
  PROJECTS: 'PROJECTS',
} as const

export type PortfolioView = (typeof PortfolioView)[keyof typeof PortfolioView]
