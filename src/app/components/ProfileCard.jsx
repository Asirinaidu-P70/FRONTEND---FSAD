function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img className="avatar large" src={user.avatar} alt={user.name} />
        <div className="profile-meta">
          <strong>{user.name}</strong>
          <span className="muted">{user.title}</span>
          <span className="muted">{user.company}</span>
        </div>
      </div>
      <div className="page-grid" style={{ gap: "0.8rem", marginTop: "1rem" }}>
        <div className="workshop-meta">
          <span className="muted">Location</span>
          <strong>{user.location}</strong>
        </div>
        <div className="workshop-meta">
          <span className="muted">Joined</span>
          <strong>{user.joinedOn}</strong>
        </div>
        <div className="workshop-meta">
          <span className="muted">Learning hours</span>
          <strong>{user.completedHours}</strong>
        </div>
        <div className="workshop-meta">
          <span className="muted">Certificates</span>
          <strong>{user.certificatesEarned}</strong>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
