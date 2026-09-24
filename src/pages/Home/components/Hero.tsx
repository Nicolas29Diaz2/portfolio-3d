import { useState } from "react";
import {
  TerminalIcon,
  ArrowRightIcon,
  LayersIcon,
  ExternalLinkIcon,
} from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolio2d.data";
import "./Hero.css";

interface ArchitectureNode {
  id: string;
  name: string;
  layer: string;
  statusBadge: string;
  accentColor: string;
  summary: string;
  highlights: string[];
}

const VOLIO_ARCHITECTURE: ArchitectureNode[] = [
  {
    id: "client",
    name: "Next.js 15 Client",
    layer: "Frontend & Layout Engine",
    statusBadge: "Edge Cached",
    accentColor: "#f5f5f7",
    summary: "Server-side rendering, responsive 2D album editor, and dynamic state cache.",
    highlights: ["React 19", "TypeScript", "Zustand", "Tailwind CSS"],
  },
  {
    id: "gateway",
    name: "NestJS API Gateway",
    layer: "Core Backend & Auth",
    statusBadge: "< 35ms Latency",
    accentColor: "#f5f5f7",
    summary: "Modular enterprise controllers, JWT auth guards, and decoupled service layers on AWS EC2.",
    highlights: ["NestJS", "REST Endpoints", "DTO Validation", "AWS EC2"],
  },
  {
    id: "workers",
    name: "BullMQ & Redis",
    layer: "Asynchronous Queue Workers",
    statusBadge: "Background Jobs",
    accentColor: "#f5f5f7",
    summary: "Decoupled job pipelines handling heavy video texture rendering, AI layout generations, and exports.",
    highlights: ["BullMQ", "Redis Cluster", "Job Retries", "Concurrency Control"],
  },
  {
    id: "data",
    name: "PostgreSQL & Cloudflare R2",
    layer: "Data & Multimedia Store",
    statusBadge: "Zero Egress",
    accentColor: "#f5f5f7",
    summary: "High-throughput relational data with pooled connections and zero-egress asset distribution.",
    highlights: ["PostgreSQL (Neon)", "Cloudflare R2", "S3 SDK", "ACID Transactions"],
  },
];

export function Hero() {
  const [activeNodeId, setActiveNodeId] = useState<string>("workers");
  const activeNode =
    VOLIO_ARCHITECTURE.find((n) => n.id === activeNodeId) ||
    VOLIO_ARCHITECTURE[2];

  return (
    <section className="hero-section" id="about">
      {/* Ambient background glows */}
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
            I architect resilient cloud backends, asynchronous worker pipelines, and high-performance web applications using <strong>TypeScript, React, Next.js, and NestJS</strong>.
          </p>

          <div className="hero-action-row">
            <a href="#projects" className="hero-btn-primary">
              <span>View Projects</span>
              <ArrowRightIcon />
            </a>
            <a href="#contact" className="hero-btn-secondary">
              <span>Contact Me</span>
            </a>
          </div>

          <div className="hero-quick-meta">
            <div className="meta-pill">
              <span className="meta-dot" />
              <span>Founder &amp; Tech Lead @ Volio Studio</span>
            </div>
            <div className="meta-pill">
              <span className="meta-dot" />
              <span>Cali, Colombia • Global Remote</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Volio Architecture Pipeline */}
        <div className="hero-visual-col">
          <div className="arch-pipeline-card">
            {/* Window Header */}
            <div className="arch-card-header">
              <div className="arch-header-left">
                <span className="arch-status-pulse" />
                <span className="arch-header-title">Volio Production Architecture</span>
              </div>
              <span className="arch-header-badge">AWS EC2 • Live</span>
            </div>

            {/* Pipeline Flow: 4 Interactive Nodes */}
            <div className="arch-nodes-flow" role="tablist" aria-label="Architecture Nodes">
              {VOLIO_ARCHITECTURE.map((node, index) => {
                const isActive = node.id === activeNodeId;
                return (
                  <div key={node.id} className="arch-node-wrapper">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveNodeId(node.id)}
                      className={`arch-node-btn ${isActive ? "active" : ""}`}
                    >
                      <div className="arch-node-icon-col">
                        <span
                          className="arch-node-dot"
                          style={{ backgroundColor: node.accentColor }}
                        />
                      </div>
                      <div className="arch-node-info">
                        <span className="arch-node-name">{node.name}</span>
                        <span className="arch-node-layer">{node.layer}</span>
                      </div>
                      <span className="arch-node-badge">{node.statusBadge}</span>
                    </button>

                    {index < VOLIO_ARCHITECTURE.length - 1 && (
                      <div className="arch-connector-line">
                        <span className="arch-flow-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active Node Detail Inspector */}
            <div className="arch-node-inspector">
              <div className="inspector-header">
                <div className="inspector-title-row">
                  <TerminalIcon className="mini-icon" />
                  <span className="inspector-active-name" style={{ color: activeNode.accentColor }}>
                    {activeNode.name}
                  </span>
                </div>
                <span className="inspector-layer-tag">{activeNode.layer}</span>
              </div>

              <p className="inspector-summary">{activeNode.summary}</p>

              <div className="inspector-tech-tags">
                {activeNode.highlights.map((tech) => (
                  <span key={tech} className="inspector-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="arch-card-footer">
              <div className="arch-footer-meta">
                <LayersIcon className="mini-icon" />
                <span>Zero-downtime queue-based architecture</span>
              </div>
              <a
                href="https://volio-studio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="arch-footer-link"
              >
                <span>Visit Volio</span>
                <ExternalLinkIcon className="mini-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
