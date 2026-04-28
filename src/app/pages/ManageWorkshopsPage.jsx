import { PlusCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import PageIntro from "../components/PageIntro";
import SearchToolbar from "../components/SearchToolbar";
import { fetchWorkshops } from "../services/api";

function ManageWorkshopsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [preview, setPreview] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const workshopCategories = useMemo(
    () => ["All", ...new Set(workshops.map((workshop) => workshop.category).filter(Boolean))],
    [workshops]
  );

  useEffect(() => {
    let isMounted = true;

    const loadWorkshops = async () => {
      try {
        const data = await fetchWorkshops();

        if (isMounted) {
          setWorkshops(data);
        }
      } catch (error) {
        toast.error(error.message || "Failed to load workshops.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWorkshops();

    return () => {
      isMounted = false;
    };
  }, []);

  const rows = workshops.filter((workshop) => {
    const matchesSearch = `${workshop.title} ${workshop.trainerName}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || workshop.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container">
        <div className="data-card">
          <h2 style={{ color: "white" }}>Loading workshops...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <PageIntro
        eyebrow="Manage workshops"
        title="Oversee catalog health, seat pressure, and edit flows."
        description="Search, filter, preview, and jump into workshop creation from a dedicated operations table."
        actions={
          <Link className="button button-primary" to="/admin/workshops/new">
            <PlusCircle size={16} />
            Add workshop
          </Link>
        }
      />

      <SearchToolbar
        categories={workshopCategories}
        category={category}
        onCategoryChange={setCategory}
        onSearchChange={setSearch}
        search={search}
      />

      <div className="data-card">
        <DataTable
          columns={[
            { key: "title", label: "Workshop" },
            { key: "category", label: "Category" },
            {
              key: "trainer",
              label: "Trainer",
              render: (row) => row.trainerName,
            },
            { key: "date", label: "Date" },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <span
                  className={`status-badge ${
                    row.status === "Open"
                      ? "status-success"
                      : "status-warning"
                  }`}
                >
                  {row.status}
                </span>
              ),
            },
            {
              key: "action",
              label: "Action",
              render: (row) => (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => setPreview(row)}
                  >
                    Preview
                  </button>

                  <Link
                    className="button button-primary"
                    to={`/admin/workshops/${row.id}/edit`}
                  >
                    Edit
                  </Link>
                </div>
              ),
            },
          ]}
          rows={rows}
        />
      </div>

      <Modal
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview?.title || "Workshop preview"}
      >
        {preview ? (
          <div className="page-grid">
            <div className="workshop-meta">
              <span className="muted">Trainer</span>
              <strong>{preview.trainerName}</strong>
            </div>

            <div className="workshop-meta">
              <span className="muted">Trainer Role</span>
              <strong>{preview.trainerRole}</strong>
            </div>

            <div className="workshop-meta">
              <span className="muted">Seats remaining</span>
              <strong>{preview.seatsAvailable}</strong>
            </div>

            <div className="workshop-meta">
              <span className="muted">Seats total</span>
              <strong>{preview.seatsTotal}</strong>
            </div>

            <div className="workshop-meta">
              <span className="muted">Price</span>
              <strong>{preview.price}</strong>
            </div>

            <div className="workshop-meta">
              <span className="muted">Mode</span>
              <strong>{preview.mode}</strong>
            </div>

            <div className="workshop-meta">
              <span className="muted">Description</span>
              <strong>{preview.description}</strong>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default ManageWorkshopsPage;
