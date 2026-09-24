import { useState } from "react";
import { WORK_EXPERIENCES, type WorkExperience } from "@/data/portfolio2d.data";
import { ExternalLinkIcon, ChevronDownIcon } from "./Icons";
import "./ExperienceSection.css";

export function ExperienceSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleExperiences = showAll ? WORK_EXPERIENCES : WORK_EXPERIENCES.slice(0, 3);

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Career</span>
          <h2 className="section-heading">Work Experience</h2>
          <p className="section-subheading">
            Track record of architecting SaaS products, delivering enterprise-scale solutions,
            and collaborating with international teams.
          </p>
        </div>

        {/* Timeline */}
        <div className="experience-timeline">
          {visibleExperiences.map((exp: WorkExperience, index: number) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-marker-col">
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" />
                </div>
                {index !== visibleExperiences.length - 1 && (
                  <div className="timeline-line" />
                )}
              </div>

              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <div className="timeline-badge-group">
                      <span className="experience-company">{exp.company}</span>
                      <span className="experience-type-badge">{exp.type}</span>
                    </div>
                    <h3 className="experience-role">{exp.role}</h3>
                  </div>

                  <div className="timeline-meta-box">
                    <span className="experience-period">{exp.period}</span>
                    <span className="experience-location">{exp.location}</span>
                  </div>
                </div>

                <ul className="experience-achievements">
                  {exp.achievements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="experience-stack-row">
                  {exp.techStack.map((tech) => (
                    <span key={tech} className="experience-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {exp.website && (
                  <div className="experience-link-bar">
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="experience-live-link"
                    >
                      <span>Visit Platform</span>
                      <ExternalLinkIcon />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modern Expand Toggle */}
        {WORK_EXPERIENCES.length > 3 && (
          <div className="section-expand-row">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="section-expand-btn"
            >
              <span>{showAll ? "Show Fewer Roles" : `View Full Career (${WORK_EXPERIENCES.length - 3} more)`}</span>
              <ChevronDownIcon className={`expand-icon ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

