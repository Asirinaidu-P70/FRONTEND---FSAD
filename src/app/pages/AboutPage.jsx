import { Lightbulb, Rocket, ShieldCheck, Target } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import TrainerCard from "../components/TrainerCard";
import { trainers } from "../data/trainers";

const values = [
  {
    icon: Rocket,
    title: "Experience-led design",
    description:
      "Every screen is designed to feel intentional, cinematic, and premium rather than template-driven.",
  },
  {
    icon: Target,
    title: "Operational clarity",
    description:
      "Dashboards, tables, analytics, and forms work together to reduce friction for both admins and learners.",
  },
  {
    icon: ShieldCheck,
    title: "Future-ready architecture",
    description:
      "Structured routing, contexts, mock APIs, and reusable UI make the app easy to extend with a backend later.",
  },
  {
    icon: Lightbulb,
    title: "Presentation confidence",
    description:
      "The product is designed to feel believable in demos, viva presentations, and portfolio showcases.",
  },
];

function AboutPage() {
  return (
    <div className="top-padding">
      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="About the platform"
            title="A premium frontend vision for managing online workshops and training programs."
            description="This project focuses entirely on frontend craft: a startup-quality landing page, role-based dashboards, mock analytics, and polished component design."
          />
          <div className="page-grid grid-2">
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <h3 style={{ marginTop: 0 }}>Why this project stands out</h3>
              <p className="muted" style={{ lineHeight: 1.8 }}>
                Instead of building a plain CRUD interface, this platform frames workshop
                management as a premium SaaS experience. The result feels modern, futuristic,
                and visually rich while staying structured enough for real frontend engineering work.
              </p>
              <p className="muted" style={{ lineHeight: 1.8 }}>
                Public pages attract users, auth flows feel clean and trustworthy, dashboards
                reveal operational insight, and reusable UI components keep the product cohesive.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <h3 style={{ marginTop: 0 }}>What is included</h3>
              <div className="page-grid">
                <div className="workshop-meta">
                  <span className="muted">Landing experience</span>
                  <strong>Hero, features, categories, testimonials, stats, FAQ</strong>
                </div>
                <div className="workshop-meta">
                  <span className="muted">Protected workspaces</span>
                  <strong>Separate user and admin dashboard flows</strong>
                </div>
                <div className="workshop-meta">
                  <span className="muted">Reusable system</span>
                  <strong>Cards, tables, forms, tabs, drawers, modals, toasts</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="Core values"
            title="Built around visual confidence, structure, and usability."
            description="Each value reinforces the goal of making the project feel presentation-ready while still being cleanly engineered."
          />
          <div className="page-grid grid-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div key={value.title} className="feature-card glass-panel">
                  <div className="icon-wrap">
                    <Icon size={20} />
                  </div>
                  <strong>{value.title}</strong>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="Meet the trainers"
            title="A strong workshop platform needs strong human context."
            description="Trainer identities make the workshop cards, testimonials, and detail pages feel more realistic and complete."
          />
          <div className="page-grid grid-3">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
