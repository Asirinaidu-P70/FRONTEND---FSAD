import { useState } from "react";
import toast from "react-hot-toast";
import PageIntro from "../components/PageIntro";
import Tabs from "../components/Tabs";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("preferences");

  const handleSave = (message) => {
    toast.success(message);
  };

  return (
    <div className="container">
      <PageIntro
        eyebrow="Settings"
        title="Customize the learner experience, alerts, and account security."
        description="Tabs, toggles, and grouped forms keep settings screens organized and believable."
      />

      <div className="dashboard-card">
        <Tabs
          activeTab={activeTab}
          items={[
            { label: "Preferences", value: "preferences" },
            { label: "Security", value: "security" },
            { label: "Billing UI", value: "billing" },
          ]}
          onChange={setActiveTab}
        />

        {activeTab === "preferences" ? (
          <div className="form-grid" style={{ marginTop: "1rem" }}>
            <div className="form-field">
              <label htmlFor="timezone">Timezone</label>
              <select className="select" id="timezone" defaultValue="Asia/Kolkata">
                <option>Asia/Kolkata</option>
                <option>Europe/London</option>
                <option>America/New_York</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="language">Language</label>
              <select className="select" id="language" defaultValue="English">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <button className="button button-primary" type="button" onClick={() => handleSave("Preferences updated.")}>
              Save preferences
            </button>
          </div>
        ) : null}

        {activeTab === "security" ? (
          <div className="page-grid" style={{ marginTop: "1rem" }}>
            <div className="activity-item">
              <div>
                <strong>Two-factor authentication</strong>
                <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                  Add another layer of protection to your demo account.
                </p>
              </div>
              <button className="button button-secondary" type="button" onClick={() => handleSave("2FA prompt simulated.")}>
                Enable
              </button>
            </div>
            <div className="activity-item">
              <div>
                <strong>Password policy</strong>
                <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                  Require stronger passwords for future backend integrations.
                </p>
              </div>
              <span className="pill">Recommended</span>
            </div>
          </div>
        ) : null}

        {activeTab === "billing" ? (
          <div className="page-grid" style={{ marginTop: "1rem" }}>
            <div className="workshop-meta">
              <span className="muted">Current plan</span>
              <strong>Cohort Pro</strong>
            </div>
            <div className="workshop-meta">
              <span className="muted">Renewal date</span>
              <strong>14 May 2026</strong>
            </div>
            <button className="button button-primary" type="button" onClick={() => handleSave("Billing action simulated.")}>
              Manage plan
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SettingsPage;
