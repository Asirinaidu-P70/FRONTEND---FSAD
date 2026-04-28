import { Bell, Menu, Search, Settings, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

function DashboardTopbar({ title, onOpenSidebar }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="topbar">
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flex: 1 }}>
        <button type="button" className="icon-button mobile-only" onClick={onOpenSidebar}>
          <Menu size={18} />
        </button>
        <div>
          <p className="muted" style={{ margin: 0, fontSize: "0.85rem" }}>
            Workspace overview
          </p>
          <strong style={{ color: "var(--heading)" }}>{title}</strong>
        </div>
      </div>
      <div className="topbar-search">
        <Search size={18} />
        <input placeholder="Search workshops, users, reports..." type="search" />
      </div>
      <div className="topbar-actions">
        <ThemeToggle />
        <button type="button" className="icon-button">
          <Bell size={18} />
        </button>
        <div className="dropdown">
          <button type="button" className="icon-button" onClick={() => setOpen((state) => !state)}>
            <UserRound size={18} />
          </button>
          {open ? (
            <div className="dropdown-menu">
              <div className="topbar-user" style={{ padding: "0.7rem 0.8rem" }}>
                <img className="avatar" src={user?.avatar} alt={user?.name} />
                <div>
                  <strong style={{ display: "block" }}>{user?.name}</strong>
                  <span className="muted" style={{ fontSize: "0.9rem" }}>
                    {user?.role === "admin" ? "Administrator" : "Learner"}
                  </span>
                </div>
              </div>
              <Link className="dropdown-link" onClick={() => setOpen(false)} to={user?.role === "admin" ? "/admin/settings" : "/app/profile"}>
                Profile
              </Link>
              <Link className="dropdown-link" onClick={() => setOpen(false)} to={user?.role === "admin" ? "/admin/settings" : "/app/settings"}>
                <Settings size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                Settings
              </Link>
              <button type="button" className="dropdown-link" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DashboardTopbar;
