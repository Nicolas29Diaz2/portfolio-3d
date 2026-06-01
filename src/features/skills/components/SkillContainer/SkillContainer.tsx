import styles from "./SkillContainer.module.css";
import { SkillPoints } from "../SkillPoints/SkillPoints";

interface SkillContainerProps {
  readonly animate: boolean;
  readonly skillPoints: number;
  readonly activeSkillPoints: boolean;
  readonly skillText: string;
  readonly y: number;
  readonly srcImg: string;
  readonly altImg: string;
}

export function SkillContainer({
  animate,
  skillPoints,
  activeSkillPoints,
  skillText,
  y,
  srcImg,
  altImg,
}: SkillContainerProps) {
  return (
    <div className={styles.skillContainer}>
      <svg width="300px" height="160" xmlns="http://www.w3.org/2000/svg">
        <g>
          {/* Skill container main border outline */}
          <g>
            <polyline
              className={styles.borderLine}
              points="10,85 10,35 40,15 110,15 110,95 140,95 150,105 260,105 280,90"
            />
            <polyline
              className={styles.borderLine}
              points="10,85 10,135 75,135 110,115 110,95 110,100"
            />
          </g>

          {/* Skill container decorative thick line */}
          <g>
            <polyline
              className={`${styles.borderLine2} ${
                animate ? styles.animationBorderLine : ""
              }`}
              points="110,95 140,95 150,105 160,105"
            />
          </g>

          {/* Skill points rating blocks */}
          <SkillPoints
            skillPoints={skillPoints}
            activeSkillPoints={activeSkillPoints}
          />
        </g>
      </svg>

      {/* Brand logo & technology name label */}
      <div className={styles.imgContainer}>
        <img src={srcImg} alt={altImg} loading="lazy" />
      </div>
      <div className={styles.textContainer} style={{ top: `${y}px` }}>
        <p>{skillText}</p>
      </div>
    </div>
  );
}
export default SkillContainer;
