function ChartCard({ title, subtitle, action, children }) {
  return (
    <div className="chart-card glass-panel">
      <div className="chart-head">
        <div>
          <h3 style={{ margin: 0 }}>{title}</h3>
          {subtitle ? (
            <p className="muted" style={{ margin: "0.35rem 0 0" }}>
              {subtitle}
            </p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export default ChartCard;
