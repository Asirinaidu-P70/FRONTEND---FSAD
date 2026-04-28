import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { publicNavigation } from "../data/navigation";
import { useAuth } from "../context/AuthContext";
import BrandMark from "./BrandMark";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const dashboardHref =
    user?.role === "admin" ? "/admin/dashboard" : "/app/dashboard";

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <BrandMark compact />
        <nav className="top-nav-links">
          {publicNavigation.map((item) => (
            <NavLink
              key={item.href}
              className={({ isActive }) =>
                `top-nav-link ${isActive ? "active" : ""}`
              }
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="desktop-only" style={{ alignItems: "center", gap: "0.75rem" }}>
          <ThemeToggle />
          {isAuthenticated ? (
            <Link className="button button-primary" to={dashboardHref}>
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link className="button button-ghost" to="/login">
                Login
              </Link>
              <Link className="button button-primary" to="/register">
                Get Started
              </Link>
            </>
          )}
        </div>
        <button
          type="button"
          className="icon-button mobile-only"
          onClick={() => setMobileOpen((state) => !state)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-panel"
            style={{ marginTop: "0.75rem", padding: "1rem" }}
          >
            <div className="sidebar-links" style={{ marginBottom: "1rem" }}>
              {publicNavigation.map((item) => (
                <NavLink
                  key={item.href}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <ThemeToggle />
              <Link className="button button-primary button-block" to="/login">
                Continue
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
