import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ProjectsSlider.module.css";
import { settings } from "../../constants/project";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { Slider } from "../../lib/slickSlider";
import type { ProjectContent } from "../../types/projects.types";

const emptyProjects = [
  { id: 998, title: "", description: "", image: "", tags: [] },
  { id: 999, title: "", description: "", image: "", tags: [] },
] as const;

const projectsAdapter = (
  projects: readonly ProjectContent[],
): readonly ProjectContent[] => {
  if (projects.length === 1) {
    return projects;
  }
  return [
    ...projects,
    emptyProjects[0],
    emptyProjects[1],
  ] as readonly ProjectContent[];
};

export const ProjectSlider = ({
  projects,
  animate,
  interaction,
}: Readonly<{
  projects: readonly ProjectContent[];
  animate: boolean;
  interaction: boolean;
}>) => {
  const sliderProjects = projectsAdapter(projects).map((project) => (
    <ProjectCard
      project={project}
      key={project.id}
      animate={animate}
      interaction={interaction}
    />
  ));

  return (
    <div
      className={`${styles.sliderContainer} ${
        animate ? styles.interaction : styles.noInteraction
      }`}
    >
      <Slider {...settings}>{sliderProjects}</Slider>
    </div>
  );
};
