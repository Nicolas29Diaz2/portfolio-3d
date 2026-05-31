import styles from "./ProjectsBackground.module.css";

export function ProjectsBackground() {
  return (
    <>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 740 740"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "0",
        }}
      >
        {/* Border BackGround */}
        <g transform="translate(-230 20) scale(1)">
          <polyline
            className={`${styles.borderLine} ${styles.noFill}
            `}
            points="78,0 1200,0 1200,695 0,695 0,80 80,0"
          ></polyline>
        </g>

        {/* Decoration 1 */}
        <g transform="translate(-25 0)">
          <polyline
            className={styles.fill}
            points="180,20 250,90 530,90 600,20 180,20"
          ></polyline>
        </g>

        {/* Decoration 2 */}
        <g transform="translate(550 30) scale(0.7)">
          <polyline
            className={styles.fill}
            points="40,0 70,0 30,40 0,40 40,0"
          ></polyline>
          <polyline
            transform="translate(40 0)"
            className={styles.fill}
            points="40,0 70,0 30,40 0,40 40,0"
          ></polyline>
          <polyline
            transform="translate(80 0)"
            className={styles.fill}
            points="40,0 70,0 30,40 0,40 40,0"
          ></polyline>
          <polyline
            transform="translate(120 0)"
            className={styles.fill}
            points="40,0 70,0 30,40 0,40 40,0"
          ></polyline>
          <polyline
            transform="translate(160 0)"
            className={styles.fill}
            points="40,0 70,0 30,40 0,40 40,0"
          ></polyline>
        </g>

        {/* Decoration 2 */}
        <g transform="translate(940 20) scale(1)">
          <polyline
            className={styles.fill}
            points="0,0 30,0 30,100 0,70"
          ></polyline>
        </g>

        {/* Decoration 4 */}
        <g transform="translate(-150 682) scale(1)">
          <polyline
            className={styles.fill}
            points="40,0 250,0 290,30 0,30 40,0"
          ></polyline>
        </g>
        {/* Decoration 5 */}
        <g transform="translate(620 682) scale(1)">
          <polyline
            className={styles.fill}
            points="40,0 250,0 290,30 0,30 40,0"
          ></polyline>
        </g>

        {/* Decoration 2 */}
        <g transform="translate(180 30) scale(-0.7 0.7)">
          <polyline
            className={styles.fill}
            points="40,0 70,0 30,40 0,40 40,0"
          ></polyline>
          <polyline
            transform="translate(40 0)"
            className={styles.fill}
            points="40,0 70,0 30,40 0,40 40,0"
          ></polyline>
          <polyline
            transform="translate(80 0)"
            className={styles.fill}
            points="40,0 70,0 30,40 0,40 40,0"
          ></polyline>
          <polyline
            transform="translate(120 0)"
            className={styles.fill}
            points="40,0 70,0 30,40 0,40 40,0"
          ></polyline>
          <polyline
            transform="translate(160 0)"
            className={styles.fill}
            points="40,0 70,0 30,40 0,40 40,0"
          ></polyline>
        </g>
      </svg>

      <h1 className={styles.title}>PROJECTS</h1>
    </>
  );
}
