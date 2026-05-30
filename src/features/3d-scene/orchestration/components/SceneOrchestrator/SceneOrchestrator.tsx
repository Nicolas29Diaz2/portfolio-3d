import { About3D } from "@/features/3d-scene/models/screens/About3D";
import { Contact3D } from "@/features/3d-scene/models/screens/Contact3D";
import { Menu3D } from "@/features/3d-scene/models/screens/Menu3D";
import { Projects3D } from "@/features/3d-scene/models/screens/Projects3D";
import { Skills3D } from "@/features/3d-scene/models/screens/Skills3D";
import { Chair } from "@/features/3d-scene/models/chair/Chair";
import { Character } from "@/features/3d-scene/models/character/Character";
import { Scenario } from "@/features/3d-scene/models/scenario/Scenario";
import { Shelf } from "@/features/3d-scene/models/scenario/Shelf";
import { useIntroSequence } from "@/features/3d-scene/orchestration/hooks/useIntroSequence";
import { useSceneVisibility } from "@/features/3d-scene/orchestration/hooks/useSceneVisibility";
import { MenuScreen } from "@/features/menu/components/MenuScreen/MenuScreen";
import { MonitorPlaceholder } from "@/features/menu/components/MonitorPlaceholder/MonitorPlaceholder";
import { useSceneStore } from "@/store/sceneStore";

export function SceneOrchestrator() {
  const cameraFocus = useSceneStore((state) => state.cameraFocus);
  const intro = useIntroSequence();
  const visibility = useSceneVisibility(cameraFocus);

  return (
    <>
      <About3D>
        <MonitorPlaceholder
          showScreen={intro.showScreens}
          label="About"
          distanceFactor={1.72}
          position={[0.3, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </About3D>
      <Contact3D>
        <MonitorPlaceholder
          showScreen={intro.showScreens}
          label="Contact"
          distanceFactor={1}
          position={[0.48, 0.21, 0.44]}
          rotation={[-Math.PI / 15.4, 0, 0]}
        />
      </Contact3D>

      <Menu3D visible={visibility.showScenario}>
        <MenuScreen showScreen={intro.showScreens} />
      </Menu3D>

      <Projects3D visible={intro.showProjects}>
        <MonitorPlaceholder
          showScreen={intro.showScreens}
          label="Projects"
          distanceFactor={2}
          position={[0, 0.15, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </Projects3D>

      <Skills3D>
        <MonitorPlaceholder
          showScreen={intro.showScreens}
          label="Skills"
          distanceFactor={1.72}
          position={[0, 0.15, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </Skills3D>

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
  );
}
