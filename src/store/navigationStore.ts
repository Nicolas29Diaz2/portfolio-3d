import { create } from 'zustand'
import type { PortfolioView } from '@/core/types/portfolioView'

type NavigationStore = {
  isCancelButtonVisible: boolean
  isCancelButtonPressed: boolean
  isStartButtonPressed: boolean
  isStartButtonVisible: boolean
  isMenuButtonVisible: boolean
  isMenuView: boolean
  menuOption: PortfolioView | null
  showFloatButtons: boolean
  setCancelButtonVisibility: (value: boolean) => void
  setCancelButtonPressed: (value: boolean) => void
  setStartButtonPressed: (value: boolean) => void
  setStartButtonVisibility: (value: boolean) => void
  setMenuButtonVisible: (value: boolean) => void
  setMenuView: (value: boolean) => void
  setMenuOption: (value: PortfolioView | null) => void
  setShowFloatButtons: (value: boolean) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  isCancelButtonVisible: false,
  isCancelButtonPressed: false,
  isStartButtonPressed: false,
  isStartButtonVisible: false,
  isMenuButtonVisible: false,
  isMenuView: false,
  menuOption: null,
  showFloatButtons: false,

  setCancelButtonVisibility: (value) => set({ isCancelButtonVisible: value }),
  setCancelButtonPressed: (value) => set({ isCancelButtonPressed: value }),
  setStartButtonPressed: (value) => set({ isStartButtonPressed: value }),
  setStartButtonVisibility: (value) => set({ isStartButtonVisible: value }),
  setMenuButtonVisible: (value) => set({ isMenuButtonVisible: value }),
  setMenuView: (value) => set({ isMenuView: value }),
  setMenuOption: (value) => set({ menuOption: value }),
  setShowFloatButtons: (value) => set({ showFloatButtons: value }),
}))
