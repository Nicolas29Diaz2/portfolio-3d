import { CancelButton } from '@/features/navigation/components/CancelButton/CancelButton'
import { FloatingMenuBar } from '@/features/navigation/components/FloatingMenuBar/FloatingMenuBar'
import { useCharacterMoveTutorial } from '@/features/navigation/hooks/useCharacterMoveTutorial'
import { useNavigationStore } from '@/store/navigationStore'
import { IconTutorial } from '@/ui/components/IconTutorial/IconTutorial'

export function NavigationOverlay() {
  const isCancelButtonVisible = useNavigationStore(
    (state) => state.isCancelButtonVisible,
  )
  const isMenuButtonVisible = useNavigationStore(
    (state) => state.isMenuButtonVisible,
  )
  const isStartButtonPressed = useNavigationStore(
    (state) => state.isStartButtonPressed,
  )
  const setCancelButtonPressed = useNavigationStore(
    (state) => state.setCancelButtonPressed,
  )
  const setCancelButtonVisibility = useNavigationStore(
    (state) => state.setCancelButtonVisibility,
  )

  const { showTutorial, scale } = useCharacterMoveTutorial(isStartButtonPressed)

  return (
    <>
      {showTutorial && (
        <IconTutorial move top="80%" left="50%" scale={scale} />
      )}

      {isCancelButtonVisible && (
        <CancelButton
          onPress={() => {
            setCancelButtonPressed(true)
            setCancelButtonVisibility(false)
          }}
        />
      )}

      <FloatingMenuBar visible={isMenuButtonVisible} />
    </>
  )
}
