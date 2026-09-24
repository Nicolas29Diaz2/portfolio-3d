import { AwardIcon } from "./Icons";
import { EDUCATION_DATA } from "@/data/portfolio2d.data";
import "./EducationSection.css";

export function EducationSection() {
  return (
    <section className="education-section">
      <div className="education-container">
        <div className="education-compact-card">
          <div className="education-icon-box">
            <AwardIcon />
          </div>

          <div className="education-info">
            <div className="education-top-line">
              <h3 className="education-degree-title">{EDUCATION_DATA.degree}</h3>
              <span className="education-distinction-badge">{EDUCATION_DATA.distinction}</span>
            </div>
            <p className="education-meta-text">
              {EDUCATION_DATA.institution} • {EDUCATION_DATA.location} • {EDUCATION_DATA.date}
            </p>
            <p className="education-subnote">{EDUCATION_DATA.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
