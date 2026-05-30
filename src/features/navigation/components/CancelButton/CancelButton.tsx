import type { CancelButtonProps } from '@/features/navigation/types/navigationHud.types'
import './CancelButton.css'

export function CancelButton({ onPress }: Readonly<CancelButtonProps>) {
  return (
    <div className="contentCancelButton">
      <div onClick={onPress}>+</div>
      <i />
      <i />
    </div>
  )
}
