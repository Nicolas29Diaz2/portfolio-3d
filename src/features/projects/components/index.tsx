import { useEffect, useState } from "react";
import { IconTutorial } from "@/ui/components/IconTutorial/IconTutorial";
import { ScreenHtml } from "@/ui/components/ScreenHtml/ScreenHtml";
import { useScaleAnimation } from "@/ui/hooks/useScaleAnimation";
import { ProjectsBackground } from "@/features/projects/components/ProjectsBackground/ProjectsBackground";
import { useSceneStore } from "@/store/sceneStore";
import { PortfolioView } from "@/core/types/portfolioView";
import { hideProjectsIconTutorialTime } from "@/core/constants/timing";
import { ProjectSlider } from "./ProjectSlider/ProjectSlider";
import { useProjects } from "../hooks/useProjects";

import styles from "./index.module.css";
import { Loader } from "@/ui/components/Loader/Loader";

interface ProjectsScreenProps {
  readonly showScreen: boolean;
}

export function ProjectsScreen({ showScreen }: ProjectsScreenProps) {
  const { projects, isLoading } = useProjects();
  const cameraFocus = useSceneStore((state) => state.cameraFocus);
  const gpuTier = useSceneStore((state) => state.gpuTier);

  const isInteractive = cameraFocus === PortfolioView.PROJECTS;
  const animate = isInteractive && gpuTier >= 3;
  const [showMoveLogo, setShowMoveLogo] = useState(false);
  const iconScale = useScaleAnimation(showMoveLogo);

  useEffect(() => {
    let iconTimer = 0;

    if (isInteractive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowMoveLogo(true);
      iconTimer = globalThis.setTimeout(
        () => setShowMoveLogo(false),
        hideProjectsIconTutorialTime,
      );
    } else {
      setShowMoveLogo(false);
    }

    return () => globalThis.clearTimeout(iconTimer);
  }, [isInteractive]);

  return (
    <ScreenHtml
      className={styles.html}
      distanceFactor={2}
      transform
      occlude="blending"
      tabIndex={0}
      position={[0, 0.15, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      visible={showScreen}
    >
      {isLoading && <Loader />}

      {!isLoading && (
        <ProjectSlider
          projects={projects}
          animate={animate}
          interaction={isInteractive}
        />
      )}

      <ProjectsBackground />

      {iconScale > 0 && (
        <IconTutorial move top="35%" left="50%" scale={iconScale} />
      )}
    </ScreenHtml>
  );
}
