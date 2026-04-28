import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoute() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <Navigate
        replace
        to={user.role === "admin" ? "/admin/dashboard" : "/app/dashboard"}
      />
    );
  }

  return <Outlet />;
}

export default GuestRoute;
