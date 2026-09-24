import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLinkIcon,
  GithubIcon,
  Cube3DIcon,
  ChevronDownIcon,
} from "./Icons";
import {
  FEATURED_HERO_PROJECT,
  PROJECTS_LIST,
  type ProjectItem,
} from "@/data/portfolio2d.data";
import "./ProjectsSection.css";

export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="section-subheading">
            Selected products spanning full-stack SaaS architecture and high-performance web systems.
          </p>
        </div>

        {/* HERO PROJECT CARD: Volio Studio (Lite & Compact) */}
        <article className="hero-project-card">
          <div className="hero-project-content">
            <div className="hero-project-badge-row">
              <span className="project-badge">Founder &amp; Tech Lead</span>
              <span className="project-badge">Production SaaS</span>
            </div>

            <h3 className="hero-project-title">{FEATURED_HERO_PROJECT.title}</h3>
            <p className="hero-project-subtitle">{FEATURED_HERO_PROJECT.subtitle}</p>
            <p className="hero-project-description">{FEATURED_HERO_PROJECT.description}</p>

            <div className="hero-project-tags">
              {FEATURED_HERO_PROJECT.tags.map((tag) => (
                <span key={tag} className="tech-badge">
                  {tag}
                </span>
              ))}
            </div>

            <div className="hero-project-actions">
              <a
                href={FEATURED_HERO_PROJECT.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-btn action-primary"
              >
                <span>Visit Platform</span>
                <ExternalLinkIcon />
              </a>
            </div>
          </div>

          <div className="hero-project-media">
            <img
              src={FEATURED_HERO_PROJECT.image}
              alt={FEATURED_HERO_PROJECT.title}
              className="hero-project-img"
              loading="lazy"
            />
            <div className="hero-project-media-fade" />
          </div>
        </article>

        {/* SUBSEQUENT PROJECTS WITH MODERN PEEKING FADE WRAPPER */}
        <div className={`projects-expand-container ${showAll ? "is-expanded" : "is-collapsed"}`}>
          <div className="secondary-projects-grid">
            {PROJECTS_LIST.map((project: ProjectItem) => (
              <article key={project.id} className="project-card">
                <div className="project-media-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                  <span className="project-category-badge">{project.category}</span>
                </div>

                <div className="project-content-body">
                  <h4 className="project-title">{project.title}</h4>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags-row">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="tech-badge">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-card-footer">
                    {project.id === "portfolio-3d" ? (
                      <Link to="/3d" className="project-action-link project-action-primary">
                        <Cube3DIcon />
                        <span>Explore 3D Mode</span>
                      </Link>
                    ) : project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-link project-action-primary"
                      >
                        <ExternalLinkIcon />
                        <span>Live Demo</span>
                      </a>
                    ) : null}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-link project-action-secondary"
                        title="View GitHub Repository"
                      >
                        <GithubIcon />
                        <span>Repo</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!showAll && <div className="projects-fade-overlay" aria-hidden="true" />}
        </div>

        {/* Modern Expand Toggle Floating on Fade */}
        <div className={`section-expand-row ${!showAll ? "floating-on-fade" : ""}`}>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="section-expand-btn"
          >
            <span>{showAll ? "Show Fewer Projects" : `View More Projects (${PROJECTS_LIST.length - 1} more)`}</span>
            <ChevronDownIcon className={`expand-icon ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </section>
  );
}


