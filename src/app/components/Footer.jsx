import { Link } from "react-router-dom";
import BrandMark from "./BrandMark";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="glass-panel" style={{ padding: "1.35rem" }}>
          <BrandMark />
          <p className="muted" style={{ marginBottom: 0, marginTop: "1rem", lineHeight: 1.7 }}>
            A polished frontend-only SaaS experience for managing online workshops,
            cohorts, analytics, learner journeys, and modern training operations.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: "1.35rem" }}>
          <h4 style={{ marginTop: 0 }}>Product</h4>
          <p className="muted">Workshops</p>
          <p className="muted">Analytics</p>
          <p className="muted">Certificates</p>
        </div>
        <div className="glass-panel" style={{ padding: "1.35rem" }}>
          <h4 style={{ marginTop: 0 }}>Company</h4>
          <Link className="muted" to="/about">
            About
          </Link>
          <br />
          <Link className="muted" to="/contact">
            Contact
          </Link>
        </div>
        <div className="glass-panel" style={{ padding: "1.35rem" }}>
          <h4 style={{ marginTop: 0 }}>Support</h4>
          <p className="muted">hello@workshopplatform.dev</p>
          <p className="muted">Mon - Fri</p>
          <p className="muted">Remote global support</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
