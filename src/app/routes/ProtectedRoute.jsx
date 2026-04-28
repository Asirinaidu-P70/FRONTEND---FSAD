import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        replace
        to={user.role === "admin" ? "/admin/dashboard" : "/app/dashboard"}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
