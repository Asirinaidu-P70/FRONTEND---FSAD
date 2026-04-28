function TrainerCard({ trainer }) {
  return (
    <div className="trainer-card">
      <div className="trainer-header">
        <img className="avatar large" src={trainer.avatar} alt={trainer.name} />
        <div className="trainer-meta">
          <strong>{trainer.name}</strong>
          <span className="muted">{trainer.role || trainer.title}</span>
        </div>
      </div>
      <p className="muted" style={{ marginBottom: "0.75rem" }}>
        Specializes in {trainer.expertise} with {trainer.sessions} workshop sessions delivered.
      </p>
      <span className="tag">{trainer.expertise}</span>
    </div>
  );
}

export default TrainerCard;
