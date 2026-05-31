import type { SkillCategory, SkillType } from "../types/skills.types";

export const SLIDER_CONF = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 700,
  touchThreshold: 20,
  lazyLoad: "ondemand" as const,
};

export const CATEGORY_LAYOUT_MAP: Record<SkillType, SkillCategory> = {
  web: { text: "Web Development", x: 80, y: 30 },
  tool: { text: "Tools", x: 130, y: 30 },
  design: { text: "Design", x: 130, y: 30 },
  other: { text: "Other", x: 130, y: 30 },
};
