import { Filter, Search, SlidersHorizontal } from "lucide-react";

function SearchToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories = [],
  action,
  onOpenFilters,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <div className="topbar-search" style={{ minWidth: "280px", maxWidth: "360px" }}>
          <Search size={18} />
          <input
            placeholder="Search by workshop, category, or trainer"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <div className="topbar-search" style={{ maxWidth: "260px" }}>
          <Filter size={18} />
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            style={{
              width: "100%",
              border: 0,
              outline: "none",
              background: "transparent",
              color: "var(--text)",
            }}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="toolbar-group">
        {action}
        {onOpenFilters ? (
          <button type="button" className="button button-secondary" onClick={onOpenFilters}>
            <SlidersHorizontal size={16} />
            Filters
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default SearchToolbar;
