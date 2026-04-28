import { NavLink } from "react-router-dom";
import BrandMark from "./BrandMark";

function Sidebar({ navigation, footer }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <BrandMark />
      </div>
      <nav className="sidebar-links">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              to={item.href}
            >
              {Icon ? <Icon size={18} /> : null}
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      {footer ? <div style={{ marginTop: "1rem" }}>{footer}</div> : null}
    </aside>
  );
}

export default Sidebar;
