import { About3D } from '@/features/3d-scene/models/screens/About3D'
import { Contact3D } from '@/features/3d-scene/models/screens/Contact3D'
import { Menu3D } from '@/features/3d-scene/models/screens/Menu3D'
import { Projects3D } from '@/features/3d-scene/models/screens/Projects3D'
import { Skills3D } from '@/features/3d-scene/models/screens/Skills3D'
import { Chair } from '@/features/3d-scene/models/chair/Chair'
import { Character } from '@/features/3d-scene/models/character/Character'
import { Scenario } from '@/features/3d-scene/models/scenario/Scenario'
import { Shelf } from '@/features/3d-scene/models/scenario/Shelf'
import { useIntroSequence } from '@/features/3d-scene/orchestration/hooks/useIntroSequence'
import { useSceneVisibility } from '@/features/3d-scene/orchestration/hooks/useSceneVisibility'
import { useSceneStore } from '@/store/sceneStore'

export function SceneOrchestrator() {
  const cameraFocus = useSceneStore((state) => state.cameraFocus)
  const intro = useIntroSequence()
  const visibility = useSceneVisibility(cameraFocus)

  return (
    <>
      <About3D />
      <Contact3D />

      <Menu3D visible={visibility.showScenario} />

      <Projects3D visible={intro.showProjects} />

      <Skills3D />

      {visibility.chargeCharacter && (
        <Character
          introAnimation={intro.characterIntroAnim}
          sitAnimation={intro.characterSitAnim}
          visible={visibility.showCharacter}
          dissolveEyes={intro.characterDissolveEyes}
        />
      )}

      <Chair
        startAnimation={intro.chairHelmetAnim}
        visible={visibility.showChair}
      />

      <Scenario show={visibility.showScenario} />
      {visibility.chargeScreen && <Shelf />}
    </>
  )
}
