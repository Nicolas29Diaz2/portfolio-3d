export type MenuScreenProps = {
  readonly showScreen: boolean
}

export type MenuNavButtonsProps = {
  readonly isMenuOptionsVisible: boolean
  readonly canPressButton: boolean
}

export type MenuNavButtonProps = {
  readonly positionY: number
  readonly canPressButton: boolean
  readonly text: string
  readonly onClick: () => void
}
