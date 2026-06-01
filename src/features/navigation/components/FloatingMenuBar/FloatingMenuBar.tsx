import type { FloatingMenuBarProps } from "@/features/navigation/types/navigationHud.types";
import { useNavigationStore } from "@/store/navigationStore";
import { useThemeStore } from "@/store/themeStore";
import { MenuSvg } from "@/ui/icons/MenuSvg";
import { SwitchThemeSvg } from "@/ui/icons/SwitchThemeSvg";
import "./FloatingMenuBar.css";
import { useNavigate } from "react-router-dom";

export function FloatingMenuBar({ visible }: Readonly<FloatingMenuBarProps>) {
  const sceneTheme = useThemeStore((state) => state.sceneTheme);
  const setSceneTheme = useThemeStore((state) => state.setSceneTheme);
  const setMenuView = useNavigationStore((state) => state.setMenuView);
  const navigate = useNavigate();

  if (!visible) return null;

  const iconColor =
    sceneTheme === "Dark" ? "var(--color-surface)" : "var(--color-foreground)";

  return (
    <header className="floating-menu-bar" aria-label="Floating navigation menu">
      <ul>
        <li>
          <button
            onClick={() => navigate("/products")}
            aria-label="Go to Products"
            id="products-button"
            style={{ color: iconColor }}
          >
            Go to Products
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              setSceneTheme(sceneTheme === "Dark" ? "Light" : "Dark")
            }
            aria-label="Switch Theme"
          >
            <SwitchThemeSvg color={iconColor} theme={sceneTheme} />
          </button>
        </li>
        <li>
          <button onClick={() => setMenuView(true)} aria-label="Open Menu">
            <MenuSvg color={iconColor} />
          </button>
        </li>
      </ul>
    </header>
  );
}
