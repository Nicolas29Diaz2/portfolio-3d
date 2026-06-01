import { useSceneStore } from '@/store/sceneStore'
import { useThemeStore } from '@/store/themeStore'
import { DarkSceneEnvironment } from './DarkSceneEnvironment'
import { LightSceneEnvironment } from './LightSceneEnvironment'

export function SceneEnvironment() {
  const gpuTier = useSceneStore((state) => state.gpuTier)
  const sceneTheme = useThemeStore((state) => state.sceneTheme)

  if (sceneTheme === 'Light') {
    return <LightSceneEnvironment />
  }

  return <DarkSceneEnvironment gpuTier={gpuTier} />
}
