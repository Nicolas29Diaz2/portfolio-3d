import { useEffect, useState } from "react";

import { Slider } from "@/features/projects/lib/slickSlider";
// Stylesheets
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./index.module.css";

// Store & Routing
import { useSceneStore } from "@/store/sceneStore";
import { PortfolioView } from "@/core/types/portfolioView";
import { hideSkillIconTutorialTime } from "@/core/constants/timing";

// UI Wrappers & Common Components
import { ScreenHtml } from "@/ui/components/ScreenHtml/ScreenHtml";
import { IconTutorial } from "@/ui/components/IconTutorial/IconTutorial";
import { useScaleAnimation } from "@/ui/hooks/useScaleAnimation";

// Child Feature Components
import { SkillsBackground } from "./SkillsBackground/SkillsBackground";
import { SkillsSubtitle } from "./SkillsSubtitle/SkillsSubtitle";
import { SkillContainer } from "./SkillContainer/SkillContainer";
import { useSkills } from "../hooks/useSkills";
import { SLIDER_CONF } from "../constants/skills.constants";
import { Loader } from "@/ui/components/Loader/Loader";

interface SkillsScreenProps {
  readonly showScreen: boolean;
}

export function SkillsScreen({ showScreen }: SkillsScreenProps) {
  const { skillGroups, isLoading, activeIndex, setActiveIndex } = useSkills();
  const cameraFocus = useSceneStore((state) => state.cameraFocus);

  const isInteractive = cameraFocus === PortfolioView.SKILLS;
  const animate = isInteractive;

  const [showIconTutorial, setShowIconTutorial] = useState(false);
  const scale = useScaleAnimation(showIconTutorial);

  useEffect(() => {
    let timer = 0;

    if (isInteractive) {
      setShowIconTutorial(true);
      timer = globalThis.setTimeout(() => {
        setShowIconTutorial(false);
      }, hideSkillIconTutorialTime);
    } else {
      setShowIconTutorial(false);
    }

    return () => {
      globalThis.clearTimeout(timer);
    };
  }, [isInteractive]);

  return (
    <ScreenHtml
      className={`${styles.html} ${animate ? "" : styles.noPointer}`}
      distanceFactor={1.72}
      transform
      occlude="blending"
      tabIndex={0}
      position={[0, 0.15, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      visible={showScreen}
    >
      <section className={styles.fullContainer}>
        <SkillsBackground animate={animate} />

        {isLoading && <Loader />}

        {!isLoading && skillGroups.length > activeIndex && (
          <SkillsSubtitle
            active={activeIndex}
            subTitleOptions={skillGroups[activeIndex].category}
          />
        )}

        <section className={styles.sectionSlider}>
          <div className={styles.sliderContainer}>
            {!isLoading && skillGroups.length > 0 && (
              <Slider
                {...SLIDER_CONF}
                prevArrow={<SamplePrevArrow />}
                nextArrow={<SampleNextArrow />}
                beforeChange={(_current, next) => {
                  setActiveIndex(next);
                }}
              >
                {skillGroups.map((group, groupIndex) => (
                  <div key={group.id}>
                    <div className={styles.sliderItem}>
                      {group.skills.map((skill) => (
                        <SkillContainer
                          key={skill.id}
                          animate={animate}
                          skillPoints={skill.points}
                          skillText={skill.name}
                          y={skill.y}
                          activeSkillPoints={activeIndex === groupIndex}
                          srcImg={skill.imageUrl}
                          altImg={`${skill.name} Logo`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </section>
      </section>

      {scale > 0 && <IconTutorial move top="50%" left="50%" scale={scale} />}
    </ScreenHtml>
  );
}

interface ArrowProps {
  readonly onClick?: () => void;
}

function SamplePrevArrow({ onClick }: ArrowProps) {
  return (
    <div className={styles.customSlickArrowPrev} onClick={onClick}>
      <svg width="100%" height="100%">
        <path
          fill="#08bee1"
          d="M 10 0 L 0 10 L 10 20"
          transform="translate(3 0)"
        />
      </svg>
    </div>
  );
}

function SampleNextArrow({ onClick }: ArrowProps) {
  return (
    <div className={styles.customSlickArrowNext} onClick={onClick}>
      <svg width="100%" height="100%">
        <path
          fill="#08bee1"
          d="M 10 0 L 0 10 L 10 20"
          transform="translate(-3 0) rotate(180 10 10)"
        />
      </svg>
    </div>
  );
}
