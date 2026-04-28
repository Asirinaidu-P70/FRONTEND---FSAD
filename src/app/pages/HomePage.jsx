import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import heroGrid from "../../assets/hero-grid.svg";
import AccordionItem from "../components/AccordionItem";
import SectionHeading from "../components/SectionHeading";
import TestimonialCard from "../components/TestimonialCard";
import TrainerCard from "../components/TrainerCard";
import WorkshopCard from "../components/WorkshopCard";
import { trainers } from "../data/trainers";
import { faqs, landingFeatures, partnerLogos, platformStats, testimonials, workshopCategories as landingCategories } from "../data/platform";
import { fetchWorkshops } from "../services/api";

function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [featuredWorkshops, setFeaturedWorkshops] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadFeaturedWorkshops = async () => {
      try {
        const data = await fetchWorkshops();

        if (isMounted) {
          setFeaturedWorkshops(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching featured workshops:", error);
      }
    };

    loadFeaturedWorkshops();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-kicker">
            <Sparkles size={16} />
            Premium workshop operations
          </span>
          <h1>
            Run standout online workshops without the admin chaos.
          </h1>
          <p>
            Online Workshop Management Platform blends a polished marketing site,
            role-based dashboards, and rich visual analytics into one futuristic
            frontend built for impressive presentations and real-world SaaS vibes.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/register">
              Start Free Preview
              <ArrowRight size={16} />
            </Link>
            <Link className="button button-secondary" to="/workshops">
              <PlayCircle size={16} />
              Explore Workshops
            </Link>
          </div>
          <div className="hero-stats">
            <div className="mini-stat">
              <strong>84%</strong>
              <span className="muted">Seat utilization</span>
            </div>
            <div className="mini-stat">
              <strong>4.8/5</strong>
              <span className="muted">Average feedback</span>
            </div>
            <div className="mini-stat">
              <strong>13.6k</strong>
              <span className="muted">Certificates issued</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div
            className="floating-orb"
            style={{
              width: "160px",
              height: "160px",
              background: "rgba(87,245,255,0.32)",
              top: "12%",
              left: "4%",
            }}
          />
          <div
            className="floating-orb"
            style={{
              width: "180px",
              height: "180px",
              background: "rgba(255,155,113,0.22)",
              bottom: "6%",
              right: "10%",
            }}
          />
          <div className="hero-visual-stage">
            <img alt="Dashboard preview" src={heroGrid} />
            <div className="floating-card top">
              <span className="tag">Live dashboard</span>
              <h3 style={{ marginBottom: "0.4rem" }}>Sessions launched this month</h3>
              <strong style={{ fontSize: "2rem" }}>28</strong>
              <p className="muted" style={{ marginBottom: 0 }}>
                Faster planning, smoother registrations, cleaner reporting.
              </p>
            </div>
            <div className="floating-card bottom">
              <div className="trainer-header" style={{ marginBottom: "0.9rem" }}>
                <Users size={18} />
                <strong>Attendance confidence</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: "91%" }} />
              </div>
              <p className="muted" style={{ marginTop: "0.8rem", marginBottom: 0 }}>
                91% average attendance across live cohorts.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="Trusted by modern teams"
            title="Designed like a startup-grade product from day one."
            description="This frontend-only experience mixes bold visuals, elegant interactions, and dashboard depth that feels immediately presentation-ready."
          />
          <div className="logo-strip">
            {partnerLogos.map((logo) => (
              <div key={logo} className="logo-pill">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" id="features">
        <div className="container">
          <SectionHeading
            eyebrow="Feature stack"
            title="Everything your workshop operation needs in one polished frontend."
            description="Reusable sections, dashboards, cards, tables, charts, forms, and interactions all stay visually aligned through a shared premium design system."
          />
          <div className="page-grid grid-4">
            {landingFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                className="feature-card glass-panel"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
              >
                <span className="tag">{feature.tag}</span>
                <strong>{feature.title}</strong>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" id="categories">
        <div className="container">
          <SectionHeading
            eyebrow="Workshop catalog"
            title="Curated categories for premium online learning experiences."
            description="From AI intensives to facilitator labs, every category can be managed with the same consistent workshop lifecycle."
          />
          <div className="page-grid grid-4">
            {landingCategories.map((category, index) => (
              <motion.div
                key={category.name}
                className="category-card glass-panel"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="tag">{category.count}</span>
                <strong>{category.name}</strong>
                <p>
                  Premium registration, trainer highlights, analytics visibility,
                  and polished learner touchpoints built in.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="Featured sessions"
            title="Workshop cards built to convert with clarity and confidence."
            description="Hover effects, trainer identity, seat visibility, ratings, and clear actions all work together to make browsing feel premium."
          />
          <div className="page-grid grid-3">
            {featuredWorkshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                detailsHref={`/workshops/${workshop.id}`}
                registerAction={() =>
                  toast.success(`Sign in to register for ${workshop.title}.`)
                }
                workshop={workshop}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="Platform stats"
            title="Numbers that make the product story feel believable."
            description="A final-year project demo lands better when the interface tells a coherent operational story through strong metrics."
            align="center"
          />
          <div className="stat-grid">
            {platformStats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="icon-wrap">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3>{stat.value}</h3>
                  <p className="muted" style={{ margin: 0 }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="Expert trainers"
            title="Facilitators and mentors that give the platform a credible human layer."
            description="Trainer cards make the product feel grounded in people, not just dashboards."
          />
          <div className="page-grid grid-3">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="Testimonials"
            title="Social proof designed for product storytelling."
            description="Short, believable testimonials help position the platform as a serious SaaS experience."
          />
          <div className="page-grid grid-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" id="faq">
        <div className="container">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions a reviewer or faculty panel is likely to ask."
            description="These answers help position the project as thoughtfully structured, extensible, and practical."
          />
          <div className="faq-list">
            {faqs.map((item, index) => (
              <AccordionItem
                key={item.question}
                item={item}
                onToggle={() => setOpenFaq(index === openFaq ? -1 : index)}
                open={openFaq === index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="glass-panel" style={{ padding: "2rem", textAlign: "center" }}>
            <span className="eyebrow">Ready to present</span>
            <h2 style={{ marginTop: "1rem", marginBottom: "0.75rem" }}>
              Build the impression of a polished real-world learning platform.
            </h2>
            <p className="muted" style={{ maxWidth: "54ch", margin: "0 auto 1.25rem" }}>
              The entire experience is frontend-only, but the structure is already set up
              like a serious production app with reusable components, protected routes,
              mock services, and scalable visual patterns.
            </p>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <Link className="button button-primary" to="/register">
                Create Demo Account
              </Link>
              <Link className="button button-secondary" to="/workshops">
                Browse Catalog
              </Link>
            </div>
            <div className="logo-strip" style={{ justifyContent: "center", marginTop: "1.4rem" }}>
              <span className="pill">
                <CheckCircle2 size={14} />
                React + Vite
              </span>
              <span className="pill">
                <CheckCircle2 size={14} />
                Responsive dashboard
              </span>
              <span className="pill">
                <CheckCircle2 size={14} />
                Spring Boot API
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
