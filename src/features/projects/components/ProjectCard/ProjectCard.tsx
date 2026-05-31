import "./ProjectCard.css";
import type { ProjectContent } from "../../types/projects.types";
import { ProjectCardBackground } from "../ProjectCardBackground/ProjectCardBackground";

export const ProjectCard = ({
  project,
  animate,
  interaction,
}: Readonly<{
  project: ProjectContent;
  animate: boolean;
  interaction: boolean;
}>) => {
  if (project.title === "") {
    return <div className="projects-containerSliderItem" aria-hidden />;
  }

  return (
    <div
      className={`projects-containerSliderItem ${
        interaction ? "interaction" : "noInteraction"
      }`}
    >
      <ProjectCardBackground animate={animate} />

      <img
        src={project.image}
        alt={project.title}
        style={{
          position: "absolute",
          top: "50px",
          left: "0",
          height: "300px",
          width: "300px",
          objectFit: "contain",
          clipPath:
            "polygon(12% 17%, 92% 17%, 92% 38% , 98% 44%, 98% 78%, 12% 78%",
        }}
      />

      <article className="ulContainer">
        <ul>
          <li>
            <h1>{project.title}</h1>
          </li>
          <li>
            <ul id="techList">
              {project.tags?.map((tag, index) => (
                <li key={tag + index}>{tag}</li>
              ))}
            </ul>
          </li>
          <li>
            <p>{project.description}</p>
          </li>
        </ul>
      </article>

      {project.title !== "Portfolio" && project.link && (
        <div id="link">
          <a href={project.link} target="_blank" rel="noreferrer">
            Go to
          </a>
        </div>
      )}
    </div>
  );
};
