import { Link } from "react-router-dom";
import {
  ExternalLinkIcon,
  Cube3DIcon,
  SparklesIcon,
  ArrowRightIcon,
  TerminalIcon,
} from "./Icons";
import "./BentoShowcase.css";

export function BentoShowcase() {
  return (
    <section className="bento-spotlight-section">
      <div className="bento-container">
        <div className="section-header text-left">
          <span className="section-eyebrow">Spotlight Architecture</span>
          <h2 className="section-heading">
            Flagship Engineering &amp;{" "}
            <span className="text-gradient-cyan">Creative Tech</span>
          </h2>
          <p className="section-subheading">
            Deep dive into end-to-end product architecture: from distributed
            queue workers and multimodal AI to hardware-accelerated 3D WebGL
            rendering.
          </p>
        </div>

        <div className="bento-main-grid">
          {/* Card 1: Volio Studio SaaS Flagship */}
          <div className="bento-card bento-card-volio">
            <div className="bento-card-header">
              <div className="card-badge-row">
                <span className="badge-pill badge-primary">
                  Founder &amp; Tech Lead
                </span>
                <span className="badge-pill badge-saas">Production SaaS</span>
              </div>
              <h3 className="bento-title">Volio Studio</h3>
              <p className="bento-tagline">
                Interactive digital magazine &amp; album platform with
                AI-assisted layout generation.
              </p>
            </div>

            <div className="volio-highlights-list">
              <div className="volio-highlight-item">
                <span className="highlight-dot" />
                <div>
                  <strong>Distributed Asynchronous Queues:</strong> NestJS
                  backend processing image optimization and PDF compiling via
                  Redis &amp; BullMQ on AWS EC2.
                </div>
              </div>
              <div className="volio-highlight-item">
                <span className="highlight-dot" />
                <div>
                  <strong>Multimodal AI Assistant:</strong> Prompt engineering
                  with LLM Structured Outputs to parse photos and generate
                  responsive editable layouts automatically.
                </div>
              </div>
              <div className="volio-highlight-item">
                <span className="highlight-dot" />
                <div>
                  <strong>Dynamic 3D Canvas:</strong> Three.js and React Three
                  Fiber rendering synchronized video textures mapped on
                  geometric meshes with mobile GPU tuning.
                </div>
              </div>
            </div>

            <div className="volio-tech-tags">
              <span>Next.js</span>
              <span>NestJS</span>
              <span>Redis</span>
              <span>BullMQ</span>
              <span>PostgreSQL (Neon)</span>
              <span>Cloudflare R2</span>
              <span>Three.js / R3F</span>
              <span>Docker</span>
            </div>

            <div className="bento-media-container">
              <img
                src="/Images/Projects/volio2.png"
                alt="Volio Studio SaaS Interface"
                className="bento-img-preview"
                loading="lazy"
              />
              <div className="bento-media-overlay" />
            </div>

            <div className="bento-action-bar">
              <a
                href="https://volio-studio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bento-link-btn"
              >
                <span>Visit Volio Platform</span>
                <ExternalLinkIcon />
              </a>
            </div>
          </div>

          {/* Card 2: 3D Workspace Portal (Interactive Teaser) */}
          <div className="bento-card bento-card-3d-portal">
            <div className="portal-aura-glow" />
            <div className="bento-card-header">
              <div className="card-badge-row">
                <span className="badge-pill badge-cyan">
                  <Cube3DIcon className="mini-icon" /> Spatial WebGL
                </span>
                <span className="badge-pill badge-pulse">Interactive Room</span>
              </div>
              <h3 className="bento-title">Virtual 3D Workspace</h3>
              <p className="bento-tagline">
                Fancy an interactive experience? Step into my custom 3D
                cyberpunk workspace, inspect screens, control the cinematic
                camera, and interact with the environment.
              </p>
            </div>

            <div className="portal-preview-frame">
              <img
                src="/Images/Projects/Portfolio.webp"
                alt="3D Interactive Virtual Room"
                className="portal-preview-img"
                loading="lazy"
              />
              <div className="portal-scanline" />
              <div className="portal-badge-floating">
                <SparklesIcon className="icon-cyan" />
                <span>R3F • Drei • Custom Shaders</span>
              </div>
            </div>

            <div className="portal-features">
              <div className="feature-chip">
                <TerminalIcon />
                <span>Tiered GPU Detection (60 FPS)</span>
              </div>
              <div className="feature-chip">
                <Cube3DIcon />
                <span>Interactive Holographic Screens</span>
              </div>
            </div>

            <div className="bento-action-bar">
              <Link to="/3d" className="launch-3d-btn">
                <span>Launch 3D Experience</span>
                <ArrowRightIcon className="arrow-pulse" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
