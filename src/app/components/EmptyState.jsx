import emptyStateIllustration from "../../assets/empty-state.svg";

function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state glass-panel">
      <img src={emptyStateIllustration} alt="" width="240" />
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p className="muted" style={{ margin: 0, maxWidth: "46ch" }}>
        {description}
      </p>
      {action}
    </div>
  );
}

export default EmptyState;
