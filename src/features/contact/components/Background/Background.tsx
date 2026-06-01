import styles from "./Background.module.css";

export const Background = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "0",
        top: "0",
        left: "0",
      }}
    >
      {/* Borders setup */}
      <g transform="scale(0.80)">
        <polyline
          points="96.6,35 546,35 546,539 490,581 98,581 42,581 28,567 28,105 98,35"
          className={styles.borderLine}
        />

        <polyline
          points="96.6,35 350,35 290,105 30,105 97,35"
          className={styles.borderLine2}
        />

        <polyline
          points="546,35 546,150 520,130 520,35 546,35"
          className={styles.borderLine2}
        />
      </g>
    </svg>
  );
};
