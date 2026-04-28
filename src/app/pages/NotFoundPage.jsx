import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="not-found">
      <section className="glass-panel" style={{ padding: "2rem", textAlign: "center", maxWidth: "640px" }}>
        <span className="eyebrow">404</span>
        <h1 style={{ marginBottom: "0.75rem" }}>This page drifted out of the workshop universe.</h1>
        <p className="muted" style={{ marginBottom: "1.2rem", lineHeight: 1.8 }}>
          The route you requested doesn’t exist in this frontend demo. Head back to the homepage or open the dashboard.
        </p>
        <Link className="button button-primary" to="/">
          <ArrowLeft size={16} />
          Return home
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
