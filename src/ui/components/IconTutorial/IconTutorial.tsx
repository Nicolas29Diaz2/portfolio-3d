import styles from "./IconTutorial.module.css";

type IconTutorialProps = {
  iconSrc?: string;
  iconAlt?: string;
  top?: string;
  left?: string;
  move?: boolean;
  scale?: number;
};

export function IconTutorial({
  iconSrc = "/Images/Icons/Move.webp",
  iconAlt = "Drag to move the scene",
  top = "50%",
  left = "50%",
  move = false,
  scale = 1,
}: Readonly<IconTutorialProps>) {
  return (
    <div
      className={`${styles.container} ${move && styles.move}`}
      style={{ top, left }}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        style={{ transform: `scale(${scale})` }}
        draggable={false}
      />
    </div>
  );
}
