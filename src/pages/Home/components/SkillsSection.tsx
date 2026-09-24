import { SKILL_CATEGORIES } from "@/data/portfolio2d.data";
import "./SkillsSection.css";

export function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Stack</span>
          <h2 className="section-heading">Technologies</h2>
          <p className="section-subheading">
            Tools, frameworks, and engineering patterns I use to build scalable products.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="skills-clean-grid">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className="skill-cat-card">
              <h3 className="skill-cat-title">{category.title}</h3>
              <div className="skill-pills-wrap">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-clean-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
