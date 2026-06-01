import SlickCarousel from "react-slick";

type SlickComponent = typeof SlickCarousel;

const nestedDefault = (SlickCarousel as { default?: SlickComponent }).default;

export const Slider: SlickComponent =
  typeof SlickCarousel === "function" ? SlickCarousel : (nestedDefault ?? SlickCarousel);
