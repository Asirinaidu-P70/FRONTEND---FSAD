import { FilePlus, UploadCloud } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import PageIntro from "../components/PageIntro";

const resources = [
  { id: "res-1", name: "Sprint workbook.pdf", workshop: "AI Product Strategy Sprint" },
  { id: "res-2", name: "Design systems starter.fig", workshop: "Design Systems for Fast Teams" },
  { id: "res-3", name: "Facilitation checklist.docx", workshop: "Remote Facilitation Studio" },
];

function UploadMaterialsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container">
      <PageIntro
        eyebrow="Upload materials"
        title="Prepare handouts, decks, files, and resources for each workshop cohort."
        description="The materials page adds depth to the admin product flow and shows a realistic content-management surface."
      />

      <div className="page-grid grid-2">
        <div className="dashboard-card" style={{ textAlign: "center" }}>
          <div className="icon-wrap" style={{ margin: "0 auto 1rem" }}>
            <UploadCloud size={20} />
          </div>
          <h3>Drag and drop upload zone</h3>
          <p className="muted" style={{ maxWidth: "42ch", margin: "0 auto 1rem" }}>
            This is a frontend-only upload surface that mimics a premium SaaS file management experience.
          </p>
          <button className="button button-primary" type="button" onClick={() => setModalOpen(true)}>
            <FilePlus size={16} />
            Add materials
          </button>
        </div>

        <div className="data-card">
          <div className="data-card-head">
            <h3 style={{ margin: 0 }}>Recent resources</h3>
            <span className="pill">3 files</span>
          </div>
          <div className="resource-list">
            {resources.map((resource) => (
              <div key={resource.id} className="resource-item">
                <div>
                  <strong>{resource.name}</strong>
                  <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                    {resource.workshop}
                  </p>
                </div>
                <span className="tag">Uploaded</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        footer={
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              toast.success("Material upload simulated.");
              setModalOpen(false);
            }}
          >
            Save material
          </button>
        }
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        title="Upload workshop material"
      >
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="material-name">File name</label>
            <input className="input" id="material-name" placeholder="Sprint workbook.pdf" />
          </div>
          <div className="form-field">
            <label htmlFor="material-workshop">Workshop</label>
            <input className="input" id="material-workshop" placeholder="AI Product Strategy Sprint" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UploadMaterialsPage;
