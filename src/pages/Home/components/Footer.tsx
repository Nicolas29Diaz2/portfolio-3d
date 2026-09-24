import { Link } from "react-router-dom";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  WhatsAppIcon,
  Cube3DIcon,
} from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolio2d.data";
import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="portfolio-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <span className="footer-brand-title">Nicolás Díaz</span>
            <p className="footer-brand-desc">
              Full Stack Software Engineer &amp; Multimedia Engineer crafting resilient architectures
              and immersive WebGL experiences.
            </p>
          </div>

          <div className="footer-social-col">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="footer-social-icon"
            >
              <GithubIcon />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="footer-social-icon"
            >
              <LinkedinIcon />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email Me"
              className="footer-social-icon"
            >
              <MailIcon />
            </a>
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Chat"
              className="footer-social-icon"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copy">
            &copy; {currentYear} Nicolás Díaz. Engineered with React 19 &amp; TypeScript.
          </p>

          <div className="footer-extra-links">
            <Link to="/3d" className="footer-3d-link">
              <Cube3DIcon className="mini-icon" />
              <span>Interactive 3D Mode</span>
            </Link>
            <a href="#top" className="footer-back-top">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
