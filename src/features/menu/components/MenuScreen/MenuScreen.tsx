import { useMenuScreenState } from '@/features/menu/hooks/useMenuScreenState'
import { MenuBackground } from '@/features/menu/components/MenuBackground/MenuBackground'
import { MenuNavButtons } from '@/features/menu/components/MenuNavButtons/MenuNavButtons'
import type { MenuScreenProps } from '@/features/menu/types/menu.types'
import { useNavigationStore } from '@/store/navigationStore'
import { ScreenHtml } from '@/ui/components/ScreenHtml/ScreenHtml'
import { useScaleAnimation } from '@/ui/hooks/useScaleAnimation'
import './MenuScreen.css'

export function MenuScreen({ showScreen }: Readonly<MenuScreenProps>) {
  const setMenuView = useNavigationStore((state) => state.setMenuView)
  const {
    canPressButton,
    isHandVisible,
    isMenuOptionsVisible,
    isInteractable,
  } = useMenuScreenState()

  const scale = useScaleAnimation(showScreen)
  const handOpacity = useScaleAnimation(isHandVisible)

  const htmlClassName = isInteractable
    ? 'menu-screen-html auto'
    : 'menu-screen-html menu-screen-no-interaction'

  return (
    <ScreenHtml
      className={htmlClassName}
      distanceFactor={1}
      position={[0, 0.51, 0]}
      rotation={[-Math.PI / 2.71, 0, 0]}
      scale={scale}
    >
      <MenuBackground />
      {handOpacity > 0 && (
        <button
          type="button"
          className="menu-screen-hand-button"
          onClick={() => setMenuView(true)}
          style={{ opacity: handOpacity }}
          aria-label="Hand Icon to open the menu"
        >
          <img src="/Images/Icons/HandMenu.webp" alt="HandIcon" />
        </button>
      )}

      <h1 className="menu-screen-title">MENU</h1>

      <MenuNavButtons
        isMenuOptionsVisible={isMenuOptionsVisible}
        canPressButton={canPressButton}
      />
    </ScreenHtml>
  )
}
