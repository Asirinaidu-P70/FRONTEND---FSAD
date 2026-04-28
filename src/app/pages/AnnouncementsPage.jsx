import { useState } from "react";
import toast from "react-hot-toast";
import PageIntro from "../components/PageIntro";
import { announcements } from "../data/notifications";

function AnnouncementsPage() {
  const [form, setForm] = useState({
    title: "",
    audience: "All learners",
    body: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Announcement published to the mock feed.");
    setForm({ title: "", audience: "All learners", body: "" });
  };

  return (
    <div className="container">
      <PageIntro
        eyebrow="Announcements"
        title="Craft updates and keep workshop participants aligned."
        description="The announcement center combines an editorial form with a historical feed for strong admin storytelling."
      />

      <div className="page-grid grid-2">
        <form className="dashboard-card" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="announcement-title">Title</label>
            <input
              className="input"
              id="announcement-title"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            />
          </div>
          <div className="form-field" style={{ marginTop: "1rem" }}>
            <label htmlFor="announcement-audience">Audience</label>
            <select
              className="select"
              id="announcement-audience"
              value={form.audience}
              onChange={(event) => setForm((current) => ({ ...current, audience: event.target.value }))}
            >
              <option>All learners</option>
              <option>Admins</option>
              <option>Specific cohort</option>
            </select>
          </div>
          <div className="form-field" style={{ marginTop: "1rem" }}>
            <label htmlFor="announcement-body">Body</label>
            <textarea
              className="textarea"
              id="announcement-body"
              value={form.body}
              onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
            />
          </div>
          <button className="button button-primary" style={{ marginTop: "1rem" }} type="submit">
            Publish announcement
          </button>
        </form>

        <div className="page-grid">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="notification-card">
              <div className="notification-header" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <strong>{announcement.title}</strong>
                  <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                    {announcement.audience}
                  </p>
                </div>
                <span className="pill">{announcement.publishedAt}</span>
              </div>
              <p className="muted" style={{ lineHeight: 1.7, marginBottom: 0 }}>
                {announcement.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsPage;
