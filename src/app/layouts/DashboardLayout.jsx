import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { adminNavigation, userNavigation } from "../data/navigation";
import { useAuth } from "../context/AuthContext";
import DashboardTopbar from "../components/DashboardTopbar";
import DrawerPanel from "../components/DrawerPanel";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isAdminSpace = location.pathname.startsWith("/admin");
  const navigation = isAdminSpace ? adminNavigation : userNavigation;
  const title = isAdminSpace ? "Admin Workspace" : "Learner Workspace";

  return (
    <div className="dashboard-layout">
      <Sidebar
        footer={
          <div className="glass-panel" style={{ padding: "1rem" }}>
            <p className="muted" style={{ marginTop: 0, marginBottom: "0.45rem" }}>
              Signed in as
            </p>
            <strong>{user?.name}</strong>
            <p className="muted" style={{ marginBottom: 0 }}>
              {user?.role === "admin" ? "Administrator" : "Learner"}
            </p>
          </div>
        }
        navigation={navigation}
      />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <DashboardTopbar onOpenSidebar={() => setSidebarOpen(true)} title={title} />
          <Outlet />
        </div>
      </main>

      <DrawerPanel open={sidebarOpen} onClose={() => setSidebarOpen(false)} title="Navigation">
        <div className="sidebar-links">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
                to={item.href}
              >
                {Icon ? <Icon size={18} /> : null}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </DrawerPanel>
    </div>
  );
}

export default DashboardLayout;
