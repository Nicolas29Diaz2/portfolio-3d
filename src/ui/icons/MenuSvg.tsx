type MenuSvgProps = {
  color?: string;
  className?: string;
};

export function MenuSvg({ color = "#000", className }: Readonly<MenuSvgProps>) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M49.5 56.75H150.5M49.5 100H150.5M49.5 143.25H150.5"
        stroke={color}
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
