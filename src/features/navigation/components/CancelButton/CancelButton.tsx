import type { CancelButtonProps } from '@/features/navigation/types/navigationHud.types'
import './CancelButton.css'

const ARROW_BACK_ICON = '/Images/Icons/ArrowBack.png'

export function CancelButton({ onPress }: Readonly<CancelButtonProps>) {
  return (
    <button
      type="button"
      className="cancel-button"
      onClick={onPress}
      aria-label="Back button"
    >
      <img
        className="cancel-button__icon"
        src={ARROW_BACK_ICON}
        alt=""
        width={22}
        height={22}
        draggable={false}
      />
    </button>
  )
}
