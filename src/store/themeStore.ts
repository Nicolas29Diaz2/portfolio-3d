import { create } from 'zustand'

export type SceneTheme = 'Dark' | 'Light'

type ThemeStore = {
  sceneTheme: SceneTheme
  setSceneTheme: (theme: SceneTheme) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  sceneTheme: 'Dark',
  setSceneTheme: (theme) => set({ sceneTheme: theme }),
}))
