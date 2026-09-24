import { useState } from "react";
import {
  MailIcon,
  WhatsAppIcon,
  LinkedinIcon,
  GithubIcon,
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  ExternalLinkIcon,
} from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolio2d.data";
import "./ContactSection.css";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-eyebrow">Connect</span>
          <h2 className="section-heading">Get in Touch</h2>
          <p className="section-subheading mx-auto">
            Available for full-time software engineering roles and select consulting.
            Reach out directly through any channel below.
          </p>
        </div>

        {/* High-speed conversion grid */}
        <div className="contact-fast-grid">
          {/* Email Copy Card */}
          <div className="contact-tile" onClick={handleCopyEmail}>
            <div className="tile-icon-wrap icon-cyan">
              <MailIcon />
            </div>
            <div className="tile-info">
              <span className="tile-label">Email</span>
              <span className="tile-val">{PERSONAL_INFO.email}</span>
            </div>
            <button
              type="button"
              className="tile-action-btn"
              title="Copy email"
              aria-label="Copy email"
            >
              {copied ? <CheckIcon className="icon-green" /> : <CopyIcon />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* WhatsApp Direct */}
          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-tile"
          >
            <div className="tile-icon-wrap icon-green">
              <WhatsAppIcon />
            </div>
            <div className="tile-info">
              <span className="tile-label">WhatsApp</span>
              <span className="tile-val">{PERSONAL_INFO.phoneDisplay}</span>
            </div>
            <div className="tile-action-btn">
              <ExternalLinkIcon />
              <span>Chat</span>
            </div>
          </a>

          {/* LinkedIn Direct */}
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-tile"
          >
            <div className="tile-icon-wrap icon-blue">
              <LinkedinIcon />
            </div>
            <div className="tile-info">
              <span className="tile-label">LinkedIn</span>
              <span className="tile-val">in/nicolassdiazs</span>
            </div>
            <div className="tile-action-btn">
              <ExternalLinkIcon />
              <span>Connect</span>
            </div>
          </a>

          {/* GitHub Direct */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-tile"
          >
            <div className="tile-icon-wrap">
              <GithubIcon />
            </div>
            <div className="tile-info">
              <span className="tile-label">GitHub</span>
              <span className="tile-val">Nicolas29Diaz2</span>
            </div>
            <div className="tile-action-btn">
              <ExternalLinkIcon />
              <span>Profile</span>
            </div>
          </a>
        </div>

        {/* Resume Download Hub */}
        <div className="resume-hub">
          <span className="resume-hub-title">Official Resumes:</span>
          <div className="resume-hub-links">
            <a
              href={PERSONAL_INFO.resumeEnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-pill-btn pill-primary"
            >
              <DownloadIcon />
              <span>English Resume (PDF)</span>
            </a>
            <a
              href={PERSONAL_INFO.resumeEsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-pill-btn pill-secondary"
            >
              <DownloadIcon />
              <span>Spanish Resume (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
