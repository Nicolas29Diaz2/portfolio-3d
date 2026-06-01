import { PortfolioView } from '@/core/types/portfolioView'
import type { MenuNavButtonsProps } from '@/features/menu/types/menu.types'
import { MenuNavButton } from '@/features/menu/components/MenuNavButtons/MenuNavButton'
import { useNavigationStore } from '@/store/navigationStore'
import './MenuNavButtons.css'

export function MenuNavButtons({
  isMenuOptionsVisible,
  canPressButton,
}: Readonly<MenuNavButtonsProps>) {
  const setMenuOption = useNavigationStore((state) => state.setMenuOption)

  if (!isMenuOptionsVisible) return null

  return (
    <>
      <div className="menu-nav-cover-buttons-container">
        <div className="menu-nav-cover-buttons" />
      </div>

      <nav aria-label="Menu options">
        <ul>
          <li>
            <MenuNavButton
              canPressButton={canPressButton}
              positionY={57}
              text="SKILLS"
              onClick={() => setMenuOption(PortfolioView.SKILLS)}
            />
          </li>
          <li>
            <MenuNavButton
              canPressButton={canPressButton}
              positionY={114}
              text="ABOUT"
              onClick={() => setMenuOption(PortfolioView.ABOUT)}
            />
          </li>
          <li>
            <MenuNavButton
              canPressButton={canPressButton}
              positionY={171}
              text="PROJECTS"
              onClick={() => setMenuOption(PortfolioView.PROJECTS)}
            />
          </li>
          <li>
            <MenuNavButton
              canPressButton={canPressButton}
              positionY={228}
              text="CONTACT"
              onClick={() => setMenuOption(PortfolioView.CONTACT)}
            />
          </li>
        </ul>
      </nav>
    </>
  )
}
