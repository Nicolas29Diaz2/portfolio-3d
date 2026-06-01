import { useEffect, useState } from "react";
import styles from "./SkillsSubtitle.module.css";
import type { SkillCategory } from "../../types/skills.types";

interface SkillsSubtitleProps {
  readonly active: number;
  readonly subTitleOptions: SkillCategory;
}

export function SkillsSubtitle({
  active,
  subTitleOptions,
}: SkillsSubtitleProps) {
  const [subTitleOptionsDelay, setSubTitleOptionsDelay] =
    useState<SkillCategory | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubTitleOptionsDelay(subTitleOptions);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [active, subTitleOptions]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 32"
        className={styles.svg}
      >
        <defs>
          <linearGradient id="text-gradient-slideIn">
            <stop offset="5%" stopColor="rgba(96, 202, 255, 1)"></stop>
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"></stop>
          </linearGradient>
          <linearGradient id="text-gradient-slideOut">
            <stop offset="5%" stopColor="rgba(255, 255, 255, 0)"></stop>
            <stop offset="100%" stopColor="rgba(96, 202, 255, 1)"></stop>
          </linearGradient>
        </defs>

        <g key={active}>
          <rect className={styles.rectSliderText} height="100%" width="10px" />
          <clipPath id="mask-subtitle">
            <rect fill="white" height="43px" className={styles.rectMask} />
          </clipPath>
        </g>

        {subTitleOptionsDelay && (
          <text
            x={subTitleOptionsDelay.x}
            y="24.5"
            className="text-subtitle"
            mask="url(#mask-subtitle)"
          />
        )}
      </svg>

      <div className={styles.textContainer}>
        <h2>{subTitleOptionsDelay?.text}</h2>
      </div>
    </>
  );
}
export default SkillsSubtitle;
