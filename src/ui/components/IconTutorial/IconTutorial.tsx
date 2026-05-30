type IconTutorialProps = {
  iconSrc?: string;
  iconAlt?: string;
  top?: string;
  left?: string;
  move?: boolean;
  scale?: number;
  className?: string;
};

export function IconTutorial({
  iconSrc = "/Images/Icons/Move.webp",
  iconAlt = "Drag to move the scene",
  top = "50%",
  left = "50%",
  move = false,
  scale = 1,
  className = "",
}: Readonly<IconTutorialProps>) {
  return (
    <div
      className={`pointer-events-none absolute z-[5] size-[50px] ${move ? "animate-tutorial-move" : "-translate-x-1/2 -translate-y-1/2"} ${className}`.trim()}
      style={{ top, left }}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        className="h-auto w-full"
        style={{ transform: `scale(${scale})` }}
        draggable={false}
      />
    </div>
  );
}
