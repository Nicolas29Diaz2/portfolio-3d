import { useId } from "react";
import styles from "./SkillPoints.module.css";

interface SkillPointsProps {
  readonly skillPoints: number;
  readonly activeSkillPoints: boolean;
}

export function SkillPoints({
  skillPoints,
  activeSkillPoints,
}: SkillPointsProps) {
  // Generate a unique ID for each instance to prevent SVG clipPath DOM duplicates
  const uniqueId = useId().replace(/:/g, "-");
  const clipPathId = `skillPointsMask-${uniqueId}`;

  return (
    <svg width="300px" height="160" xmlns="http://www.w3.org/2000/svg">
      {activeSkillPoints && (
        <>
          <defs>
            <clipPath id={clipPathId}>
              <rect
                transform="translate(51 127) rotate(-180)"
                className={styles.rectMask}
                width="420px"
                fill="white"
              />
            </clipPath>
          </defs>
          <g
            transform="scale(1.05)"
            style={{ clipPath: `url(#${clipPathId})` }}
            className={styles.containerClipPath}
          >
            <g transform="translate(0 0)">
              <polyline
                className={
                  skillPoints >= 1
                    ? `${styles.skillPoints} ${styles.filled}`
                    : styles.skillPoints
                }
                points="16,120 45,120 45,113 16,113 16,120"
              />
            </g>
            <g transform="translate(0 -13)">
              <polyline
                className={
                  skillPoints >= 2
                    ? `${styles.skillPoints} ${styles.filled}`
                    : styles.skillPoints
                }
                points="16,120 45,120 45,113 16,113 16,120"
              />
            </g>
            <g transform="translate(0 -26)">
              <polyline
                className={
                  skillPoints >= 3
                    ? `${styles.skillPoints} ${styles.filled}`
                    : styles.skillPoints
                }
                points="16,120 45,120 45,113 16,113 16,120"
              />
            </g>
            <g transform="translate(0 -39)">
              <polyline
                className={
                  skillPoints >= 4
                    ? `${styles.skillPoints} ${styles.filled}`
                    : styles.skillPoints
                }
                points="16,120 45,120 45,113 16,113 16,120"
              />
            </g>
          </g>
        </>
      )}

      <g transform="scale(1.05)">
        <g>
          <polyline
            className={styles.skillPoints}
            points="16,120 45,120 45,113 16,113 16,120"
          />
        </g>
        <g transform="translate(0 -13)">
          <polyline
            className={styles.skillPoints}
            points="16,120 45,120 45,113 16,113 16,120"
          />
        </g>
        <g transform="translate(0 -26)">
          <polyline
            className={styles.skillPoints}
            points="16,120 45,120 45,113 16,113 16,120"
          />
        </g>
        <g transform="translate(0 -39)">
          <polyline
            className={styles.skillPoints}
            points="16,120 45,120 45,113 16,113 16,120"
          />
        </g>
      </g>
    </svg>
  );
}
