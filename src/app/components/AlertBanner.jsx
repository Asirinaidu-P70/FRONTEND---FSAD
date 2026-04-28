function AlertBanner({ title, description, action }) {
  return (
    <div className="alert-banner">
      <div>
        <strong style={{ display: "block", marginBottom: "0.35rem" }}>{title}</strong>
        <span className="muted">{description}</span>
      </div>
      <div style={{ marginLeft: "auto" }}>{action}</div>
    </div>
  );
}

export default AlertBanner;
