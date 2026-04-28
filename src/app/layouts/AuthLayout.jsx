import { ArrowRight, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import BrandMark from "../components/BrandMark";

function AuthLayout() {
  return (
    <main className="auth-shell">
      <section className="auth-card glass-panel">
        <div className="auth-feature-panel">
          <BrandMark />
          <div style={{ marginTop: "3rem", display: "grid", gap: "1rem" }}>
            <span className="eyebrow">Premium workflow design</span>
            <h1 style={{ margin: 0, fontFamily: '"Space Grotesk", sans-serif', fontSize: "3rem" }}>
              Design, launch, and scale unforgettable online workshops.
            </h1>
            <p className="muted" style={{ margin: 0, lineHeight: 1.8 }}>
              Manage registrations, learner journeys, announcements, analytics,
              and facilitator operations from a frontend that feels startup-ready.
            </p>
            <div className="helper-grid" style={{ marginTop: "1rem" }}>
              <div className="mini-stat">
                <strong>
                  <Sparkles size={18} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
                  Premium UX
                </strong>
                <span className="muted">Glassmorphism surfaces, refined spacing, and cinematic dashboards.</span>
              </div>
              <div className="mini-stat">
                <strong>
                  <ShieldCheck size={18} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
                  Role-based views
                </strong>
                <span className="muted">Separate protected spaces for admins and learners with local auth state.</span>
              </div>
              <div className="mini-stat">
                <strong>
                  <Users size={18} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
                  Presentation-ready
                </strong>
                <span className="muted">Ideal for demos, showcases, and final-year project presentations.</span>
              </div>
            </div>
          </div>
          <Link className="button button-secondary" style={{ marginTop: "2rem" }} to="/">
            Explore Landing Page
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="auth-form-panel">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
