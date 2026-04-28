import { ArrowRight, CalendarDays } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import PageIntro from "../components/PageIntro";
import { fetchMyWorkshops } from "../services/api";

function MyWorkshopsPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadWorkshops = async () => {
      try {
        const data = await fetchMyWorkshops();

        if (isMounted) {
          setWorkshops(data);
        }
      } catch (error) {
        console.error("Error fetching registered workshops:", error);
      }
    };

    loadWorkshops();

    return () => {
      isMounted = false;
    };
  }, []);

  const rows = useMemo(
    () =>
      workshops.map((workshop) => ({
        id: workshop.id,
        registrationId: workshop.registrationId || "Not available",
        registeredOn: workshop.registeredAt || "Not available",
        workshop: workshop.title,
        date: workshop.date,
        trainer: workshop.trainerName,
        status: workshop.registrationStatus || "Registered",
        progress: workshop.progress ?? 0,
        original: workshop,
      })),
    [workshops]
  );

  return (
    <div className="container">
      <PageIntro
        eyebrow="My workshops"
        title="Monitor upcoming sessions, trainer details, and completion progress."
        description="A clean learner table keeps registrations clear while still feeling premium and interactive."
        actions={
          <Link className="button button-primary" to="/app/workshops">
            Add more workshops
          </Link>
        }
      />

      <div className="data-card">
        <div className="data-card-head">
          <h3 style={{ margin: 0 }}>Registered workshops</h3>
          <span className="pill">
            <CalendarDays size={14} />
            {rows.length} active registrations
          </span>
        </div>
        <DataTable
          columns={[
            { key: "registrationId", label: "Registration ID" },
            { key: "registeredOn", label: "Registered On" },
            { key: "workshop", label: "Workshop" },
            { key: "date", label: "Date" },
            { key: "trainer", label: "Trainer" },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <span
                  className={`status-badge ${
                    row.status === "In Progress" ? "status-success" : "status-warning"
                  }`}
                >
                  {row.status}
                </span>
              ),
            },
            {
              key: "progress",
              label: "Progress",
              render: (row) => (
                <div style={{ minWidth: "160px" }}>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${row.progress}%` }} />
                  </div>
                  <span className="muted" style={{ fontSize: "0.86rem" }}>
                    {row.progress}% complete
                  </span>
                </div>
              ),
            },
            {
              key: "action",
              label: "Action",
              render: (row) => (
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setSelectedWorkshop(row.original)}
                >
                  View summary
                </button>
              ),
            },
          ]}
          rows={rows}
        />
      </div>

      <Modal
        footer={
          <Link className="button button-primary" to={`/app/workshops/${selectedWorkshop?.id || ""}`}>
            Open details
            <ArrowRight size={16} />
          </Link>
        }
        onClose={() => setSelectedWorkshop(null)}
        open={Boolean(selectedWorkshop)}
        title={selectedWorkshop?.title || "Workshop summary"}
      >
        {selectedWorkshop ? (
          <div className="page-grid">
            <div className="workshop-meta">
              <span className="muted">Registration ID</span>
              <strong>{selectedWorkshop.registrationId || "Not available"}</strong>
            </div>
            <div className="workshop-meta">
              <span className="muted">Registered on</span>
              <strong>{selectedWorkshop.registeredAt || "Not available"}</strong>
            </div>
            <div className="workshop-meta">
              <span className="muted">Trainer</span>
              <strong>{selectedWorkshop.trainerName}</strong>
            </div>
            <div className="workshop-meta">
              <span className="muted">Date and time</span>
              <strong>
                {selectedWorkshop.date} • {selectedWorkshop.time}
              </strong>
            </div>
            <div className="workshop-meta">
              <span className="muted">Next session</span>
              <strong>{selectedWorkshop.nextSession}</strong>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default MyWorkshopsPage;
