import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cube3DIcon } from "./Icons";
import "./Floating3DPortal.css";

export function Floating3DPortal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after small scroll or 1.5s
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <aside className="floating-3d-portal" aria-label="3D Experience Shortcut">
      <Link to="/3d" className="floating-portal-btn" title="Explore Interactive 3D Room">
        <div className="portal-icon-wrapper">
          <Cube3DIcon className="portal-cube-icon" />
          <span className="portal-halo-glow" />
        </div>
        <div className="portal-text-wrapper">
          <span className="portal-badge-text">Interactive</span>
          <span className="portal-title-text">3D Room</span>
        </div>
        <div className="portal-tooltip">
          <span>Click to explore my Three.js virtual workspace!</span>
        </div>
      </Link>
    </aside>
  );
}
