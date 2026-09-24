import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cube3DIcon, MenuIcon, CloseIcon } from "./Icons";
import "./Navbar.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className={`portfolio-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions: Single unified 3D toggle */}
        <div className="navbar-actions">
          <Link
            to="/3d"
            className="nav-btn-3d"
            title="Explore Interactive 3D Room"
          >
            <Cube3DIcon className="cube-icon-mini" />
            <span>3D Mode</span>
            <span className="live-dot" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-drawer-footer">
            <Link
              to="/3d"
              className="mobile-3d-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Cube3DIcon />
              <span>Explore Interactive 3D Mode</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
