import type { FloatingMenuBarProps } from '@/features/navigation/types/navigationHud.types'
import { useNavigationStore } from '@/store/navigationStore'
import { useThemeStore } from '@/store/themeStore'
import { MenuSvg } from '@/ui/icons/MenuSvg'
import { SwitchThemeSvg } from '@/ui/icons/SwitchThemeSvg'
import './FloatingMenuBar.css'

export function FloatingMenuBar({ visible }: Readonly<FloatingMenuBarProps>) {
  const sceneTheme = useThemeStore((state) => state.sceneTheme)
  const setSceneTheme = useThemeStore((state) => state.setSceneTheme)
  const setMenuView = useNavigationStore((state) => state.setMenuView)

  if (!visible) return null

  const iconColor = sceneTheme === 'Dark' ? '#000' : '#fff'

  return (
    <header className="floating-menu-bar" aria-label="Floating navigation menu">
      <ul>
        <li>
          <button
            type="button"
            onClick={() =>
              setSceneTheme(sceneTheme === 'Dark' ? 'Light' : 'Dark')
            }
            aria-label="Switch Theme"
          >
            <SwitchThemeSvg color={iconColor} theme={sceneTheme} />
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setMenuView(true)}
            aria-label="Open Menu"
          >
            <MenuSvg color={iconColor} />
          </button>
        </li>
      </ul>
    </header>
  )
}
