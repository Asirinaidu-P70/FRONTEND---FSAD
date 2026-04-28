import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import PageIntro from "../components/PageIntro";
import {
  fetchRegistrations,
  fetchUsers,
  fetchWorkshops,
} from "../services/api";

function ManageRegistrationsPage() {
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadRegistrations = async () => {
      try {
        const [users, workshops, registrationsData] = await Promise.all([
          fetchUsers(),
          fetchWorkshops(),
          fetchRegistrations(),
        ]);

        const userMap = new Map(users.map((user) => [String(user.id), user]));
        const workshopMap = new Map(workshops.map((workshop) => [String(workshop.id), workshop]));

        const nextRegistrations = registrationsData.map((registration) => {
          const user = userMap.get(String(registration.userId));

          return {
            id: registration.id,
            learner: user?.name || `User #${registration.userId}`,
            learnerEmail: user?.email || "Not available",
            workshop:
              workshopMap.get(String(registration.workshopId))?.title ||
              `Workshop #${registration.workshopId}`,
            workshopId: registration.workshopId,
            registrationDate: registration.registrationDate
              ? new Date(registration.registrationDate).toLocaleString()
              : "Not available",
          };
        });

        if (isMounted) {
          setRegistrations(nextRegistrations);
        }
      } catch (error) {
        toast.error(error.message || "Unable to load registrations.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRegistrations();

    return () => {
      isMounted = false;
    };
  }, []);

  const rows = useMemo(() => registrations, [registrations]);

  return (
    <div className="container">
      <PageIntro
        eyebrow="Registrations"
        title="Review the real workshop registrations stored in the backend."
        description="This admin view now reflects your actual registration records instead of placeholder frontend rows."
      />

      <div className="data-card">
        {isLoading ? (
          <h2 style={{ color: "white" }}>Loading registrations...</h2>
        ) : (
          <DataTable
            columns={[
              { key: "id", label: "Registration ID" },
              { key: "learner", label: "Learner" },
              { key: "learnerEmail", label: "Email" },
              { key: "workshop", label: "Workshop" },
              { key: "registrationDate", label: "Registered On" },
              {
                key: "actions",
                label: "Action",
                render: (row) => (
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => setSelectedRegistration(row)}
                  >
                    Review
                  </button>
                ),
              },
            ]}
            rows={rows}
          />
        )}
      </div>

      <Modal
        footer={null}
        onClose={() => setSelectedRegistration(null)}
        open={Boolean(selectedRegistration)}
        title={selectedRegistration?.learner || "Registration review"}
      >
        {selectedRegistration ? (
          <div className="page-grid">
            <div className="workshop-meta">
              <span className="muted">Registration ID</span>
              <strong>{selectedRegistration.id}</strong>
            </div>
            <div className="workshop-meta">
              <span className="muted">Learner</span>
              <strong>{selectedRegistration.learner}</strong>
            </div>
            <div className="workshop-meta">
              <span className="muted">Email</span>
              <strong>{selectedRegistration.learnerEmail}</strong>
            </div>
            <div className="workshop-meta">
              <span className="muted">Workshop</span>
              <strong>{selectedRegistration.workshop}</strong>
            </div>
            <div className="workshop-meta">
              <span className="muted">Registered on</span>
              <strong>{selectedRegistration.registrationDate}</strong>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default ManageRegistrationsPage;
