import { Award, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import PageIntro from "../components/PageIntro";
import ProfileCard from "../components/ProfileCard";
import Tabs from "../components/Tabs";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    company: "",
    bio: "",
    interests: "",
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      title: user.title || "",
      company: user.company || "",
      bio: user.bio || "",
      interests: (user.interests || []).join(", "),
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await updateProfile({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        location: form.location.trim(),
        title: form.title.trim(),
        company: form.company.trim(),
        bio: form.bio.trim(),
        interests: form.interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container">
      <PageIntro
        eyebrow="Profile"
        title="Manage the real client information shown across your workspace."
        description="Update contact details, professional information, and personal preferences from one place."
      />

      <div className="page-grid grid-2">
        <ProfileCard user={user} />
        <form className="dashboard-card" onSubmit={handleSubmit}>
          <Tabs
            activeTab={activeTab}
            items={[
              { label: "Personal", value: "personal" },
              { label: "Professional", value: "professional" },
              { label: "Preferences", value: "preferences" },
            ]}
            onChange={setActiveTab}
          />

          {activeTab === "personal" ? (
            <div className="form-grid" style={{ marginTop: "1rem" }}>
              <div className="form-field">
                <label htmlFor="profile-name">Full name</label>
                <input
                  className="input"
                  id="profile-name"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                />
              </div>
              <div className="form-field">
                <label htmlFor="profile-email">Email address</label>
                <input
                  className="input"
                  id="profile-email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={form.email}
                />
              </div>
              <div className="form-field">
                <label htmlFor="profile-phone">Phone number</label>
                <input
                  className="input"
                  id="profile-phone"
                  name="phone"
                  onChange={handleChange}
                  value={form.phone}
                />
              </div>
              <div className="form-field">
                <label htmlFor="profile-location">Location</label>
                <input
                  className="input"
                  id="profile-location"
                  name="location"
                  onChange={handleChange}
                  value={form.location}
                />
              </div>
            </div>
          ) : null}

          {activeTab === "professional" ? (
            <div className="page-grid" style={{ marginTop: "1rem" }}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="profile-title">Title</label>
                  <input
                    className="input"
                    id="profile-title"
                    name="title"
                    onChange={handleChange}
                    value={form.title}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="profile-company">Organization</label>
                  <input
                    className="input"
                    id="profile-company"
                    name="company"
                    onChange={handleChange}
                    value={form.company}
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="profile-bio">Bio</label>
                <textarea
                  className="textarea"
                  id="profile-bio"
                  name="bio"
                  onChange={handleChange}
                  value={form.bio}
                />
              </div>
              <div className="workshop-meta">
                <span className="muted">Certificates</span>
                <strong>
                  <Award
                    size={16}
                    style={{ marginRight: "0.35rem", verticalAlign: "middle" }}
                  />
                  {user?.certificatesEarned || 0} earned
                </strong>
              </div>
              <div className="workshop-meta">
                <span className="muted">Learning hours</span>
                <strong>{user?.completedHours || 0} hours</strong>
              </div>
            </div>
          ) : null}

          {activeTab === "preferences" ? (
            <div className="page-grid" style={{ marginTop: "1rem" }}>
              <div className="form-field">
                <label htmlFor="profile-interests">Interests</label>
                <input
                  className="input"
                  id="profile-interests"
                  name="interests"
                  onChange={handleChange}
                  placeholder="AI, Product Design, Community"
                  value={form.interests}
                />
              </div>
              <div className="activity-item">
                <div>
                  <strong>Profile visibility</strong>
                  <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                    Keep your trainer and learner information updated for workshop communication.
                  </p>
                </div>
                <span className="tag">
                  <Sparkles size={14} />
                  Active
                </span>
              </div>
            </div>
          ) : null}

          <button
            className="button button-primary"
            disabled={isSaving}
            style={{ marginTop: "1.25rem" }}
            type="submit"
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
