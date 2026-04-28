import { useState } from "react";
import toast from "react-hot-toast";
import PageIntro from "../components/PageIntro";
import Tabs from "../components/Tabs";

function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("workspace");

  return (
    <div className="container">
      <PageIntro
        eyebrow="Admin settings"
        title="Configure workspace defaults, security posture, and notification rules."
        description="A dedicated admin settings page makes the platform feel complete from a product operations perspective."
      />

      <div className="dashboard-card">
        <Tabs
          activeTab={activeTab}
          items={[
            { label: "Workspace", value: "workspace" },
            { label: "Security", value: "security" },
            { label: "Notifications", value: "notifications" },
          ]}
          onChange={setActiveTab}
        />

        {activeTab === "workspace" ? (
          <div className="form-grid" style={{ marginTop: "1rem" }}>
            <div className="form-field">
              <label htmlFor="workspace-name">Workspace name</label>
              <input className="input" defaultValue="Atelier HQ Academy" id="workspace-name" />
            </div>
            <div className="form-field">
              <label htmlFor="branding-style">Branding preset</label>
              <select className="select" defaultValue="Aurora" id="branding-style">
                <option>Aurora</option>
                <option>Corporate</option>
                <option>Minimal</option>
              </select>
            </div>
            <button className="button button-primary" type="button" onClick={() => toast.success("Workspace settings saved.")}>
              Save workspace settings
            </button>
          </div>
        ) : null}

        {activeTab === "security" ? (
          <div className="page-grid" style={{ marginTop: "1rem" }}>
            <div className="activity-item">
              <div>
                <strong>Require admin re-authentication for announcements</strong>
                <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                  Tighten high-impact publishing actions.
                </p>
              </div>
              <span className="tag">Enabled</span>
            </div>
            <div className="activity-item">
              <div>
                <strong>Audit log retention</strong>
                <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                  Store event logs for 180 days in a future backend implementation.
                </p>
              </div>
              <span className="pill">Recommended</span>
            </div>
          </div>
        ) : null}

        {activeTab === "notifications" ? (
          <div className="page-grid" style={{ marginTop: "1rem" }}>
            <div className="activity-item">
              <div>
                <strong>Capacity alerts</strong>
                <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                  Notify admins when sessions cross 70% utilization.
                </p>
              </div>
              <span className="tag">On</span>
            </div>
            <div className="activity-item">
              <div>
                <strong>Digest frequency</strong>
                <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                  Weekly reporting summary every Monday morning.
                </p>
              </div>
              <span className="pill">Weekly</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminSettingsPage;
