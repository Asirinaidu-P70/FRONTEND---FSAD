import { motion } from "framer-motion";
import { CalendarDays, Clock3, Star, Ticket, Users } from "lucide-react";
import { Link } from "react-router-dom";

function WorkshopCard({
  workshop,
  registerAction,
  detailsHref,
  isRegistered = false,
  isRegistering = false,
  registerLabel,
  showRegisterButton = true,
}) {
  const capacity = Math.round(
    ((workshop.seatsTotal - workshop.seatsAvailable) / workshop.seatsTotal) * 100
  );
  const statusClass =
    workshop.status === "Open"
      ? "status-success"
      : workshop.status === "Almost Full" || workshop.status === "Filling Fast"
        ? "status-warning"
        : "status-neutral";

  return (
    <motion.article
      className="workshop-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <div className="workshop-header" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span className="tag">{workshop.category}</span>
          <h3 style={{ marginBottom: "0.35rem" }}>{workshop.title}</h3>
          <p className="muted" style={{ margin: 0 }}>{workshop.description}</p>
        </div>
        <span className={`status-badge ${statusClass}`}>{workshop.status}</span>
      </div>

      <div className="trainer-header">
        <img
          className="avatar"
          src={workshop.trainerAvatar || workshop.imageUrl}
          alt={workshop.trainerName}
        />
        <div className="trainer-meta">
          <strong>{workshop.trainerName}</strong>
          <span className="muted">{workshop.trainerRole}</span>
        </div>
      </div>

      <div className="workshop-meta-grid">
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
          <strong>{workshop.seatsAvailable} left</strong>
        </div>
        <div className="workshop-meta">
          <span className="muted">
            <Star size={15} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
            Rating
          </span>
          <strong>{workshop.rating ? `${workshop.rating}/5` : "New"}</strong>
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${capacity}%` }} />
      </div>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Link className="button button-secondary" to={detailsHref}>
          View Details
        </Link>
        {showRegisterButton ? (
          <button
            type="button"
            className={isRegistered ? "button button-secondary" : "button button-primary"}
            disabled={isRegistered || isRegistering}
            onClick={registerAction}
          >
            <Ticket size={16} />
            {registerLabel || (isRegistered ? "Already Registered" : isRegistering ? "Registering..." : "Register")}
          </button>
        ) : null}
      </div>
    </motion.article>
  );
}

export default WorkshopCard;
