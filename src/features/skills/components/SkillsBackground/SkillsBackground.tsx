import styles from "./SkillsBackground.module.css";

interface SkillsBackgroundProps {
  readonly animate: boolean;
}

export function SkillsBackground({ animate }: SkillsBackgroundProps) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <linearGradient
            id="contentGradientTitle"
            gradientTransform="rotate(90)"
          >
            <stop offset="0%" stopColor="#399ab5" />
            <stop offset="100%" stopColor="#399ab5" />
          </linearGradient>
          <linearGradient
            id="contentGradientSubtitle"
            gradientTransform="rotate(90)"
          >
            <stop offset="0%" stopColor="rgb(0, 64, 124)" />
            <stop offset="100%" stopColor="rgb(0, 64, 124)" />
          </linearGradient>
        </defs>

        {/* Borders setup */}
        <g transform="translate(20 20) scale(1)">
          {/* Skills Border */}
          <g>
            <polyline
              className={styles.borderLine}
              points="0,200 0,50 40,50 55,70 245,70 260,50 670,50 700,80 700,200"
            />
            <polyline
              className={`${styles.borderLine} ${styles.titleContent} ${
                animate ? styles.animationBorderLine : ""
              }`}
              points="35,0 300,0 300,20 300,40 255,40 240,60 60,60 45,40 0,40 0,20 35,0"
            />
            <polyline
              className={styles.borderLine}
              points="0,200 0,390 30,420 670,420 700,390 700,200"
            />
          </g>

          {/* Subtitle border */}
          <g>
            <polyline
              className={`${styles.borderLine} ${styles.subtitleContent}`}
              points="310,20 310,40 670,40 700,0 310,0 310,20"
            />
          </g>

          {/* Decorative small border polygon */}
          <polyline
            className={`${styles.borderLine} ${styles.titleContent}`}
            points="680,45 705,11 705,70 680,45"
          />
        </g>
      </svg>

      <header className={styles.header}>
        <h1>SKILLS</h1>
      </header>
    </>
  );
}
export default SkillsBackground;
