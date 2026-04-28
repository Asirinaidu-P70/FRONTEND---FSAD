function Tabs({ items, activeTab, onChange }) {
  return (
    <div className="tabs">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className={`tab-button ${activeTab === item.value ? "active" : ""}`}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
