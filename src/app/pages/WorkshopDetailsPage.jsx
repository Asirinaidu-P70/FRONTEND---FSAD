import { ArrowLeft, CalendarDays, Clock3, Star, Ticket, Users } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Tabs from "../components/Tabs";
import TrainerCard from "../components/TrainerCard";
import WorkshopCard from "../components/WorkshopCard";
import {
  fetchWorkshopById,
  fetchWorkshops,
  registerWorkshop,
} from "../services/api";

function WorkshopDetailsPage() {
  const { workshopId } = useParams();
  const location = useLocation();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [relatedWorkshops, setRelatedWorkshops] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);

  const isDashboardView = location.pathname.startsWith("/app");
  const backHref = isDashboardView ? "/app/workshops" : "/workshops";

  useEffect(() => {
    const loadWorkshop = async () => {
      try {
        const workshopData = await fetchWorkshopById(workshopId);
        setWorkshop(workshopData);

        const allWorkshops = await fetchWorkshops();
        const related = allWorkshops
          .filter(
            (entry) =>
              entry.id !== workshopData.id &&
              entry.category === workshopData.category
          )
          .slice(0, 2);

        setRelatedWorkshops(related);
      } catch (error) {
        toast.error("Failed to load workshop.");
      } finally {
        setLoading(false);
      }
    };

    loadWorkshop();
  }, [workshopId]);

  const handleRegister = async (selectedWorkshop) => {
    try {
      setIsRegistering(true);
      await registerWorkshop(selectedWorkshop.id);
      toast.success(`${selectedWorkshop.title} registered successfully.`);
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setIsRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className={isDashboardView ? "" : "top-padding"}>
        <section className="page-section">
          <div className="container">
            <LoadingSkeleton count={3} height={220} />
          </div>
        </section>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className={isDashboardView ? "" : "top-padding"}>
        <section className="page-section">
          <div className="container">
            <EmptyState
              title="Workshop not found"
              description="This demo entry may have been removed from the static catalog."
              action={
                <Link className="button button-primary" to={backHref}>
                  Back to workshops
                </Link>
              }
            />
          </div>
        </section>
      </div>
    );
  }

  const seatFill = Math.round(
    ((workshop.seatsTotal - workshop.seatsAvailable) / workshop.seatsTotal) * 100
  );

  return (
    <div className={isDashboardView ? "" : "top-padding"}>
      <section className="page-section">
        <div className="container page-grid">
          <Link className="pill" style={{ width: "fit-content" }} to={backHref}>
            <ArrowLeft size={14} />
            Back to workshops
          </Link>

          <div className="glass-panel" style={{ padding: "1.6rem" }}>
            <div className="workshop-header" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span className="tag">{workshop.category}</span>
                <h1 style={{ marginBottom: "0.75rem", marginTop: "0.8rem" }}>{workshop.title}</h1>
                <p className="muted" style={{ margin: 0, maxWidth: "68ch", lineHeight: 1.8 }}>
                  {workshop.description}
                </p>
              </div>
              <div className="workshop-meta">
                <span className="muted">Price</span>
                <strong style={{ fontSize: "1.6rem" }}>{workshop.price}</strong>
              </div>
            </div>

            <div className="page-grid grid-4" style={{ marginTop: "1.5rem" }}>
              <div className="workshop-meta">
                <span className="muted">
                  <CalendarDays size={15} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
                  Date
                </span>
                <strong>{workshop.date}</strong>
              </div>
              <div className="workshop-meta">
                <span className="muted">
                  <Clock3 size={15} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
                  Time
                </span>
                <strong>{workshop.time}</strong>
              </div>
              <div className="workshop-meta">
                <span className="muted">
                  <Users size={15} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
                  Seats
                </span>
                <strong>{workshop.seatsAvailable} available</strong>
              </div>
              <div className="workshop-meta">
                <span className="muted">
                  <Star size={15} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
                  Rating
                </span>
                <strong>{workshop.rating}/5</strong>
              </div>
            </div>

            <div style={{ marginTop: "1.1rem" }}>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${seatFill}%` }} />
              </div>
              <p className="muted" style={{ marginBottom: 0, marginTop: "0.8rem" }}>
                {seatFill}% of seats filled. Next session: {workshop.nextSession}
              </p>
            </div>

            <div className="hero-actions" style={{ marginTop: "1.4rem" }}>
              <button
                type="button"
                className="button button-primary"
                disabled={isRegistering}
                onClick={() => handleRegister(workshop)}
              >
                <Ticket size={16} />
                {isRegistering ? "Registering..." : "Register Now"}
              </button>
              <span className="pill">{workshop.mode}</span>
              <span className="pill">{workshop.level}</span>
              <span className="pill">{workshop.duration}</span>
            </div>
          </div>

          <Tabs
            activeTab={activeTab}
            items={[
              { label: "Overview", value: "overview" },
              { label: "Agenda", value: "agenda" },
              { label: "Benefits", value: "benefits" },
            ]}
            onChange={setActiveTab}
          />

          {activeTab === "overview" ? (
            <div className="page-grid grid-2">
              <div className="glass-panel" style={{ padding: "1.4rem" }}>
                <h3 style={{ marginTop: 0 }}>Why this workshop stands out</h3>
                <p className="muted" style={{ lineHeight: 1.8 }}>
                  This session is designed as a premium learning experience with
                  strong positioning, live facilitation, and clear learner outcomes.
                  The workshop details page combines program context, trainer identity,
                  and purchase confidence in a single polished surface.
                </p>
                <div className="logo-strip">
                  {workshop.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <TrainerCard
                trainer={{
                  id: workshop.trainerId || workshop.id,
                  name: workshop.trainerName,
                  role: workshop.trainerRole,
                  title: workshop.trainerRole,
                  avatar: workshop.trainerAvatar,
                  expertise: workshop.tags[0],
                  sessions: 20,
                }}
              />
            </div>
          ) : null}

          {activeTab === "agenda" ? (
            <div className="glass-panel" style={{ padding: "1.4rem" }}>
              <h3 style={{ marginTop: 0 }}>Workshop agenda</h3>
              <div className="page-grid">
                {workshop.agenda.map((item) => (
                  <div key={item} className="activity-item">
                    <strong>{item}</strong>
                    <span className="tag">Live module</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "benefits" ? (
            <div className="glass-panel" style={{ padding: "1.4rem" }}>
              <h3 style={{ marginTop: 0 }}>Learner benefits</h3>
              <div className="page-grid">
                {workshop.benefits.map((item) => (
                  <div key={item} className="activity-item">
                    <strong>{item}</strong>
                    <span className="muted">Included</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {relatedWorkshops.length ? (
            <div className="page-grid">
              <h2 style={{ marginBottom: 0 }}>Related workshops</h2>
              <div className="page-grid grid-2">
                {relatedWorkshops.map((entry) => (
                  <WorkshopCard
                    key={entry.id}
                    detailsHref={`${backHref}/${entry.id}`}
                    registerAction={() => handleRegister(entry)}
                    workshop={entry}
                    isRegistered={entry.registered}
                    isRegistering={isRegistering}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default WorkshopDetailsPage;
