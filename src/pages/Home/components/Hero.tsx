import {
  DownloadIcon,
  TerminalIcon,
  ArrowRightIcon,
} from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolio2d.data";
import "./Hero.css";

export function Hero() {
  return (
    <section className="hero-section" id="about">
      {/* Subtle ambient light */}
      <div className="hero-ambient-glow" />

      <div className="hero-grid-layout">
        {/* Left Column: Editorial Value Proposition */}
        <div className="hero-editorial-col">
          <div className="hero-status-tag">
            <span className="status-ping-dot" />
            <span className="status-label-text">{PERSONAL_INFO.availability}</span>
          </div>

          <h1 className="hero-name-title">
            Nicolás Díaz
            <span className="hero-role-subhead">Full Stack Software Engineer</span>
          </h1>

          <p className="hero-summary-text">
            I engineer resilient cloud platforms, distributed backend systems, and interactive 3D web applications using <strong>TypeScript, React, Next.js, and NestJS</strong>.
          </p>

          <div className="hero-action-row">
            <a href="#projects" className="hero-btn-primary">
              <span>View Projects</span>
              <ArrowRightIcon />
            </a>
            <a href="#contact" className="hero-btn-secondary">
              <span>Contact Me</span>
            </a>
            <a
              href={PERSONAL_INFO.resumeEnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-cv"
              title="Download Resume (PDF)"
            >
              <DownloadIcon />
              <span>Resume</span>
            </a>
          </div>

          <div className="hero-quick-meta">
            <div className="meta-pill">
              <span className="meta-dot" />
              <span>Founder &amp; Lead @ Volio Studio</span>
            </div>
            <div className="meta-pill">
              <span className="meta-dot" />
              <span>Cali, Colombia • Global Remote</span>
            </div>
          </div>
        </div>

        {/* Right Column: Code & Architecture Card */}
        <div className="hero-visual-col">
          <div className="code-window-card">
            <div className="code-window-header">
              <div className="window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="window-title">nicolas.config.ts</span>
              <span className="window-badge">TypeScript</span>
            </div>

            <div className="code-window-body">
              <pre className="code-syntax">
                <code>
                  <span className="c-keyword">export const</span>{" "}
                  <span className="c-variable">engineer</span> = &#123;
                  {"\n"}  <span className="c-key">role</span>:{" "}
                  <span className="c-string">&quot;Full Stack Dev&quot;</span>,
                  {"\n"}  <span className="c-key">founder</span>:{" "}
                  <span className="c-string">&quot;Volio Studio&quot;</span>,
                  {"\n"}  <span className="c-key">core</span>: [
                  {"\n"}    <span className="c-string">&quot;TypeScript&quot;</span>,{" "}
                  <span className="c-string">&quot;React 19&quot;</span>,
                  {"\n"}    <span className="c-string">&quot;Next.js&quot;</span>,{" "}
                  <span className="c-string">&quot;NestJS&quot;</span>,
                  {"\n"}    <span className="c-string">&quot;Redis&quot;</span>,{" "}
                  <span className="c-string">&quot;Three.js&quot;</span>
                  {"\n"}  ],
                  {"\n"}  <span className="c-key">cloud</span>: [
                  {"\n"}    <span className="c-string">&quot;AWS EC2&quot;</span>,{" "}
                  <span className="c-string">&quot;PostgreSQL&quot;</span>,
                  {"\n"}    <span className="c-string">&quot;Cloudflare R2&quot;</span>
                  {"\n"}  ],
                  {"\n"}  <span className="c-key">focus</span>:{" "}
                  <span className="c-string">&quot;Full Stack &amp; 3D&quot;</span>
                  {"\n"}&#125;;
                </code>
              </pre>
            </div>

            <div className="code-window-footer">
              <div className="footer-status-indicator">
                <TerminalIcon />
                <span>Production Ready</span>
              </div>
              <a href="#about" className="footer-doc-link">
                <span>View Specs</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
